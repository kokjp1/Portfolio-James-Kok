"use strict";
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
/**
 * Update the visible label on the theme-selector button.
 * Assumes the button is:
 *   <div role="button" class="btn m-1">…</div>
 */
function updateThemeButtonLabel(label) {
    // target the button in the navbar-end dropdown
    const btn = document.querySelector('.navbar-end .dropdown > div[role="button"]');
    if (!btn)
        return;
    // find the very first child text node and replace it
    const firstChild = btn.childNodes[0];
    if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
        firstChild.textContent = label + ' ';
    }
    else {
        // fallback: prepend a text node
        btn.insertAdjacentText('afterbegin', label + ' ');
    }
}
function handleThemeChange(event) {
    var _a;
    const target = event.target;
    if (!target || !target.value)
        return;
    const themeValue = target.value; // e.g. "dark"
    const themeLabel = (_a = target.getAttribute('aria-label')) !== null && _a !== void 0 ? _a : themeValue; // e.g. "Dark"
    localStorage.setItem('theme', themeValue);
    applyTheme(themeValue);
    updateThemeButtonLabel(themeLabel);
}
document
    .querySelectorAll('.theme-controller')
    .forEach(input => input.addEventListener('change', handleThemeChange));
window.addEventListener('DOMContentLoaded', () => {
    var _a;
    const saved = localStorage.getItem('theme');
    if (saved) {
        applyTheme(saved);
        const radio = document.querySelector(`input[value="${saved}"]`);
        if (radio) {
            radio.checked = true;
            const savedLabel = (_a = radio.getAttribute('aria-label')) !== null && _a !== void 0 ? _a : saved;
            updateThemeButtonLabel(savedLabel);
        }
    }
});
