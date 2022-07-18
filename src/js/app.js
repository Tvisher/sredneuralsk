'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
    EffectCreative
} from 'swiper';

import IMask from 'imask';

// Проверка поддержки webP
baseFunction.testWebP();

window.addEventListener('load', (e) => {
    document.body.style.opacity = 1;
});



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
    slidesPerView: 3,
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
        992: {
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


//логика работы меню бургер
document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }
    if (target.closest('.fullscreen-slider__desc')) {
        target.closest('.fullscreen-slider__desc').classList.add('open');
    }
});

// Маска на номера телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7}(000) 000-00-00'
    });
});



