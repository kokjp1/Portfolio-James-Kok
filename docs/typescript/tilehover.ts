console.clear();

const tilesContainer = document.querySelector(".tiles") as HTMLElement | null;
const tilesContainerInner = document.querySelector(".tiles__inner") as HTMLElement | null;
const tiles = Array.from(document.querySelectorAll<HTMLElement>(".tile"));
const overlay = document.querySelector(".overlay") as HTMLElement | null;

if (!tilesContainer || !tilesContainerInner || !overlay) {
  console.error("Required elements not found in the DOM.");
} else {
  const applyOverlayMask = (e: PointerEvent): void => {
    const overlayEl = overlay;

    const rect = tilesContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - 80;
    const y = e.clientY - rect.top - 60;
    

    overlayEl.style.setProperty("--opacity", "1");
    overlayEl.style.setProperty("--x", `${x}px`);
    overlayEl.style.setProperty("--y", `${y}px`);
  };

  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      const tileIndex = tiles.indexOf(target);
      const borderBoxSize = Array.isArray(entry.borderBoxSize)
        ? entry.borderBoxSize[0]
        : entry.borderBoxSize;

      const width = borderBoxSize?.inlineSize;
      const height = borderBoxSize?.blockSize;

      if (tileIndex >= 0 && overlay.children[tileIndex]) {
        const overlayTile = overlay.children[tileIndex] as HTMLElement;
        overlayTile.style.width = `${width}px`;
        overlayTile.style.height = `${height}px`;
      }
    });
  });

  const initOverlayTile = (tileEl: HTMLElement): void => {
    const overlayTile = document.createElement("div");
    overlayTile.classList.add(
      "tile",
      "w-40",
      "h-40",
      "rounded-xl",
      "bg-primary/15",
      "border-3",
      "border-primary/75",
      "shadow-inner"
    );
    overlay.append(overlayTile);
    observer.observe(tileEl);
  };

  tiles.forEach(initOverlayTile);
  document.body.addEventListener("pointermove", applyOverlayMask);
}
