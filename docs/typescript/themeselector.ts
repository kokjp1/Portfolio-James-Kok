function applyTheme(theme: string): void {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Update the visible label on the theme-selector button.
 * Assumes the button is:
 *   <div role="button" class="btn m-1">…</div>
 */
function updateThemeButtonLabel(label: string): void {
  // target the button in the navbar-end dropdown
  const btn = document.querySelector<HTMLDivElement>(
    '.navbar-end .dropdown > div[role="button"]'
  );
  if (!btn) return;

  // find the very first child text node and replace it
  const firstChild = btn.childNodes[0];
  if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
    (firstChild as Text).textContent = label + ' ';
  } else {
    // fallback: prepend a text node
    btn.insertAdjacentText('afterbegin', label + ' ');
  }
}

function handleThemeChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target || !target.value) return;

  const themeValue = target.value;                             // e.g. "dark"
  const themeLabel = target.getAttribute('aria-label') ?? themeValue; // e.g. "Dark"

  localStorage.setItem('theme', themeValue);
  applyTheme(themeValue);
  updateThemeButtonLabel(themeLabel);
}

document
  .querySelectorAll<HTMLInputElement>('.theme-controller')
  .forEach(input => input.addEventListener('change', handleThemeChange));

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);

    const radio = document.querySelector<HTMLInputElement>(`input[value="${saved}"]`);
    if (radio) {
      radio.checked = true;
      const savedLabel = radio.getAttribute('aria-label') ?? saved;
      updateThemeButtonLabel(savedLabel);
    }
  }
});
