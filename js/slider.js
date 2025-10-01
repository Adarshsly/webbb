class AutoSlider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.gallery-prewiev-item');
        this.currentSlide = 0;
        this.intervalTime = 4000; // 4 секунды между слайдами
        this.interval = null;
        this.isManualChange = false; // Флаг ручного переключения
        
        this.init();
    }
    
    init() {
        // Создаем индикаторы
        this.createIndicators();
        
        // Показываем первый слайд
        this.showSlide(0);
        
        // Запускаем автоматическую смену
        this.startAutoSlide();
        
        // Добавляем обработчики событий для паузы при наведении
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Обработчики для кликов по индикаторам
        this.addIndicatorHandlers();
    }
    
    createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slider-indicators';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('data-slide', index);
            dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
            indicatorsContainer.appendChild(dot);
        });
        
        this.container.appendChild(indicatorsContainer);
        this.dots = this.container.querySelectorAll('.slider-dot');
    }
    
    showSlide(index) {
        // Скрываем все слайды
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Убираем активный класс со всех точек
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        // Если было ручное переключение, сбрасываем флаг и выходим
        if (this.isManualChange) {
            this.isManualChange = false;
            return;
        }
        
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }
    
    goToSlide(index) {
        // Устанавливаем флаг ручного переключения
        this.isManualChange = true;
        this.showSlide(index);
        
        // Перезапускаем таймер после ручного переключения
        this.restartAutoSlide();
    }
    
    startAutoSlide() {
        // Останавливаем предыдущий таймер если есть
        this.stopAutoSlide();
        
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.intervalTime);
    }
    
    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    addIndicatorHandlers() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }
}

// Инициализация слайдера когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.hero-gallery-prewiev');
    if (sliderContainer) {
        new AutoSlider(sliderContainer);
    }
});