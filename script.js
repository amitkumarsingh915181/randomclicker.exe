// Initialize Plyr
const player = new Plyr('#lightbox-video', {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    ratio: '9:16',
    clickToPlay: true,
    hideControls: true,
    resetOnEnd: true,
    loop: { active: true }
});

// ============================================================
// CONFIG — Replace with your actual values
// ============================================================
const CONFIG = {
    // Paste your Instagram Basic Display API access token here:
    ACCESS_TOKEN: 'IGAAaG5UFyUBlBZAFpWUEkycDBMa2dWdzFUZAU5VSmptMlFuM0pVUnZAiTW9wdnUwYXgtVlI2NlgtYms0dVZATVGJqU2ZAiMlNUMEJha2xfaENuNHl2WjRIQVRSSklhNS0yZAmZAVNWY3WlZAWLXNEdlEwQWI0ODAxSldCQTB0d3U2NDhpWQZDZD',

    // Your Instagram username (for display only):
    USERNAME: 'randomclicker.exe',

    // How many items to fetch per section:
    REELS_LIMIT: 50, // Increased to show all
    POSTS_LIMIT: 50, // Show all
    GALLERY_LIMIT: 30,
};

// ============================================================
// INSTAGRAM API
// ============================================================
const BASE = 'https://graph.instagram.com';
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,permalink';

let allMedia = [];
let albumChildren = {};
let currentAlbumItems = [];
let currentSlideIndex = 0;
let galleryFilter = 'all';

async function fetchInstagram() {
    const token = CONFIG.ACCESS_TOKEN;
    if (!token || token === 'YOUR_INSTAGRAM_ACCESS_TOKEN') {
        showTokenSetup();
        return;
    }
    try {
        // Fetch main feed
        const res = await fetch(`${BASE}/me/media?fields=${FIELDS}&limit=100&access_token=${token}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        allMedia = data.data || [];

        // Fetch children for all albums
        const albumPromises = allMedia
            .filter(m => m.media_type === 'CAROUSEL_ALBUM')
            .map(async (album) => {
                try {
                    const cRes = await fetch(`${BASE}/${album.id}/children?fields=id,media_url,media_type,timestamp,thumbnail_url&access_token=${token}`);
                    const cData = await cRes.json();
                    albumChildren[album.id] = cData.data || [];
                } catch (e) {
                    console.error(`Failed to fetch children for album ${album.id}`, e);
                    albumChildren[album.id] = [];
                }
            });

        await Promise.all(albumPromises);

        // Fetch profile
        fetchProfile(token);

        renderReels();
        renderPosts();
        renderGallery();
    } catch (err) {
        showError(err.message);
    }
}

async function fetchProfile(token) {
    try {
        const res = await fetch(`${BASE}/me?fields=followers_count,media_count&access_token=${token}`);
        const data = await res.json();
        if (data.media_count) document.getElementById('stat-posts').textContent = data.media_count + '+';
        if (data.followers_count) {
            const n = data.followers_count;
            const s = n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;
            document.getElementById('stat-followers').textContent = s;
        }
    } catch (e) { }
}

function formatDate(ts) {
    return new Date(ts).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function truncate(str, len = 120) {
    if (!str) return '';
    return str.length > len ? str.slice(0, len).trimEnd() + '…' : str;
}

// REELS
function renderReels() {
    const reels = allMedia.filter(m => m.media_type === 'VIDEO');
    const wrapper = document.getElementById('reels-wrapper');
    document.getElementById('reels-count').textContent = reels.length + ' videos';

    if (!reels.length) {
        wrapper.innerHTML = '<div class="swiper-slide"><p style="color:rgba(255,255,255,0.3);font-size:0.78rem;">No reels found.</p></div>';
        return;
    }

    wrapper.innerHTML = reels.map(r => `
      <div class="swiper-slide">
        <div class="reel-card" onclick="openLightbox('${r.media_url}','${escCap(r.caption)}', 'VIDEO')">
            <img src="${r.thumbnail_url || r.media_url}" alt="Reel" loading="lazy">
            <div class="reel-play"></div>
            <div class="reel-overlay">
                <div class="reel-type">Reel · ${formatDate(r.timestamp)}</div>
                <p class="reel-caption">${truncate(r.caption, 80)}</p>
            </div>
        </div>
      </div>
    `).join('');

    // Initialize Swiper
    new Swiper('#reels-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 5 }
        },
        grabCursor: true
    });
}

// POSTS
function renderPosts() {
    const posts = allMedia.filter(m => m.media_type === 'IMAGE' || m.media_type === 'CAROUSEL_ALBUM');
    const wrapper = document.getElementById('posts-wrapper');
    document.getElementById('posts-count').textContent = posts.length + ' posts';

    if (!posts.length) {
        wrapper.innerHTML = '<div class="swiper-slide"><p style="color:var(--dust);font-size:0.78rem;">No posts found.</p></div>';
        return;
    }

    wrapper.innerHTML = posts.map(p => {
        const isAlbum = p.media_type === 'CAROUSEL_ALBUM';
        const children = isAlbum ? albumChildren[p.id] : [];
        const albumData = isAlbum ? b64Encode(JSON.stringify(children)) : '';

        return `
      <div class="swiper-slide">
        <div class="post-card">
            <div class="post-img-wrap" onclick="openLightbox('${p.media_url}', '${escCap(p.caption)}', '${p.media_type}', '${albumData}')">
                ${isAlbum ? `<div class="album-badge">1 / ${children.length}</div><div class="album-icon-overlay">⧉</div>` : ''}
                <img src="${p.media_url}" alt="Post" id="post-cover-${p.id}" loading="lazy">
            </div>
            <div class="post-body">
                <div class="post-meta">
                    <span class="post-date">${formatDate(p.timestamp)}</span>
                    ${p.like_count ? `<span class="post-likes">♥ ${p.like_count}</span>` : ''}
                </div>
                <p class="post-caption">${truncate(p.caption)}</p>
                ${isAlbum ? `
                    <div class="thumb-strip">
                    ${children.map((child, idx) => `
                        <div class="thumb-item ${idx === 0 ? 'active' : ''}" 
                            onclick="updatePostPreview('${p.id}', '${child.media_url}', ${idx}, '${escCap(p.caption)}', '${albumData}')">
                        <img src="${child.media_type === 'VIDEO' ? (child.thumbnail_url || child.media_url) : child.media_url}" loading="lazy">
                        </div>
                    `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
      </div>
    `}).join('');

    // Initialize Swiper for Posts
    new Swiper('#posts-container', {
        slidesPerView: 1,
        spaceBetween: 25,
        navigation: {
            nextEl: '.posts-next',
            prevEl: '.posts-prev',
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 }
        },
        grabCursor: true
    });
}

