function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    document.getElementById('page-' + pageNumber).style.display = 'block';

    // Update active pagination link (optional)
    document.querySelectorAll('.pagination .page-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.pagination .page-link[data-page="${pageNumber}"]`).classList.add('active');
}

// Initialize to show the first page
document.addEventListener("DOMContentLoaded", () => showPage(1));

// Global filters to keep track of the selected brand and category
let selectedBrand = '';
let selectedCategory = '';

// Filter by brand
function filterByBrand(brand) {
    selectedBrand = brand;
    document.getElementById('brandDropdown').innerText = brand;
    applyFilters();
}

// Filter by category
function filterByCategory(category) {
    selectedCategory = category;
    document.getElementById('categoryDropdown').innerText = category;
    applyFilters();
}

// Apply combined brand and category filters
function applyFilters() {
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        // Get the brand and category of each item
        const itemBrand = item.getAttribute('data-brand');
        const itemCategory = item.getAttribute('data-category');
        
        // Check if item matches selected brand and category
        const matchesBrand = selectedBrand ? itemBrand === selectedBrand : true;
        const matchesCategory = selectedCategory ? itemCategory === selectedCategory : true;

        // Display item if it matches both filters, otherwise hide it
        item.style.display = (matchesBrand && matchesCategory) ? 'block' : 'none';
    });
}

// Sorting function for the items
function sortBy(criteria) {
    const container = document.querySelector('.category-grid .row');
    const items = Array.from(container.children);

    items.sort((a, b) => {
        const nameA = a.getAttribute('data-name');
        const nameB = b.getAttribute('data-name');
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (criteria === 'priceLowHigh') return priceA - priceB;
        if (criteria === 'priceHighLow') return priceB - priceA;
        if (criteria === 'nameAZ') return nameA.localeCompare(nameB);
        if (criteria === 'nameZA') return nameB.localeCompare(nameA);
    });

    // Append sorted items back to the container
    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}

// Reset filter and sort options
function resetFilterSort() {
    selectedBrand = '';
    selectedCategory = '';
    document.getElementById('brandDropdown').innerText = 'Brand';
    document.getElementById('categoryDropdown').innerText = 'Category';
    document.getElementById('sortByDropdown').innerText = 'Sort By';

    const items = document.querySelectorAll('.category-item');
    items.forEach(item => item.style.display = 'block'); // Show all items
}
