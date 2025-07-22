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
		        const btnText = submitButton.querySelector('.btn-text');
		        const btnLoading = submitButton.querySelector('.btn-loading');
		        const privacyCheckbox = this.querySelector('#privacy');
		        
		        if (!privacyCheckbox.checked) {
		            showNotification('Пожалуйста, примите условия политики конфиденциальности', 'error');
		            return;
		        }
		        
		        btnText.style.display = 'none';
		        btnLoading.style.display = 'inline-block';
		        submitButton.disabled = true;
		        
		        const formData = new FormData(this);
		        const formDataObj = Object.fromEntries(formData.entries());
		        
		        // Здесь нужно указать URL вашего обработчика формы на сервере
		        const formActionURL = 'https://www.mikhailsemenov.com/wp-admin/admin-ajax.php';
		        
		        fetch(formActionURL, {
		            method: 'POST',
		            headers: {
		                'Content-Type': 'application/json',
		            },
		            body: JSON.stringify(formDataObj)
		        })
		        .then(response => {
		            if (!response.ok) {
		                throw new Error('Network response was not ok');
		            }
		            return response.json();
		        })
		        .then(data => {
		            if (data.success) {
		                showNotification('Сообщение успешно отправлено!', 'success');
		                this.reset();
		            } else {
		                showNotification('Ошибка при отправке: ' + (data.message || 'Неизвестная ошибка'), 'error');
		            }
		        })
		        .catch(error => {
		            console.error('Error:', error);
		            showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.', 'error');
		        })
		        .finally(() => {
		            btnText.style.display = 'inline-block';
		            btnLoading.style.display = 'none';
		            submitButton.disabled = false;
		        });
		    });
		}
		
		function showNotification(message, type = 'success') {
		    const existingNotifications = document.querySelectorAll('.notification');
		    existingNotifications.forEach(notification => notification.remove());
		    
		    const notification = document.createElement('div');
		    notification.className = `notification notification-${type}`;
		    notification.innerHTML = `
		        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
		        <span>${message}</span>
		    `;
		    
		    document.body.appendChild(notification);
		    
		    setTimeout(() => {
		        notification.classList.add('show');
		    }, 10);
		    
		    setTimeout(() => {
		        notification.classList.remove('show');
		        setTimeout(() => notification.remove(), 300);
		    }, 5000);
		}
            
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
