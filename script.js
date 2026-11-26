"use strict";

document.documentElement.classList.add("js");

(() => {
  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!reducedMotion.matches && window.matchMedia("(hover: hover)").matches) {
    const glassSurfaces = document.querySelectorAll(".liquid-glass, .liquid-glass-pill");

    glassSurfaces.forEach((surface) => {
      surface.addEventListener("pointermove", (event) => {
        const rect = surface.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        surface.style.setProperty("--glass-x", `${x.toFixed(1)}%`);
        surface.style.setProperty("--glass-y", `${y.toFixed(1)}%`);
      });

      surface.addEventListener("pointerleave", () => {
        surface.style.removeProperty("--glass-x");
        surface.style.removeProperty("--glass-y");
      });
    });
  }

  const dock = document.querySelector(".glass-dock");
  const directoryAnchor = document.querySelector(".link-list .index-link:nth-of-type(4)");

  if (dock && directoryAnchor) {
    let ticking = false;
    let isVisible = false;

    const updateDock = () => {
      ticking = false;
      const anchorTop = directoryAnchor.getBoundingClientRect().top;
      const shouldShow = window.scrollY > 100 && anchorTop <= window.innerHeight * 0.72;

      if (shouldShow === isVisible) return;
      isVisible = shouldShow;
      dock.classList.toggle("is-visible", shouldShow);
      dock.setAttribute("aria-hidden", String(!shouldShow));
    };

    const requestDockUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateDock);
    };

    window.addEventListener("scroll", requestDockUpdate, { passive: true });
    window.addEventListener("resize", requestDockUpdate, { passive: true });
    updateDock();
  }
})();
