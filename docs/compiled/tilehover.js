"use strict";
console.clear();
const tilesContainer = document.querySelector(".tiles");
const tilesContainerInner = document.querySelector(".tiles__inner");
const tiles = Array.from(document.querySelectorAll(".tile"));
const overlay = document.querySelector(".overlay");
if (!tilesContainer || !tilesContainerInner || !overlay) {
    console.error("Required elements not found in the DOM.");
}
else {
    const applyOverlayMask = (e) => {
        const overlayEl = overlay;
        const rect = tilesContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - 80;
        const y = e.clientY - rect.top - 60;
        overlayEl.style.setProperty("--opacity", "1");
        overlayEl.style.setProperty("--x", `${x}px`);
        overlayEl.style.setProperty("--y", `${y}px`);
    };
    const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            const tileIndex = tiles.indexOf(target);
            const borderBoxSize = Array.isArray(entry.borderBoxSize)
                ? entry.borderBoxSize[0]
                : entry.borderBoxSize;
            const width = borderBoxSize === null || borderBoxSize === void 0 ? void 0 : borderBoxSize.inlineSize;
            const height = borderBoxSize === null || borderBoxSize === void 0 ? void 0 : borderBoxSize.blockSize;
            if (tileIndex >= 0 && overlay.children[tileIndex]) {
                const overlayTile = overlay.children[tileIndex];
                overlayTile.style.width = `${width}px`;
                overlayTile.style.height = `${height}px`;
            }
        });
    });
    const initOverlayTile = (tileEl) => {
        const overlayTile = document.createElement("div");
        overlayTile.classList.add("tile", "w-40", "h-40", "rounded-xl", "bg-primary/15", "border-3", "border-primary/75", "shadow-inner");
        overlay.append(overlayTile);
        observer.observe(tileEl);
    };
    tiles.forEach(initOverlayTile);
    document.body.addEventListener("pointermove", applyOverlayMask);
}
