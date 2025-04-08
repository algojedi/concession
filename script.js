const MENU_JSON = 'menu.json';

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only trigger once
        }
      });
    },
    { threshold: 0.1 },
  );

  if (menu) {
    observer.observe(menu);
  }
});
