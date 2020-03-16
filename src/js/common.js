import SmoothScroll from 'smooth-scroll';
import Choices from 'choices.js';
import noUiSlider from 'nouislider';

import './modules/form';

const scroll = new SmoothScroll();

const scrollTo = (element) => {
    const rect = element.getBoundingClientRect();
    const offset = rect.top + window.pageYOffset;
    setTimeout(() => {
        scroll.animateScroll(offset, null, {
            speed: 600,
            durationMin: 400,
            speedAsDuration: true,
            easing: 'easeInOutQuint',
        });
    }, 200)
};

const getElementByAttrHref = (link) => {
    return document.getElementById(
        link.getAttribute('href')
            .replace(/#/g, '')
    );
};

const handleDocumentClick = (e) => {
    if(e.target.matches('.hamburger, .hamburger *')){
        showMenu(e);
    }else if(e.target.matches('.nav__close, .nav__close *')){
        closeMenu();
    } else if (e.target.matches('.nav__link, .nav__link *')){
        e.preventDefault();
        const link = e.target;
        const anchor = getElementByAttrHref(link);

        Array.from(document.querySelectorAll('.nav__link')).forEach(
            e => e.classList.remove('active')
        );

        if(!link.classList.contains('active')) {
            link.classList.add('active')
        }

        const nav = link.closest('.nav');
        if(nav.classList.contains('opened')){
            closeMenu();
        }

        if(anchor) scrollTo(anchor);
    }
};

document.body.addEventListener('click', handleDocumentClick);

const state = {
    jsSlider: null,
};

const initRangeSlider = (slider, orient) => {
    noUiSlider.create(slider, {
        start: 3,
        connect: [true, false],
        orientation: orient,
        step: 1,
        pips: {
            mode: 'steps',
            density: 3,
            format: {
                to: function (value) {
                    switch(value){
                        case 0 :
                            return 'Не владею';
                        case 1 :
                            return 'Использую готовые  <br>' +
                                'решения';
                        case 2 :
                            return 'Использую готовые решения  <br>' +
                                'и умею и переделывать';
                        case 4 :
                            return 'Пишу сложный JS с нуля';
                        default:
                            return '';
                    }
                }
            }
        },
        range: {
            'min': 0,
            'max': 4
        }
    });
};

const  closeMenu = () => {
    document.body.removeAttribute('style');
    document.documentElement.removeAttribute('style');
    document.querySelector('header .hamburger').classList.toggle('is-active');
    document.querySelector('.nav').classList.toggle('opened');
};

const  showMenu = (e) => {
    e.target.closest('.hamburger').classList.toggle('is-active');
    document.body.style.cssText = "overflow: hidden";
    document.documentElement.style.cssText = "overflow: hidden";
    document.querySelector('.nav').classList.toggle('opened');
};

document.addEventListener("DOMContentLoaded", () => {
    const choices = new Choices('.field-select', {
        placeholder: true,
        searchEnabled: false,
        searchChoices: false,
        itemSelectText: ''
    });

    document.addEventListener('focusout', (e) => {
        if(e.target.matches('.field-input')){
            if(e.target.value === ''){
                e.target.classList.remove('active');
            } else {
                e.target.classList.add('active');
            }
        }
    });

    Array.from(document.querySelectorAll('.field-input')).forEach(input => {
        if(input.value !== '') {
            input.classList.add('active');
        }
    });

    state.jsSlider = document.getElementById('jsLevel');

    initRangeSlider(state.jsSlider, 'horizontal');

});

function handleLoadResize(e){
    const isHorizontal = state.jsSlider.classList.contains('noUi-horizontal');
    if(this.innerWidth < 800) {
        if(isHorizontal){
            state.jsSlider.noUiSlider.destroy();
            initRangeSlider(state.jsSlider, 'vertical');
        }
    } else {
        if(!isHorizontal){
            state.jsSlider.noUiSlider.destroy();
            initRangeSlider(state.jsSlider, 'horizontal');
        }
    }
}

window.addEventListener('resize', handleLoadResize, false);
window.addEventListener('load', handleLoadResize, false);