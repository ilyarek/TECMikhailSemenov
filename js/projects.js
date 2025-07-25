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
                            
                            // Закрытие мобильного меню, если оно открыто
                            if (navMenu && navMenu.classList.contains('active')) {
                                navMenu.classList.remove('active');
                                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                            }
                        }
                    }
                });
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
        });
