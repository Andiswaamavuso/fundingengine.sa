
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.getElementById("navLinks");

    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });


    (function () {
  const section = document.querySelector("#funding-stats");
  if (!section) return;

  const counter = section.querySelector("#fe-counter");
  const needle = section.querySelector("#fe-needle");

  const target = 24;
  const duration = 2200;
  const startTime = performance.now();

  function animateCounter(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    counter.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(animateCounter);
})();


