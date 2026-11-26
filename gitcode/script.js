document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const rows = document.querySelectorAll(".project-row");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    rows.forEach((row) => {
      row.style.opacity = "0";
      row.style.transform = "translateY(8px)";
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity 360ms ease, transform 360ms ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    rows.forEach((row) => observer.observe(row));
  }
});
