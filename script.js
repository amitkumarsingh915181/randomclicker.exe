/** ============================================================
 * Award-Winning Creative Portfolio Script
 * Developer: Antigravity & Amit Singh
 * Stack: Vanilla JS, GSAP, ScrollTrigger, Lenis, Swiper, Plyr
 * ============================================================ */

/* STRICT NO-EMOJI POLICY ENFORCED */

// Handcrafted Editorial Showcase Archive (Curated to guarantee Awwwards aesthetic out of the box)
const EDITORIAL_ARCHIVE = [
    {
        id: 'cap-1',
        media_type: 'IMAGE',
        media_url: 'hero.png',
        category: 'Street',
        location: 'Old Delhi Chowk',
        camera: 'Sony Alpha 7S III',
        lens: 'FE 35mm f/1.4 GM',
        timestamp: '2026-02-14',
        likes: '1,420',
        caption: 'Morning light piercing through the dense electrical wires and narrow alleys of Chandni Chowk. A silhouette emerges.'
    },
    {
        id: 'cap-2',
        media_type: 'IMAGE',
        media_url: 'portrait.png',
        category: 'Portrait',
        location: 'Varanasi Ghats',
        camera: 'Leica M11 Monochrome',
        lens: 'Summilux-M 50mm f/1.4',
        timestamp: '2026-01-20',
        likes: '2,850',
        caption: 'An unscripted gaze by the holy Ganges. The texture of time etched onto human countenance.'
    },
    {
        id: 'cap-3',
        media_type: 'CAROUSEL_ALBUM',
        media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
        category: 'Festival',
        location: 'Pushkar Mela',
        camera: 'Sony Alpha 7R V',
        lens: 'FE 85mm f/1.4 GM',
        timestamp: '2025-11-18',
        likes: '3,100',
        caption: 'Dust and golden hour silhouettes during the camel gathering. The atmosphere was thick with desert mysticism.'
    },
    {
        id: 'cap-4',
        media_type: 'VIDEO',
        media_url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=85',
        video_url: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-walking-in-the-city-41620-large.mp4',
        category: 'Travel',
        location: 'Spiti Valley High Altitude',
        camera: 'Sony Alpha 7S III',
        lens: 'FE 24mm f/1.4 GM',
        timestamp: '2025-09-04',
        likes: '1,980',
        caption: 'Monasteries touching the clouds at 14,000 feet. Optical clarity amidst stark Himalayan isolation.'
    },
    {
        id: 'cap-5',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&w=1200&q=85',
        category: 'Black & White',
        location: 'Kolkata Tramways',
        camera: 'Ricoh GR IIIx',
        lens: '40mm Equivalent',
        timestamp: '2025-08-12',
        likes: '2,430',
        caption: 'Monochrome nostalgia inside one of the last operating electric tram cars in Asia.'
    },
    {
        id: 'cap-6',
        media_type: 'CAROUSEL_ALBUM',
        media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
        category: 'Architecture',
        location: 'Jaipur Stepwell Geometry',
        camera: 'Sony Alpha 7 IV',
        lens: 'FE 16-35mm f/2.8 GM',
        timestamp: '2025-07-29',
        likes: '4,120',
        caption: 'Symmetrical stone stairs creating dramatic shadows under the midday Rajasthan sun.'
    },
    {
        id: 'cap-7',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
        category: 'People',
        location: 'Jodhpur Blue Alleys',
        camera: 'Sony Alpha 7S III',
        lens: 'FE 35mm f/1.4 GM',
        timestamp: '2025-06-15',
        likes: '1,890',
        caption: 'Children racing through the azure labyrinths of the old city. Joy uncontained by geometry.'
    },
    {
        id: 'cap-8',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85',
        category: 'Nature',
        location: 'Meghalaya Mist Forests',
        camera: 'DJI Mavic 3 Pro',
        lens: '70mm Telephoto',
        timestamp: '2025-05-10',
        likes: '3,450',
        caption: 'Living root bridges shrouded in monsoon fog. Nature crafting its own architectural marvels.'
    }
];