function updatePostPreview(postId, url, idx, caption, albumDataB64) {
    const img = document.getElementById(`post-cover-${postId}`);
    if (img) img.src = url;
    
    // Update active state in thumb strip
    const card = img.closest('.post-card');
    card.querySelectorAll('.thumb-item').forEach((t, i) => {
        t.classList.toggle('active', i === idx);
    });
    
    // Update badge
    const badge = card.querySelector('.album-badge');
    const children = JSON.parse(b64Decode(albumDataB64));
    if (badge) badge.textContent = `${idx + 1} / ${children.length}`;
    
    // Update main click to open lightbox at this specific index
    const wrap = card.querySelector('.post-img-wrap');
    wrap.onclick = () => openLightbox(url, caption, children[idx].media_type, albumDataB64, idx);
}

// GALLERY
function renderGallery(filter) {
    if (filter) galleryFilter = filter;
    let container = document.getElementById('gallery-container');
    
    // Flatten media for gallery expansion
    let items = [];
    allMedia.forEach(m => {
        if (m.media_type === 'CAROUSEL_ALBUM') {
            const children = albumChildren[m.id] || [];
            children.forEach((child, idx) => {
                items.push({
                    ...child,
                    caption: m.caption,
                    isAlbumChild: true,
                    parentAlbum: children,
                    childIdx: idx
                });
            });
        } else {
            items.push(m);
        }
    });

    // Limit
    let displayItems = items.slice(0, CONFIG.GALLERY_LIMIT * 2); // Larger limit since we expand
    if (galleryFilter !== 'all') {
        displayItems = displayItems.filter(m => {
            if (galleryFilter === 'CAROUSEL_ALBUM') return m.isAlbumChild;
            return m.media_type === galleryFilter;
        });
    }

    document.getElementById('gallery-count').textContent = displayItems.length + ' items';

    if (!displayItems.length) {
        container.innerHTML = '<p style="color:var(--dust);font-size:0.78rem;column-span:all;">No items found.</p>';
        return;
    }

    container.innerHTML = displayItems.map(m => {
        const albumData = m.parentAlbum ? b64Encode(JSON.stringify(m.parentAlbum)) : '';
        return `
    <div class="gallery-item" onclick="openLightbox('${m.media_url}','${escCap(m.caption)}', '${m.media_type}', '${albumData}', ${m.childIdx || 0})">
      <img src="${m.media_type === 'VIDEO' ? (m.thumbnail_url || m.media_url) : m.media_url}" alt="Gallery" loading="lazy">
      ${m.isAlbumChild ? '<div class="gallery-pos-dot"></div>' : ''}
      <div class="gallery-item-overlay">
        <div class="gallery-view-icon">${m.media_type === 'VIDEO' ? '▶' : (m.isAlbumChild ? '⧉' : '+')}</div>
      </div>
    </div>
  `}).join('');
}

function escCap(str) {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ').slice(0, 200);
}

function b64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function b64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
}

