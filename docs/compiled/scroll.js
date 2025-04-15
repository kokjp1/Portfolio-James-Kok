"use strict";
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const documentHeight = document.body.offsetHeight;
    const viewportHeight = window.innerHeight;
    document.body.style.setProperty('--scroll', (scrollPosition / (documentHeight - viewportHeight)).toString());
});
