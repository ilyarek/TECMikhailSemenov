	document.addEventListener('DOMContentLoaded', function() {
            // Переключение мобильного меню
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    mobileMenuToggle.innerHTML = navMenu.classList.contains('active') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
            
            // Эффект прокрутки для заголовка
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Плавная прокрутка для якорных ссылок
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Close mobile menu if open
                            if (navMenu && navMenu.classList.contains('active')) {
                                navMenu.classList.remove('active');
                                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                            }
                        }
                    }
                });
            });
            
            // Отправка формы
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const submitButton = this.querySelector('button[type="submit"]');
                    const originalText = submitButton.innerHTML;
                    
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
                    submitButton.disabled = true;
                    
                    setTimeout(() => {
                        submitButton.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
                        
                        // Показать сообщение об успехе
                        const notification = document.createElement('div');
                        notification.innerHTML = `
                            <div style="position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 1.5rem; background: var(--accent); color: white; border-radius: var(--radius); box-shadow: var(--shadow-lg); z-index: 1000; animation: fadeIn 0.3s ease-out;">
                                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                                Сообщение успешно отправлено!
                            </div>
                        `;
                        document.body.appendChild(notification);
                        
                        // Сброс формы
                        this.reset();
                        
                        setTimeout(() => {
                            notification.style.animation = 'fadeOut 0.3s ease-out';
                            setTimeout(() => notification.remove(), 300);
                        }, 3000);
                        
                        setTimeout(() => {
                            submitButton.innerHTML = originalText;
                            submitButton.disabled = false;
                        }, 2000);
                    }, 1500);
                });
            }
            
            // Инициализация переключения
            const swiper = new Swiper('.swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            });

            // Наблюдатель пересечений для анимаций
            const animateElements = document.querySelectorAll('.animate-slide-up, .animate-fade');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        if (entry.target.classList.contains('animate-slide-up')) {
                            entry.target.style.transform = 'translateY(0)';
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animateElements.forEach(el => {
                el.style.opacity = '0';
                if (el.classList.contains('animate-slide-up')) {
                    el.style.transform = 'translateY(30px)';
                }
                observer.observe(el);
            });
            
            // Add fadeOut animation to style
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(20px); }
                }
            `;
            document.head.appendChild(style);
        });
