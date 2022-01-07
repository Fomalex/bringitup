import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    filterSlides(slides) {
        return [...slides].filter(item => item.tagName !== 'BUTTON');
    }

    decorizeSlides() {
        this.filterSlides(this.slides).forEach(item => {
            item.classList.remove(this.activeClass);
            if (this.animate) {
                item.querySelector('.card__title').style.opacity = '0.4';
                item.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        this.filterSlides(this.slides)[0].classList.add(this.activeClass);
        if (this.animate) {
            this.filterSlides(this.slides)[0].querySelector('.card__title').style.opacity = '1';
            this.filterSlides(this.slides)[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        try {
            this.container.appendChild(this.filterSlides(this.slides)[0]);
            this.decorizeSlides();
        } catch (e) {}
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            let active = this.filterSlides(this.slides)[this.filterSlides(this.slides).length - 1];
            this.container.insertBefore(active, this.filterSlides(this.slides)[0]);
            this.decorizeSlides();
        });
    }

    activateAutoplay() {
        this.pause = setInterval(() => this.nextSlide(), 5000);
    }

    init() {
        try {
            if (this.autoplay) {
                this.activateAutoplay();

                [this.prev, this.next, this.filterSlides(this.slides)[0].parentElement].forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        clearInterval(this.pause);
                    });

                    item.addEventListener('mouseleave', () => {
                        this.activateAutoplay();
                    });
                });
            }

            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

            this.decorizeSlides();
            this.bindTriggers();
        } catch (e) {
        }
    }
}
