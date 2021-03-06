'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
    EffectCreative,
    Thumbs
} from 'swiper';
import IMask from 'imask';
import AirDatepicker from 'air-datepicker';


window.AirDatepicker = AirDatepicker;
// Проверка поддержки webP
baseFunction.testWebP();

const mainScreenSlider = new Swiper('.main-screen__slider', {
    modules: [EffectFade, Pagination, Autoplay],
    slidesPerView: 1,
    effect: 'fade',
    loop: 1,
    fadeEffect: {
        crossFade: 1
    },
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 1,
    },
});

const honorariesSlider = new Swiper('.honoraries__slider', {
    modules: [Pagination, Autoplay],
    grabCursor: 1,
    slidesPerView: 1,
    loop: 1,
    autoplay: {
        delay: 5000,
    },
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 1,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 45,
        }
    }
});

const afficheSliderSpeed = 500;
const afficheSlider = new Swiper('.affiche__slider', {
    modules: [EffectCreative, Navigation],
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: afficheSliderSpeed,
    navigation: {
        nextEl: '.swiper-button-next.aff',
        prevEl: '.swiper-button-prev.aff',
    },
    effect: 'creative',
    creativeEffect: {
        shadowPerProgress: 2,
        limitProgress: 1.40,
        prev: {
            translate: ['-92.5%', '0%', 0],
            origin: 'center center',
            scale: 0.9,
        },
        next: {
            translate: ['92.5%', '0%', 0],
            origin: 'center center',
            scale: 0.9,
        },
    },
    on: {
        slideChangeTransitionStart(swiper) {
            swiper.disable()
            setTimeout(() => {
                swiper.enable();
            }, afficheSliderSpeed);
        },
    }
});



// Галерея статьи
const galeryThumbsSlider = new Swiper(".galery-thumbs-slider", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
});
const galerySlider = new Swiper(".galery-slider", {
    modules: [Thumbs, Navigation, Pagination],
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    thumbs: {
        swiper: galeryThumbsSlider,
    },
});

document.body.addEventListener('click', (e) => {
    const target = e.target;

    //логика работы меню бургер
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }

    //логика работы табов
    if (target.hasAttribute('data-tab-control')) {
        const activeTab = document.querySelector('[data-tab-content].active');
        if (activeTab) { activeTab.classList.remove('active') }
        const activeTabBtn = document.querySelector('[data-tab-control].active');
        if (activeTabBtn) { activeTabBtn.classList.remove('active') }
        const tabId = target.getAttribute('data-tab-control');
        target.classList.add('active');
        const tabContentWhatINeed = document.querySelector(`[data-tab-content="${tabId}"]`);
        if (tabContentWhatINeed) { tabContentWhatINeed.classList.add('active') }
    }

    if (target.closest('[data-open-hide-text]')) {
        let btn = target.closest('[data-open-hide-text]');
        btn.classList.toggle('open');
        btn.closest('.list-item').classList.toggle('toggle');
    }
});

// Маска на номера телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7}(000) 000-00-00'
    });
});


// Показать/Скрыть описание в документе 
document.addEventListener('DOMContentLoaded', () => {
    function showOrHidedescription() {
        const listOfLongText = document.querySelectorAll('.list-item__body');
        if (listOfLongText) {
            listOfLongText.forEach(item => {
                if (item.clientHeight > 60) {
                    item.parentElement.classList.add('hide');
                }
            });
        }
    };
    showOrHidedescription();
    window.addEventListener('resize', () => {
        showOrHidedescription();
    });

})