const STORY_REELS = [
    {
        id: 'reel-1',
        title: 'Varanasi Dawn Symphony',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-camera-taking-a-picture-41618-large.mp4',
        poster: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        caption: 'Cinematic sensory overload by the riverbanks during morning prayers.'
    },
    {
        id: 'reel-2',
        title: 'Street Silhouettes Series',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-walking-in-the-city-41620-large.mp4',
        poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        caption: 'Chasing harsh light and deep shadows across urban Delhi.'
    },
    {
        id: 'reel-3',
        title: 'Himalayan Altitude Chronicles',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-camera-looking-at-pictures-41619-large.mp4',
        poster: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
        caption: 'Documenting nomadic life at the edge of civilization.'
    },
    {
        id: 'reel-4',
        title: 'Monochrome Urban Transit',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-camera-taking-a-picture-41618-large.mp4',
        poster: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&w=800&q=80',
        caption: 'The rhythmic heartbeat of Kolkata public transport.'
    }
];

let activeArchive = [...EDITORIAL_ARCHIVE];
let currentGalleryFilter = 'all';

// ============================================================
// 1. Initialize Lenis Smooth Scroll (60FPS GPU)
// ============================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0, 0);

// ============================================================
// 2. Cinematic Preloader Timeline
// ============================================================
function initPreloader() {
    const percentages = [0, 15, 35, 55, 75, 100];
    const percentageEl = document.getElementById('loaderPercentage');
    const barEl = document.getElementById('loaderBar');
    const preloaderEl = document.getElementById('preloader');

    // Prevent scrolling during load
    lenis.stop();
    document.body.style.overflow = 'hidden';

    let tl = gsap.timeline({
        onComplete: () => {
            // Open Shutter Easing
            gsap.to('.shutter-top', { yPercent: -100, duration: 1.4, ease: 'expo.inOut' });
            gsap.to('.shutter-bottom', { yPercent: 100, duration: 1.4, ease: 'expo.inOut' });
            gsap.to('.preloader-content', { opacity: 0, scale: 1.1, duration: 0.8, ease: 'power2.inOut' });

            setTimeout(() => {
                if (preloaderEl) preloaderEl.style.display = 'none';
                document.body.style.overflow = '';
                lenis.start();
                initHeroReveal();
            }, 1200);
        }
    });

    percentages.forEach((val, i) => {
        tl.to(barEl, {
            width: `${val}%`,
            duration: i === 0 ? 0.1 : 0.45,
            ease: 'power2.out',
            onUpdate: () => {
                if (percentageEl) percentageEl.textContent = `${Math.round(gsap.getProperty(barEl, 'width') / 2.4)}%`;
            }
        });
    });
}

// ============================================================
// 3. Hero Section Reveal Logic
// ============================================================
function initHeroReveal() {
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        gsap.fromTo(heroTitle,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
    }

    gsap.utils.toArray('.fade-up').forEach((el, index) => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.2 + (index * 0.15), ease: 'power3.out' }
        );
    });

    gsap.fromTo('#heroImageContainer',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out' }
    );
}

// ============================================================
// 4. Custom Cursor & Spotlight Logic
// ============================================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    const textEl = document.getElementById('cursorText');
    if (!cursor || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        const spotlight = document.querySelector('.hero-spotlight');
        if (spotlight) {
            spotlight.style.left = `${mouseX - 300}px`;
            spotlight.style.top = `${mouseY - 300}px`;
        }
    });

    function renderCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            const label = el.getAttribute('data-cursor');
            if (textEl) textEl.textContent = label;
            ring.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('cursor-active');
        });
    });
}

// ============================================================
// 5. Navigation Bar Scroll-Aware Logic
// ============================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = currentScrollY;
    });
}

