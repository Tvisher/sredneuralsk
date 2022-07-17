'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
} from 'swiper';

import IMask from 'imask';

// Проверка поддержки webP
baseFunction.testWebP();

window.addEventListener('load', (e) => {
    document.body.style.opacity = 1;
});



const mainScreenSlider = new Swiper('.main-screen__slider', {
    modules: [EffectFade, Pagination],
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: 1
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 1,
    },
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



