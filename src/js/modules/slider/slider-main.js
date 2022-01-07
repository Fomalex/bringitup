import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        try {
            this.hanson = document.querySelector('.hanson');
        } catch (e) {
        }

        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            if (n === 3) {
                this.hanson.style.opacity = '0';
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('animated', 'slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) {
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('animated', 'fadeIn');
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' || e.target.tagName === 'svg' || e.target.tagName === 'path') {
                    this.plusSlides(1);
                }
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' || e.target.tagName === 'svg' || e.target.tagName === 'path') {
                    e.preventDefault();

                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                }
            });
        });
        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.plusSlides(-1);
            });
        });

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            this.bindTriggers();
            this.showSlides(this.slideIndex);
        }
    }
}
