const MENU_JSON = 'menu.json';

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

  document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // only trigger once
          }
        });
      },
      { threshold: 0.1 }
    );

    if (menu) {
      observer.observe(menu);
    }
  });






function fetchMenu() {
  fetch(MENU_JSON)
    .then((response) => response.json())
    .then(populateMenu)
    .catch((error) => console.error('Error loading menu:', error));
}

function populateMenu(menuData) {
  const menuContent = document.querySelector('.menu-content');
  menuContent.innerHTML = ''; // Clear previous content

  Object.keys(menuData).forEach((mealType) => {
    const meal = menuData[mealType];

    // Create subheading div for each meal type
    const subheading = document.createElement('div');
    subheading.classList.add('menu-content_subheading');
    subheading.textContent = `${
      mealType.charAt(0).toUpperCase() + mealType.slice(1)
    } (${meal.hours})`;

    // Create items container
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('menu-content_items');

    // Add menu items
    Object.entries(meal.items).forEach(([item, price]) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('menu-item');
      itemDiv.innerHTML = `<span class="menu-item_name">${item}</span> - <span class="menu-item_price">$${price}</span>`;
      itemsContainer.appendChild(itemDiv);
    });

    // Append subheading and items to the menu section
    menuContent.appendChild(subheading);
    menuContent.appendChild(itemsContainer);
  });
}
	