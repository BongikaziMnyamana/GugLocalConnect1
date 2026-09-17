/* =========================================
   GugsLocalConnect – Browse page filtering
   Reads window.gugsData.businesses (see data.js)
   and renders it into the #browseGrid grid based
   on the current state of the filter sidebar.
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("browseGrid");
  const resultsCount = document.getElementById("resultsCount");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const categoryInputs = document.querySelectorAll(".filter-category");
  const locationFilter = document.getElementById("locationFilter");
  const ratingInputs = document.querySelectorAll(".filter-rating");
  const sortSelect = document.getElementById("sortSelect");

  const allBusinesses = (window.gugsData && window.gugsData.businesses) || [];

  function cardHTML(biz) {
    return `
      <article class="business-card">
        <div class="business-image">
          <img src="${biz.image}" alt="${biz.name}">
        </div>
        <div class="business-body">
          <span class="tag">${biz.category}</span>
          <h3>${biz.name}</h3>
          <p class="location">${biz.location}</p>
          <div class="business-foot">
            <span class="rating">★ ${biz.rating} <em>(${biz.reviews})</em></span>
            <div class="browse-actions">
              <a href="business.html" class="btn-small">View profile</a>
              <a href="chat.html" class="btn-outline">Message</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function getSelectedCategories() {
    return Array.from(categoryInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  function getMinRating() {
    const checked = Array.from(ratingInputs).find((input) => input.checked);
    return checked ? parseFloat(checked.value) : 0;
  }

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCategories = getSelectedCategories();
    const location = locationFilter.value;
    const minRating = getMinRating();

    let results = allBusinesses.filter((biz) => {
      const matchesQuery =
        !query ||
        biz.name.toLowerCase().includes(query) ||
        biz.category.toLowerCase().includes(query) ||
        biz.description.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(biz.category);

      const matchesLocation = !location || biz.area === location;

      const matchesRating = biz.rating >= minRating;

      return matchesQuery && matchesCategory && matchesLocation && matchesRating;
    });

    if (sortSelect.value === "rating") {
      results = results.slice().sort((a, b) => b.rating - a.rating);
    }

    render(results);
  }

  function render(list) {
    resultsCount.textContent = list.length;
    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<p class="browse-empty">No businesses match those filters yet — try widening your search.</p>`;
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
  });
  searchInput.addEventListener("input", applyFilters);
  categoryInputs.forEach((input) => input.addEventListener("change", applyFilters));
  locationFilter.addEventListener("change", applyFilters);
  ratingInputs.forEach((input) => input.addEventListener("change", applyFilters));
  sortSelect.addEventListener("change", applyFilters);

  // Initial render: no filters applied, shows every business.
  applyFilters();
});