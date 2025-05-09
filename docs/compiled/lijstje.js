"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const projectList = new List('projects', {
        valueNames: ['name', 'category']
    });
    const filterForm = document.querySelector('.filter');
    const radios = filterForm.querySelectorAll('input[type="radio"]');
    const resetBtn = filterForm.querySelector('input[type="reset"]');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const cat = radio.getAttribute('aria-label');
            projectList.filter((item) => item.values().category === cat);
        });
    });
    resetBtn.addEventListener('click', () => {
        // clear the checked state *and* the List.js filter
        filterForm.reset();
        projectList.filter();
    });
    const searchInput = document.querySelector('.search');
    searchInput.addEventListener('input', () => {
        const term = searchInput.value;
        if (term) {
            // only search in the "name" field
            projectList.search(term, ['name']);
        }
        else {
            // clear search (keeps any active category filter)
            projectList.search();
        }
    });
});
