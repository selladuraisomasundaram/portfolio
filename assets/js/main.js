/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Validate if constants exist */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the bg-header class
    window.scrollY >= 50 ? header.classList.add('bg-header') 
                         : header.classList.remove('bg-header');
};
window.addEventListener('scroll', bgHeader);

/*=============== QUALIFICATION TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');

        tabs.forEach(t => {
            t.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    });
});

/*=============== SWIPER PROJECTS ===============*/
if (typeof Swiper !== 'undefined') {
    let swiperProjects = new Swiper('.projects__container', {
        loop: true,
        spaceBetween: 24,
        grabCursor: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
            1200: {
                spaceBetween: -56,
            },
        },
    });
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    // When scroll is higher than 350 viewport height, add show-scroll class
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                          : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Default to Dark Theme for a premium developer portfolio feel if no preference
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
} else {
    // Default to dark theme for modern developer look
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

/*=============== CONTACT FORM SUBMIT ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const project = document.getElementById('contact-project').value;

        if (name === '' || email === '' || project === '') {
            contactMessage.classList.remove('color-success');
            contactMessage.classList.add('color-error');
            contactMessage.textContent = 'Please fill in all the input fields.';
            e.preventDefault();
            return;
        }

        // Show friendly feedback and trigger client email compose
        contactMessage.classList.remove('color-error');
        contactMessage.classList.add('color-success');
        contactMessage.textContent = 'Preparing email dispatch... Opening your mail application.';

        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
    });
}

/*=============== CURRENT YEAR IN FOOTER ===============*/
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 300,
        reset: false,
    });

    sr.reveal('.home__data');
    sr.reveal('.home__perfil-box', { delay: 400, origin: 'bottom' });
    sr.reveal('.home__info', { delay: 500, origin: 'right' });
    sr.reveal('.skills__content:nth-child(1)', { origin: 'left' });
    sr.reveal('.skills__content:nth-child(2)', { origin: 'right' });
    sr.reveal('.qualification__tabs, .qualification__sections', { delay: 300 });
    sr.reveal('.services__card', { interval: 100 });
    sr.reveal('.projects__container', { delay: 300 });
    sr.reveal('.contact__info', { origin: 'left' });
    sr.reveal('.contact__form', { origin: 'right' });
    sr.reveal('.footer__container', { delay: 200 });
}
