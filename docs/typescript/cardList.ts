// cardList.ts

// list.js & AOS do not work together :/

declare const List: any;

function fadeInVisibleItems(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('.list article'));

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView && item.classList.contains('opacity-0')) {
      setTimeout(() => {
        item.classList.remove('opacity-0', 'translate-y-4');
      }, index * 75); 
    }
  });
}


window.addEventListener('DOMContentLoaded', () => {
  const projectList = new List('projects', {
    valueNames: ['name', 'category']
  });

  const filterForm = document.querySelector<HTMLFormElement>('.filter')!;
  const radios     = filterForm.querySelectorAll<HTMLInputElement>('input[type="radio"]');
  const resetBtn   = filterForm.querySelector<HTMLInputElement>('input[type="reset"]')!;

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const cat = radio.getAttribute('aria-label')!;
      projectList.filter((item: any) => item.values().category === cat);
      setTimeout(fadeInVisibleItems, 100); 
    });
  });

  resetBtn.addEventListener('click', () => {
    filterForm.reset();
    projectList.filter();
    setTimeout(fadeInVisibleItems, 100); 
  });

  const searchInput = document.querySelector<HTMLInputElement>('.search')!;
  searchInput.addEventListener('input', () => {
    const term = searchInput.value;
    if (term) {
      projectList.search(term, ['name']);
    } else {
      projectList.search();
    }
    setTimeout(fadeInVisibleItems, 100); 
  });

  fadeInVisibleItems();
  window.addEventListener('scroll', fadeInVisibleItems);
});