// ============================================================
// 6. Tilt & Micro-Interactions
// ============================================================
function initTiltEffects() {
    document.querySelectorAll('.tilt-card, .tilt-element').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ============================================================
// 7. Render Story & Reels Section (Pinned Horizontal Scroll)
// ============================================================
// ============================================================
// 9. About Stats Animated Counters
// ============================================================
function initStatsCounters() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    ScrollTrigger.create({
        trigger: statsGrid,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            document.querySelectorAll('.stat-num').forEach((numEl) => {
                const target = parseInt(numEl.getAttribute('data-target'));
                gsap.fromTo(numEl,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2.2,
                        ease: 'power3.out',
                        snap: { innerText: 1 },
                        onUpdate: function () {
                            numEl.textContent = Math.round(this.targets()[0].innerText);
                        }
                    }
                );
            });
        }
    });
}

// ============================================================
// 11. Contact Form Submission Logic
// ============================================================
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-send');
    const textSpan = btn ? btn.querySelector('.btn-send-text') : null;

    if (btn && textSpan) {
        textSpan.textContent = 'TRANSMITTING...';
        btn.style.backgroundColor = '#f5f0e8';

        setTimeout(() => {
            textSpan.textContent = 'COMMISSION SENT';
            btn.style.backgroundColor = '#c8a97e';
            e.target.reset();
        }, 1500);
    }
}

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
    ACCESS_TOKEN: 'IGAAaG5UFyUBlBZAFktMVdHRloxNWE3MG93NEFsVm9pcWhZATUdGaGFmSVR6WnpzcGdWTmZAHTEZAhZA09YSnZArM2UtTEdpWldQX2tPUlEtNlhhbE9uUTB5TXJlSlowQ1l5Q05JcDJVV3RUTjhzdzRnX3BTeTZAXR29zaXJ0V0FOQXRBNAZDZD',

    // Your Instagram username (for display only):
    USERNAME: 'randomclicker.exe',

    // How many items to fetch per section:
    REELS_LIMIT: 50, // Increased to show all
    POSTS_LIMIT: 50, // Show all
    GALLERY_LIMIT: 45, // Set to 45 to show 90 items (45 * 2)
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
        console.warn('Instagram Graph API fallback engaged:', err.message);
        if (typeof EDITORIAL_ARCHIVE !== 'undefined' && EDITORIAL_ARCHIVE.length > 0) {
            allMedia = EDITORIAL_ARCHIVE;
            renderReels();
            renderPosts();
            renderGallery();
        } else {
            showError(err.message);
        }
    }
}

async function fetchProfile(token) {
    try {
        const res = await fetch(`${BASE}/me?fields=followers_count,media_count&access_token=${token}`);
        const data = await res.json();
        if (data.media_count && document.getElementById('stat-posts')) document.getElementById('stat-posts').textContent = data.media_count + '+';
        if (data.followers_count && document.getElementById('stat-followers')) {
            const n = data.followers_count;
            const s = n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;
            document.getElementById('stat-followers').textContent = s;
        }
    } catch (e) { }
}

