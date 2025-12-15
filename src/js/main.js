// 2024 富國島旅行紀念網站 - JavaScript
// PWA + RWD + 熱帶風格

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // 導航列功能
    // ========================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // 滾動時導航列效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 漢堡選單切換
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 點擊選單項目後關閉選單
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // 點擊外部關閉選單
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========================================
    // 圖片載入功能
    // ========================================
    function loadImages() {
        // 團體照
        const groupPhoto = document.querySelector('.group-photo-placeholder');
        if (groupPhoto) {
            const img = new Image();
            img.src = 'images/group-photo.jpg';
            img.alt = '2024 富國島團體照';
            img.onload = function() {
                groupPhoto.innerHTML = '';
                groupPhoto.classList.add('has-image');
                groupPhoto.appendChild(img);
            };
        }

        // 景點圖片
        const highlightCards = document.querySelectorAll('.card-image-placeholder');
        highlightCards.forEach(function(card) {
            const small = card.querySelector('small');
            if (small) {
                const imgPath = small.textContent;
                const img = new Image();
                img.src = imgPath;
                img.alt = card.querySelector('.placeholder-icon')?.textContent || '景點照片';
                img.onload = function() {
                    card.innerHTML = '';
                    card.classList.add('has-image');
                    card.appendChild(img);
                };
            }
        });

        // 相簿圖片
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(function(item, index) {
            const small = item.querySelector('small');
            if (small) {
                const imgPath = small.textContent;
                const img = new Image();
                img.src = imgPath;
                img.alt = `旅行照片 ${index + 1}`;
                img.loading = 'lazy'; // 延遲載入
                img.onload = function() {
                    item.innerHTML = '';
                    item.classList.add('has-image');
                    item.appendChild(img);
                };
            }
        });
    }

    loadImages();

    // ========================================
    // 燈箱功能 - 增強版（支援滿版放大、左右切換）
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    function openLightbox(src, alt, galleryImages, index) {
        if (lightbox && lightboxImg) {
            currentGalleryImages = galleryImages || [];
            currentImageIndex = index || 0;
            
            lightboxImg.src = src;
            lightboxImg.alt = alt || '放大圖片';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 更新導航按鈕顯示
            updateLightboxNav();
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            currentGalleryImages = [];
            currentImageIndex = 0;
        }
    }
    
    function showPrevImage() {
        if (currentGalleryImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
            updateLightboxImage();
        }
    }
    
    function showNextImage() {
        if (currentGalleryImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
            updateLightboxImage();
        }
    }
    
    function updateLightboxImage() {
        if (lightboxImg && currentGalleryImages[currentImageIndex]) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = currentGalleryImages[currentImageIndex].src;
                lightboxImg.alt = currentGalleryImages[currentImageIndex].alt;
                lightboxImg.style.opacity = '1';
                updateLightboxNav();
            }, 150);
        }
    }
    
    function updateLightboxNav() {
        // 添加或更新導航元素
        let prevBtn = document.querySelector('.lightbox-prev');
        let nextBtn = document.querySelector('.lightbox-next');
        let counter = document.querySelector('.lightbox-counter');
        
        if (currentGalleryImages.length > 1) {
            if (!prevBtn) {
                prevBtn = document.createElement('span');
                prevBtn.className = 'lightbox-nav lightbox-prev';
                prevBtn.innerHTML = '‹';
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showPrevImage();
                });
                lightbox.appendChild(prevBtn);
            }
            
            if (!nextBtn) {
                nextBtn = document.createElement('span');
                nextBtn.className = 'lightbox-nav lightbox-next';
                nextBtn.innerHTML = '›';
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showNextImage();
                });
                lightbox.appendChild(nextBtn);
            }
            
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'lightbox-counter';
                lightbox.appendChild(counter);
            }
            
            counter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            counter.style.display = 'block';
        } else {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (counter) counter.style.display = 'none';
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === lightboxImg) {
                closeLightbox();
            }
        });
    }

    // ESC 關閉燈箱，方向鍵切換
    document.addEventListener('keydown', function(e) {
        if (lightbox?.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // 為已載入的圖片添加燈箱點擊事件
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item.has-image');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            if (img) {
                // 收集同一個 gallery 中的所有圖片
                const gallery = galleryItem.closest('.gallery-grid');
                const allImages = gallery ? Array.from(gallery.querySelectorAll('.gallery-item.has-image img')) : [img];
                const imageData = allImages.map(i => ({ src: i.src, alt: i.alt }));
                const currentIndex = allImages.indexOf(img);
                
                openLightbox(img.src, img.alt, imageData, currentIndex);
            }
        }
    });
    
    // 觸控滑動支援
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }

    // ========================================
    // 平滑滾動
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // 滾動顯示動畫
    // ========================================
    function initScrollReveal() {
        const elements = document.querySelectorAll(
            '.highlight-card, .timeline-item, .attraction-section, .intro-text, .photo-gallery'
        );
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-reveal', 'revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => {
                el.classList.add('scroll-reveal');
                observer.observe(el);
            });
        } else {
            // 降級處理：直接顯示
            elements.forEach(el => {
                el.classList.add('scroll-reveal', 'revealed');
            });
        }
    }

    initScrollReveal();

    // ========================================
    // PWA 功能
    // ========================================
    
    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('sw.js');
                console.log('✅ Service Worker 註冊成功:', registration.scope);
            } catch (error) {
                console.log('❌ Service Worker 註冊失敗:', error);
            }
        });
    }

    // PWA 安裝提示
    let deferredPrompt;
    const pwaPrompt = document.getElementById('pwaPrompt');
    const pwaInstall = document.getElementById('pwaInstall');
    const pwaClose = document.getElementById('pwaClose');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // 延遲顯示安裝提示
        setTimeout(() => {
            if (pwaPrompt) {
                pwaPrompt.classList.add('show');
            }
        }, 3000);
    });

    if (pwaInstall) {
        pwaInstall.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`PWA 安裝結果: ${outcome}`);
                deferredPrompt = null;
                pwaPrompt.classList.remove('show');
            }
        });
    }

    if (pwaClose) {
        pwaClose.addEventListener('click', () => {
            pwaPrompt.classList.remove('show');
        });
    }

    // 監聽 App 安裝完成
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA 已成功安裝！');
        if (pwaPrompt) {
            pwaPrompt.classList.remove('show');
        }
    });

    // ========================================
    // 觸控裝置支援
    // ========================================
    
    // 檢測觸控裝置
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // 防止 iOS 雙擊縮放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    console.log('🏝️ 2024 富國島紀念網站載入完成！');
});
