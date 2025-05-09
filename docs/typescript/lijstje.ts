// lijstje.ts
declare const List: any;

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
    });
  });

  resetBtn.addEventListener('click', () => {
    // clear the checked state *and* the List.js filter
    filterForm.reset();
    projectList.filter();
  });

  const searchInput = document.querySelector<HTMLInputElement>('.search')!;

  searchInput.addEventListener('input', () => {
    const term = searchInput.value;
    if (term) {
      // only search in the "name" field
      projectList.search(term, ['name']);
    } else {
      // clear search (keeps any active category filter)
      projectList.search();
    }
  });
  });
