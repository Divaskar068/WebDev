// script.js – GameForge Catalogue Starter (1-week version)
// Students: implement the missing logic

// State
let items = [];
let cartCount = 0;
const cartItemIds = new Set();

// DOM elements
const catalogue = document.getElementById('catalogue');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-filter');
const themeToggle = document.getElementById('theme-toggle');
const cartDisplay = document.getElementById('cart-count');
const resetBtn = document.getElementById('reset-cart');
const statusMsg = document.getElementById('status-message');
const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280"><rect width="100%25" height="100%25" fill="%231f2937"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23d1d5db" font-family="Arial" font-size="24">No Image</text></svg>';

// JSON loader (provided)
function loadJSON(path, callback, errorCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    } else {
      errorCallback(xhr);
    }
  };
  xhr.onerror = errorCallback;
  xhr.send();
}

// TODO: Render all or filtered items as cards
function renderItems(filteredItems) {
  catalogue.innerHTML = '';

  filteredItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.itemName = (item.name || '').toLowerCase();

    const image = document.createElement('img');
    image.src = item.thumbnail || FALLBACK_IMAGE;
    image.alt = item.name ? `${item.name} thumbnail` : 'Artifact thumbnail';
    image.onerror = () => {
      image.src = FALLBACK_IMAGE;
    };

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.textContent = item.name || 'Unnamed Artifact';

    const creator = document.createElement('p');
    creator.className = 'meta';
    creator.textContent = `Creator: ${item.creator || 'Unknown'}`;

    const category = document.createElement('p');
    category.className = 'meta';
    category.textContent = `Category: ${getCategory(item)}`;

    const rating = document.createElement('p');
    rating.className = 'meta';
    rating.textContent = `Rating: ${typeof item.rating === 'number' ? item.rating.toFixed(1) : 'N/A'}`;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `USD $${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}`;

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-cart-btn';
    addBtn.textContent = cartItemIds.has(item.id) ? 'Added' : 'Add to Cart';
    addBtn.disabled = cartItemIds.has(item.id);
    addBtn.addEventListener('click', () => {
      addToCart(item.id);
    });

    content.append(title, creator, category, rating, price, addBtn);
    card.append(image, content);
    catalogue.appendChild(card);
  });
}

// TODO: Populate category dropdown + fake option
function populateCategories() {
  const unique = new Set(items.map(getCategory));
  const categories = ['all', ...Array.from(unique).filter((cat) => cat !== 'all').sort(), 'Quantum Mods'];

  categorySelect.innerHTML = '';
  categories.forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat === 'all' ? 'All Categories' : cat;
    categorySelect.appendChild(option);
  });
}

// TODO: Apply category filter + search highlight
function updateDisplay() {
  const selectedCategory = categorySelect.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  const categoryFiltered = selectedCategory === 'all'
    ? items
    : items.filter((item) => getCategory(item) === selectedCategory);

  // Search should only highlight visible cards and must not hide filtered cards.
  renderItems(categoryFiltered);

  const cards = catalogue.querySelectorAll('.card');
  let highlightCount = 0;

  cards.forEach((card) => {
    const shouldHighlight = Boolean(searchTerm) && card.dataset.itemName.includes(searchTerm);
    card.classList.toggle('highlight', shouldHighlight);
    if (shouldHighlight) {
      highlightCount += 1;
    }
  });

  if (!cards.length) {
    catalogue.innerHTML = '';
    statusMsg.textContent = 'No artifacts in this category.';
    statusMsg.style.display = 'block';
    return;
  }

  if (searchTerm && highlightCount === 0) {
    statusMsg.textContent = 'No matches found.';
    statusMsg.style.display = 'block';
    return;
  }

  statusMsg.style.display = 'none';
}

// TODO: Add one item to cart (simple count of unique items)
function addToCart(itemId) {
  const item = items.find((entry) => entry.id === itemId);

  if (!item) {
    statusMsg.textContent = 'Unable to add item: invalid artifact selection.';
    statusMsg.style.display = 'block';
    return;
  }

  cartCount += 1;
  cartItemIds.add(itemId);
  cartDisplay.textContent = `Cart: ${cartCount} item${cartCount === 1 ? '' : 's'}`;
  statusMsg.textContent = `Added 1 × ${item.name || 'artifact'} to cart.`;
  statusMsg.style.display = 'block';
  updateDisplay();
}

function getCategory(item) {
  const category = typeof item.category === 'string' ? item.category.trim() : '';
  return category || 'Uncategorized';
}

// Event listeners (students need to connect logic)
searchInput.addEventListener('input', updateDisplay);
categorySelect.addEventListener('change', updateDisplay);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark')
    ? 'Light Mode'
    : 'Dark Mode';
});

resetBtn.addEventListener('click', () => {
  if (cartCount > 0 && confirm('Are you sure you want to reset the cart?')) {
    cartCount = 0;
    cartItemIds.clear();
    cartDisplay.textContent = 'Cart: 0 items';
    statusMsg.textContent = 'Cart has been reset.';
    statusMsg.style.display = 'block';
    updateDisplay();
  }
});

// Start
window.addEventListener('load', () => {
  loadJSON('artifacts.json',
    (data) => {
      items = data;
      populateCategories();
      updateDisplay();
      console.log(`Loaded ${items.length} items`);
    },
    (err) => {
      console.error('Failed to load artifacts.json', err);
      statusMsg.textContent = 'Error loading catalogue';
      statusMsg.style.display = 'block';
    }
  );
});