// ============================================================
// Token Setup UI
// ============================================================
function showTokenSetup() {
    const banner = document.getElementById('setupBanner');
    banner.style.display = 'block';

    const html = `
    <div class="token-state">
      <p>To auto-load your Instagram content, add your Access Token. Here's how:</p>
      <code>1. Go to developers.facebook.com → My Apps
2. Create a new app → Add Instagram Basic Display product
3. Go to Instagram Basic Display → Generate Token
4. Paste the token below:</code>
      <div class="token-input-row">
        <input type="text" id="tokenInput" class="token-input" placeholder="Paste your Instagram Access Token here…">
        <button class="btn-sm" onclick="applyToken()">Connect</button>
      </div>
      <p style="margin-top:1rem;font-size:0.65rem;color:var(--dust);">
        Or open this file in a text editor and replace <strong>YOUR_INSTAGRAM_ACCESS_TOKEN</strong> in the CONFIG section at the top of the script.
      </p>
    </div>`;

    document.getElementById('reels-container').innerHTML = html;
    document.getElementById('posts-container').innerHTML = html.replace('token-state', 'token-state').replace('Connect', '');
    document.getElementById('gallery-container').innerHTML = '';
    document.getElementById('reels-count').textContent = '';
    document.getElementById('posts-count').textContent = '';
    document.getElementById('gallery-count').textContent = '';
}

function applyToken() {
    const t = document.getElementById('tokenInput')?.value?.trim();
    if (!t) return;
    CONFIG.ACCESS_TOKEN = t;
    document.getElementById('setupBanner').style.display = 'none';
    fetchInstagram();
}

function showError(msg) {
    const html = `<div class="error-state"><p>Could not load Instagram data: <strong>${msg}</strong></p>
    <p>Check your access token and try again. Make sure your token has <em>instagram_graph_user_media</em> permission.</p></div>`;
    document.getElementById('reels-container').innerHTML = html;
    document.getElementById('posts-container').innerHTML = html;
    document.getElementById('gallery-container').innerHTML = html;
}





// ============================================================
// Lightbox & Slider
// ============================================================
let baseCaption = '';

function openLightbox(src, caption, type = 'IMAGE', albumData = '', index = 0) {
    const lb = document.getElementById('lightbox');
    baseCaption = caption;
    
    if (albumData) {
        currentAlbumItems = JSON.parse(b64Decode(albumData));
    } else {
        currentAlbumItems = [{ media_url: src, media_type: type }];
    }
    
    currentSlideIndex = index;

    renderSlide();

    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show/hide nav arrows
    document.getElementById('slider-prev').style.display = currentAlbumItems.length > 1 ? 'block' : 'none';
    document.getElementById('slider-next').style.display = currentAlbumItems.length > 1 ? 'block' : 'none';
}

function renderSlide() {
    const item = currentAlbumItems[currentSlideIndex];
    const img = document.getElementById('lightbox-img');
    const videoWrap = document.getElementById('video-wrapper');
    const cap = document.getElementById('lightbox-caption');

    img.style.display = 'none';
    videoWrap.style.display = 'none';
    player.pause();

    if (item.media_type === 'VIDEO') {
        player.source = {
            type: 'video',
            sources: [{ src: item.media_url, type: 'video/mp4' }]
        };
        videoWrap.style.display = 'block';
        player.once('ready', () => player.play());
    } else {
        img.src = item.media_url;
        img.style.display = 'block';
    }

    let capText = baseCaption;
    if (currentAlbumItems.length > 1) {
        capText += ` · Photo ${currentSlideIndex + 1} of ${currentAlbumItems.length}`;
    }
    cap.textContent = capText;
}

function prevSlide() {
    if (currentAlbumItems.length <= 1) return;
    currentSlideIndex = (currentSlideIndex - 1 + currentAlbumItems.length) % currentAlbumItems.length;
    renderSlide();
}

function nextSlide() {
    if (currentAlbumItems.length <= 1) return;
    currentSlideIndex = (currentSlideIndex + 1) % currentAlbumItems.length;
    renderSlide();
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    player.pause();
    lb.classList.remove('active');
    document.body.style.overflow = '';
    currentAlbumItems = [];
    currentSlideIndex = 0;
}

// Keyboard navigation
document.addEventListener('keydown', e => {
    // Slider keys
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'Escape') closeLightbox();
    }
});

document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

// ============================================================
// Gallery filter
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderGallery(this.dataset.filter);
    });
});

// ============================================================
// Contact form (Formspree AJAX)
// ============================================================


// ============================================================
// Custom cursor
// ============================================================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top = my + 'px';
});

document.querySelectorAll('a, button, .reel-card, .post-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '52px'; ring.style.height = '52px';
        ring.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '32px'; ring.style.height = '32px';
        ring.style.opacity = '1';
    });
});

// ============================================================
// Scroll fade-in
// ============================================================
const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============================================================
// INIT
// ============================================================
fetchInstagram();
