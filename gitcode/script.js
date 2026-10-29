document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();


  const cards = document.querySelectorAll(".project-card");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((card) => {
      card.classList.add("reveal-ready");
      card.style.opacity = "0";
      card.style.transform = "translateY(12px)";
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity 550ms ease, transform 550ms ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    cards.forEach((card) => observer.observe(card));
  }
});
