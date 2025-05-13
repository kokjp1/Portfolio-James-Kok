"use strict";
//carousel.ts
const pagLinks = document.querySelectorAll('.carousel-pagination a');
function updateActive() {
    const current = window.location.hash || '#slide1';
    pagLinks.forEach((link) => {
        link.classList.toggle('btn-active', link.getAttribute('href') === current);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        history.replaceState(null, '', '#slide1');
    }
    updateActive();
    window.addEventListener('hashchange', updateActive);
});
