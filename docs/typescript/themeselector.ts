function applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  function handleThemeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      const selectedTheme = target.value;
      localStorage.setItem('theme', selectedTheme);
      applyTheme(selectedTheme);
    }
  }
  
  document.querySelectorAll<HTMLInputElement>('.theme-controller').forEach(input => {
    input.addEventListener('change', handleThemeChange);
  });
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
      const themeRadio = document.querySelector(`input[value="${savedTheme}"]`) as HTMLInputElement;
      if (themeRadio) {
        themeRadio.checked = true;
      }
    }
  });
  