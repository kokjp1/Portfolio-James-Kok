"use strict";
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
function handleThemeChange(event) {
    const target = event.target;
    if (target && target.value) {
        const selectedTheme = target.value;
        localStorage.setItem('theme', selectedTheme);
        applyTheme(selectedTheme);
    }
}
document.querySelectorAll('.theme-controller').forEach(input => {
    input.addEventListener('change', handleThemeChange);
});
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
        const themeRadio = document.querySelector(`input[value="${savedTheme}"]`);
        if (themeRadio) {
            themeRadio.checked = true;
        }
    }
});
