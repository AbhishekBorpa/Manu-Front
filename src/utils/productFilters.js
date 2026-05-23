const norm = (value) => (value || "").toLowerCase().trim();

/**
 * Match products for marketplace filters.
 * - subcategory: from "Choose Your Manufacturing" (Category.name)
 * - category: main category from navbar / browse sections
 */
export const productMatchesFilter = (product, { category, subcategory } = {}) => {
  if (subcategory) {
    const q = norm(subcategory);
    return (
      norm(product.subcategory) === q ||
      norm(product.category) === q
    );
  }

  if (category) {
    const q = norm(category);
    return (
      norm(product.category) === q ||
      norm(product.subcategory) === q
    );
  }

  return true;
};

export const filterProducts = (products, filters) =>
  (products || []).filter((p) => productMatchesFilter(p, filters));