function formatDate(ts) {
    if (!ts) return '';
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
    if (document.getElementById('reels-count')) document.getElementById('reels-count').textContent = reels.length + ' videos';
    if (!wrapper) return;

    if (!reels.length) {
        wrapper.innerHTML = '<div class="swiper-slide"><p style="color:rgba(255,255,255,0.3);font-size:0.78rem;">No reels found.</p></div>';
        return;
    }

    wrapper.innerHTML = reels.map(r => `
      <div class="swiper-slide">
        <div class="reel-card" data-cursor="PLAY" onclick="openLightbox('${r.media_url}','${escCap(r.caption)}', 'VIDEO')">
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

    if (typeof initCustomCursor === 'function') initCustomCursor();
    if (typeof initTiltEffects === 'function') initTiltEffects();
}

// POSTS
function renderPosts() {
    const posts = allMedia.filter(m => m.media_type === 'IMAGE' || m.media_type === 'CAROUSEL_ALBUM');
    const wrapper = document.getElementById('posts-wrapper');
    if (document.getElementById('posts-count')) document.getElementById('posts-count').textContent = posts.length + ' posts';
    if (!wrapper) return;

    if (!posts.length) {
        wrapper.innerHTML = '<div class="swiper-slide"><p style="color:var(--dust);font-size:0.78rem;">No posts found.</p></div>';
        return;
    }

    wrapper.innerHTML = posts.map(p => {
        const isAlbum = p.media_type === 'CAROUSEL_ALBUM';
        const children = isAlbum ? (albumChildren[p.id] || []) : [];
        const albumData = isAlbum ? b64Encode(JSON.stringify(children)) : '';

        return `
      <div class="swiper-slide">
        <div class="post-card" data-cursor="OPEN">
            <div class="post-img-wrap" onclick="openLightbox('${p.media_url}', '${escCap(p.caption)}', '${p.media_type}', '${albumData}')">
                ${isAlbum ? `<div class="album-badge">1 / ${children.length || 1}</div><div class="album-icon-overlay">⧉</div>` : ''}
                <img src="${p.media_url}" alt="Post" id="post-cover-${p.id}" loading="lazy">
            </div>
            <div class="post-body">
                <div class="post-meta">
                    <span class="post-date">${formatDate(p.timestamp)}</span>
                    ${p.like_count ? `<span class="post-likes">♥ ${p.like_count}</span>` : ''}
                </div>
                <p class="post-caption">${truncate(p.caption)}</p>
                ${isAlbum && children.length ? `
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

    if (typeof initCustomCursor === 'function') initCustomCursor();
    if (typeof initTiltEffects === 'function') initTiltEffects();
}

function updatePostPreview(postId, url, idx, caption, albumDataB64) {
    const img = document.getElementById(`post-cover-${postId}`);
    if (img) img.src = url;

    // Update active state in thumb strip
    const card = img.closest('.post-card');
    if (card) {
        card.querySelectorAll('.thumb-item').forEach((t, i) => {
            t.classList.toggle('active', i === idx);
        });

        // Update badge
        const badge = card.querySelector('.album-badge');
        const children = JSON.parse(b64Decode(albumDataB64));
        if (badge) badge.textContent = `${idx + 1} / ${children.length}`;

        // Update main click to open lightbox at this specific index
        const wrap = card.querySelector('.post-img-wrap');
        if (wrap) wrap.onclick = () => openLightbox(url, caption, children[idx].media_type, albumDataB64, idx);
    }
}

// GALLERY
function renderGallery(filter) {
    if (filter) galleryFilter = filter;
    let container = document.getElementById('gallery-container');
    if (!container) return;

    // Flatten media for gallery expansion
    let items = [];
    allMedia.forEach(m => {
        if (m.media_type === 'CAROUSEL_ALBUM') {
            const children = albumChildren[m.id] || [];
            if (children.length > 0) {
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
        } else {
            items.push(m);
        }
    });

    // Limit
    let displayItems = items.slice(0, CONFIG.GALLERY_LIMIT * 2); // Larger limit since we expand
    if (galleryFilter !== 'all') {
        displayItems = displayItems.filter(m => {
            if (galleryFilter === 'CAROUSEL_ALBUM') return m.isAlbumChild || m.media_type === 'CAROUSEL_ALBUM';
            return m.media_type === galleryFilter;
        });
    }

    if (document.getElementById('gallery-count')) document.getElementById('gallery-count').textContent = displayItems.length + ' items';

    if (!displayItems.length) {
        container.innerHTML = '<p style="color:var(--dust);font-size:0.78rem;column-span:all;">No items found.</p>';
        return;
    }

    container.innerHTML = displayItems.map(m => {
        const albumData = m.parentAlbum ? b64Encode(JSON.stringify(m.parentAlbum)) : '';
        return `
    <div class="gallery-item fade-up" data-cursor="${m.media_type === 'VIDEO' ? 'PLAY' : 'VIEW'}" onclick="openLightbox('${m.media_url}','${escCap(m.caption)}', '${m.media_type}', '${albumData}', ${m.childIdx || 0})">
      <img src="${m.media_type === 'VIDEO' ? (m.thumbnail_url || m.media_url) : m.media_url}" alt="Gallery" loading="lazy">
      ${m.isAlbumChild ? '<div class="gallery-pos-dot"></div>' : ''}
      <div class="gallery-item-overlay">
        <div class="gallery-view-icon">${m.media_type === 'VIDEO' ? '▶' : (m.isAlbumChild ? '⧉' : '+')}</div>
      </div>
    </div>
  `}).join('');

    if (typeof initCustomCursor === 'function') initCustomCursor();
    if (typeof initTiltEffects === 'function') initTiltEffects();
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
    if (banner) banner.style.display = 'block';

    const html = `
    <div class="token-state" style="padding:2rem; background:rgba(0,30,54,0.8); border-radius:12px; color:#fff;">
      <p style="margin-bottom:1rem; font-weight:600;">To auto-load your live Instagram content, add your Access Token:</p>
      <div class="token-input-row" style="display:flex; gap:10px; margin-top:1rem;">
        <input type="text" id="tokenInput" class="token-input" style="flex:1; padding:10px; border-radius:6px; border:none; color:#000;" placeholder="Paste your Instagram Access Token here…">
        <button class="btn-sm" style="padding:10px 20px; background:#31a8ff; border:none; border-radius:6px; color:#fff; cursor:pointer;" onclick="applyToken()">Connect</button>
      </div>
    </div>`;

    if (document.getElementById('reels-container')) document.getElementById('reels-container').innerHTML = html;
}

function applyToken() {
    const t = document.getElementById('tokenInput')?.value?.trim();
    if (!t) return;
    CONFIG.ACCESS_TOKEN = t;
    if (document.getElementById('setupBanner')) document.getElementById('setupBanner').style.display = 'none';
    fetchInstagram();
}

function showError(msg) {
    const html = `<div class="error-state"><p>Could not load Instagram data: <strong>${msg}</strong></p>
    <p>Check your access token and try again. Make sure your token has <em>instagram_graph_user_media</em> permission.</p></div>`;
    if (document.getElementById('reels-container')) document.getElementById('reels-container').innerHTML = html;
}

// ============================================================
// Lightbox & Slider
// ============================================================
let baseCaption = '';

function openLightbox(src, caption, type = 'IMAGE', albumData = '', index = 0) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
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
    if (window.lenis) window.lenis.stop();

    // Show/hide nav arrows
    if (document.getElementById('slider-prev')) document.getElementById('slider-prev').style.display = currentAlbumItems.length > 1 ? 'block' : 'none';
    if (document.getElementById('slider-next')) document.getElementById('slider-next').style.display = currentAlbumItems.length > 1 ? 'block' : 'none';
}

function renderSlide() {
    if (!currentAlbumItems || !currentAlbumItems[currentSlideIndex]) return;
    const item = currentAlbumItems[currentSlideIndex];
    const img = document.getElementById('lightbox-img');
    const videoWrap = document.getElementById('video-wrapper');
    const cap = document.getElementById('lightbox-caption');

    if (img) img.style.display = 'none';
    if (videoWrap) videoWrap.style.display = 'none';
    if (player) player.pause();

    if (item.media_type === 'VIDEO') {
        if (player) {
            player.source = {
                type: 'video',
                sources: [{ src: item.media_url, type: 'video/mp4' }]
            };
            if (videoWrap) videoWrap.style.display = 'block';
            player.once('ready', () => player.play());
        }
    } else {
        if (img) {
            img.src = item.media_url;
            img.style.display = 'block';
        }
    }

    let capText = baseCaption;
    if (currentAlbumItems.length > 1) {
        capText += ` · Photo ${currentSlideIndex + 1} of ${currentAlbumItems.length}`;
    }
    if (cap) cap.textContent = capText;
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
    if (player) player.pause();
    if (lb) lb.classList.remove('active');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
    currentAlbumItems = [];
    currentSlideIndex = 0;
}

// Keyboard navigation
document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'Escape') closeLightbox();
    }
});

const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
    lightboxEl.addEventListener('click', function (e) {
        if (e.target === this) closeLightbox();
    });
}

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
// Premium Luxury Editorial My Skills Section Initialization
// ============================================================
function initPremiumSkillsSection() {
    // 1. Swiper Slider Initialization
    if (typeof Swiper !== 'undefined' && document.querySelector('.skills-swiper')) {
        const skillsSwiper = new Swiper('.skills-swiper', {
            slidesPerView: 1.15,
            spaceBetween: 16,
            centeredSlides: true,
            loop: true,
            speed: 750,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
                sensitivity: 1
            },
            keyboard: {
                enabled: true
            },
            pagination: {
                el: '.skills-swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.skills-next-btn',
                prevEl: '.skills-prev-btn'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    centeredSlides: true
                },
                1200: {
                    slidesPerView: 3.5,
                    spaceBetween: 28,
                    centeredSlides: true
                },
                1440: {
                    slidesPerView: 4.5,
                    spaceBetween: 30,
                    centeredSlides: false
                }
            }
        });
    }

    // 2. Cursor Glow Follower for Section
    const skillsSection = document.querySelector('.premium-skills-section');
    const cursorGlow = document.getElementById('skillsCursorGlow');
    if (skillsSection && cursorGlow) {
        skillsSection.addEventListener('mousemove', (e) => {
            const rect = skillsSection.getBoundingClientRect();
            cursorGlow.style.left = `${e.clientX - rect.left}px`;
            cursorGlow.style.top = `${e.clientY - rect.top}px`;
        });
    }

    // 3. GSAP Scroll Fade-In & Progress Bars
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Section header & slider fade up
        gsap.utils.toArray('.fade-up').forEach((elem) => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%'
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
        });

        // Stagger in masonry skill cards & animate progress bars
        ScrollTrigger.create({
            trigger: '.masonry-skills-grid',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                // Stagger cards
                gsap.from('.masonry-skill-card', {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out'
                });

                // Animate progress bars
                document.querySelectorAll('.skill-progress-bar').forEach((bar) => {
                    const targetWidth = bar.getAttribute('data-width');
                    gsap.fromTo(bar, { width: '0%' }, { width: targetWidth, duration: 1.8, ease: 'power3.out', delay: 0.3 });
                });

                // Counter animation
                document.querySelectorAll('.masonry-skills-grid .counter-num').forEach((counter) => {
                    const targetNum = parseInt(counter.getAttribute('data-target'));
                    gsap.fromTo(counter, { innerText: 0 }, {
                        innerText: targetNum,
                        duration: 1.8,
                        ease: 'power3.out',
                        delay: 0.3,
                        snap: { innerText: 1 },
                        onUpdate: function () {
                            counter.textContent = Math.round(this.targets()[0].innerText);
                        }
                    });
                });
            }
        });
    }

    // 4. Click Ripple Micro-Interaction
    document.querySelectorAll('.ripple-trigger, .slide-cta-link').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const circle = document.createElement('span');
            circle.classList.add('ripple-circle');
            const diameter = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
            circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
            this.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        });
    });
}

function initTestimonialsSlider() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            grabCursor: true
        });
    }
}

// ============================================================
// APPLICATION ENTRY POINT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavbar();
    initCustomCursor();
    initTiltEffects();
    initStatsCounters();
    initPremiumSkillsSection();
    initTestimonialsSlider();
    fetchInstagram();
});
