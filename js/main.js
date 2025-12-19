// 2024 富國島渡假之旅 - 主要 JavaScript
// 熱帶海島玻璃擬態主題

document.addEventListener('DOMContentLoaded', function() {
    // ========== 氣泡動畫生成 ==========
    function createBubbles() {
        const container = document.querySelector('.bubbles');
        if (!container) return;
        
        // 清除現有氣泡
        container.innerHTML = '';
        
        for (let i = 0; i < 30; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 30 + 10;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = (Math.random() * 8 + 6) + 's';
            bubble.style.animationDelay = Math.random() * 15 + 's';
            container.appendChild(bubble);
        }
    }
    
    // 初始化氣泡
    createBubbles();

    // ========== 導航列漢堡選單 ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // 點擊連結後關閉選單
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    }

    // ========== Lightbox 燈箱功能 ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    // 為所有圖片添加點擊事件
    document.querySelectorAll('.photo-gallery img, .card-image-placeholder img, .group-photo-placeholder img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // 關閉燈箱
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ESC 鍵關閉燈箱
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ========== PWA 安裝提示 ==========
    let deferredPrompt;
    const pwaPrompt = document.getElementById('pwaPrompt');
    const pwaInstall = document.getElementById('pwaInstall');
    const pwaClose = document.getElementById('pwaClose');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        if (pwaPrompt) {
            pwaPrompt.classList.add('show');
        }
    });

    if (pwaInstall) {
        pwaInstall.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`PWA 安裝結果: ${outcome}`);
                deferredPrompt = null;
                
                if (pwaPrompt) {
                    pwaPrompt.classList.remove('show');
                }
            }
        });
    }

    if (pwaClose) {
        pwaClose.addEventListener('click', () => {
            if (pwaPrompt) {
                pwaPrompt.classList.remove('show');
            }
        });
    }

    // ========== Service Worker 註冊 ==========
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker 註冊成功:', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker 註冊失敗:', error);
                });
        });
    }

    // ========== 滾動動畫效果 ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 為區塊添加淡入效果
    document.querySelectorAll('section, .timeline-item, .highlight-card, .couple-card, .schedule-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // ========== 導航列滾動效果（玻璃擬態） ==========
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 22, 40, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 206, 209, 0.15)';
            } else {
                navbar.style.background = 'rgba(10, 22, 40, 0.85)';
                navbar.style.boxShadow = 'none';
            }
        }
        lastScrollY = window.scrollY;
    });

    // ========== 圖片懶載入 ==========
    if ('loading' in HTMLImageElement.prototype) {
        // 瀏覽器原生支援懶載入
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // 降級方案：使用 Intersection Observer
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========== 頁面載入完成 ==========
    console.log('🏝️ 2024 富國島渡假之旅網站載入完成！');
    console.log('🌊 熱帶海島玻璃擬態主題已啟用');
});
