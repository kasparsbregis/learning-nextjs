# Product Catalog - Practice Tasks

## Project Overview

Build an e-commerce product catalog where you can view, filter, search, and sort products. This project practices:

- Mapping arrays to components
- Using useState for complex filtering
- Working with numbers (prices, ratings, stock)
- Sorting by multiple criteria
- Conditional rendering and styling
- Calculating totals and statistics

---

## Data Structure

You'll work with a `Product` interface with these fields:

```tsx
interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // in dollars
  category: string;
  rating: number; // 1-5 stars
  reviews: number; // number of reviews
  inStock: boolean;
  tags: string[]; // ["sale", "featured", "new", etc.]
  image: string;
  discount?: number; // percentage discount (0-100)
}
```

You'll create around 12-15 sample products across different categories.

---

## Task 1: Create Sample Data (Warm-up)

**Goal:** Create the data file with sample products.

### Requirements:

1. Create `data/products.ts`
2. Define the `Product` interface (copy from above)
3. Create an array of 12-15 products with:
   - At least 4 different categories (e.g., "Electronics", "Clothing", "Books", "Home")
   - Prices ranging from $10 to $500
   - Ratings from 1 to 5 (use decimals like 4.5, 3.8)
   - Mix of in-stock and out-of-stock items
   - Various tags (at least 3 different tags used across products)
   - Some products with discounts (optional field)

### Hints:

- You can use placeholder images from https://picsum.photos/200/300 or similar
- Be creative with product names and descriptions!
- Make sure some products share categories and tags (for filtering later)
- Include at least 2-3 products that are out of stock

### Example Product:

```typescript
{
  id: 1,
  name: "Wireless Headphones",
  description: "High-quality noise-canceling headphones",
  price: 199.99,
  category: "Electronics",
  rating: 4.5,
  reviews: 1250,
  inStock: true,
  tags: ["featured", "sale"],
  image: "https://picsum.photos/200/300?random=1",
  discount: 15
}
```

### Learning Focus:

- Creating typed data structures
- Working with optional properties
- Planning data for filtering/sorting

---

## Task 2: Basic Product Grid (Easy)

**Goal:** Display all products in a grid layout.

### Requirements:

1. Create `app/products/page.tsx` as a **client component** (`"use client"`)
2. Import and map over the `products` array
3. For each product, display:
   - Image
   - Name
   - Price (formatted with $ sign)
   - Category
   - Rating (show as number or stars)
   - "In Stock" or "Out of Stock" badge
4. Use CSS Grid or Flexbox to show 3-4 products per row

### Hints:

- Use `.map()` to loop through products
- Format price: `$${product.price.toFixed(2)}`
- Use conditional rendering for stock status
- Add Tailwind classes like `grid grid-cols-3 gap-4`

### Learning Focus:

- Basic array mapping
- Number formatting
- Grid layouts
- Conditional rendering

---

## Task 3: ProductCard Component (Easy-Medium)

**Goal:** Extract the product display into a reusable component.

### Requirements:

1. Create `components/ProductCard.tsx`
2. Define props interface that accepts a single `Product`
3. Move product display logic into this component
4. The card should show:
   - Product image
   - Name
   - Price (show original price crossed out if there's a discount)
   - Discounted price (if discount exists)
   - Category badge
   - Star rating (can be number or visual stars)
   - Number of reviews
   - "Out of Stock" overlay if not in stock (grayed out or dimmed)
   - Tags as small badges

### Hints:

- Calculate discounted price: `price - (price * discount / 100)`
- Use Tailwind `line-through` for crossed-out original price
- Show discount percentage: `${discount}% OFF`
- Make out-of-stock cards visually distinct (opacity, grayscale filter)
- Style tags differently (colored badges)

### Learning Focus:

- Creating typed components
- Mathematical calculations
- Conditional styling
- Working with optional properties

### Bonus:

- Add a "Sale" ribbon if discount > 20%
- Show rating as colored stars instead of numbers
- Add hover effects on the card

---

## Task 4: Filter by Category (Medium)

**Goal:** Add dropdown to filter products by category.

### Requirements:

1. Create state: `const [selectedCategory, setSelectedCategory] = useState<string>("all")`
2. Extract all unique categories from products array
3. Create a dropdown/select with "All Categories" + all unique categories
4. Filter products based on selected category
5. Display filtered products
6. Show count: "Showing X products"

### Hints:

- Get unique categories: Use `.map()` to get all categories, then `new Set()` to remove duplicates
- Alternative: `.flatMap()` isn't needed here since categories aren't arrays
- Filter: `products.filter(p => selectedCategory === "all" || p.category === selectedCategory)`
- You can create a separate `CategoryFilter` component if you want

### Learning Focus:

- Extracting unique values
- Dropdown state management
- Filtering with conditions
- Dynamic counts

---

## Task 5: Filter by Price Range (Medium)

**Goal:** Add price range filter.

### Requirements:

1. Add state: `const [priceRange, setPriceRange] = useState<string>("all")`
2. Create a dropdown with price ranges:
   - All Prices
   - Under $50
   - $50 - $100
   - $100 - $200
   - $200 - $500
   - Over $500
3. Filter products based on selected price range
4. Combine with category filter (both filters should work together)

### Hints:

- Chain filters: `products.filter(category condition).filter(price condition)`
- For "Under $50": `product.price < 50`
- For "$50 - $100": `product.price >= 50 && product.price <= 100`
- For "Over $500": `product.price > 500`

### Learning Focus:

- Multiple filters working together
- Chaining `.filter()` calls
- Working with number ranges

---

## Task 6: Filter by Stock Status (Medium)

**Goal:** Add radio buttons to filter by stock availability.

### Requirements:

1. Add state: `const [stockFilter, setStockFilter] = useState<string>("all")`
2. Create radio buttons for:
   - All Products
   - In Stock Only
   - Out of Stock Only
3. Apply this filter along with category and price filters
4. Show how many products match all active filters

### Hints:

- Three filters now: category → price → stock
- For "In Stock": `product.inStock === true`
- For "Out of Stock": `product.inStock === false`
- Update count to reflect all active filters

### Learning Focus:

- Working with multiple filters
- Boolean filtering
- Radio button state

---

## Task 7: Search by Name (Medium)

**Goal:** Add search input to find products by name.

### Requirements:

1. Add state: `const [searchTerm, setSearchTerm] = useState<string>("")`
2. Add a search input field
3. Filter products whose name includes the search term (case-insensitive)
4. Search should work together with all other filters
5. Add a "Clear Search" button that appears when search is active

### Hints:

- Use `.filter()` with `.includes()` and `.toLowerCase()`
- Add search filter to the filter chain (beginning is good)
- Show/hide clear button based on: `searchTerm !== ""`

### Learning Focus:

- String filtering
- Combining search with filters
- Controlled input fields
- Conditional button rendering

---

## Task 8: Sort Products (Medium-Hard)

**Goal:** Add sorting options.

### Requirements:

1. Add state: `const [sortBy, setSortBy] = useState<string>("default")`
2. Create a dropdown with sorting options:
   - Default (original order)
   - Price: Low to High
   - Price: High to Low
   - Rating: High to Low
   - Most Reviewed
   - Name: A-Z
3. Sort the filtered products based on selection
4. Sorting should apply AFTER all filters

### Hints:

- Apply sort AFTER all filters are done
- For prices: `[...array].sort((a, b) => a.price - b.price)`
- For rating: `[...array].sort((a, b) => b.rating - a.rating)`
- For name: `[...array].sort((a, b) => a.name.localeCompare(b.name))`
- Use spread `[...]` to avoid mutating original array
- Use `if/else if` statements to handle different sort options

### Learning Focus:

- Sorting with `.sort()`
- Comparing numbers and strings
- Avoiding array mutation
- Applying operations in correct order (filter → sort)

---

## Task 9: Clear All Filters Button (Easy)

**Goal:** Add a button to reset all filters at once.

### Requirements:

1. Create a function that resets all filter states to default values
2. Create a "Clear All Filters" button
3. Only show the button when at least one filter is active
4. Button should reset: category, price range, stock filter, search term, and sort

### Hints:

- Create a function that calls all `setState` functions
- Condition to show button: `selectedCategory !== "all" || priceRange !== "all" || ...`
- You can use Tailwind's destructive button variant for styling

### Learning Focus:

- Resetting multiple states
- Complex conditional rendering
- User experience considerations

---

## Task 10: Product Detail Page (Hard)

**Goal:** Create a dynamic route to show full details of a single product.

### Requirements:

1. Create `app/products/[id]/page.tsx`
2. Get the product ID from URL params
3. Find the product using `.find()`
4. Display full information:
   - Large product image
   - Name and description
   - Original price and discounted price (if discount)
   - Category
   - Full star rating with number of reviews
   - Stock status (with different message styles)
   - All tags displayed as badges
   - Discount percentage banner (if discount exists)
5. Handle product not found (404 state)
6. Add "Back to Products" link
7. **Bonus:** Add "Add to Cart" button (doesn't need to work, just UI)

### Hints:

- Type params: `params: Promise<{ id: string }>`
- Don't forget to `await params`
- Convert to number: `Number((await params).id)`
- Use `.find()`: `products.find(p => p.id === id)`
- Check if product exists before rendering
- Calculate savings: `price * (discount / 100)`

### Learning Focus:

- Dynamic routes
- Using `.find()` for lookup
- Async params in Next.js 16
- Error handling (not found)
- Detailed page layouts

---

## Task 11: Link Cards to Detail Page (Medium)

**Goal:** Make product cards clickable.

### Requirements:

1. Wrap each `ProductCard` in Next.js `<Link>`
2. Link to `/products/[id]`
3. Add hover effects (shadow, scale, border)
4. Ensure accessibility (proper href)
5. Add a subtle transition effect

### Hints:

- Use template literal: `href={`/products/${product.id}`}`
- Add Tailwind: `hover:shadow-xl hover:scale-105 transition-transform`
- Use `cursor-pointer`

### Learning Focus:

- Next.js Link component
- Hover states and transitions
- User experience polish

---

## Task 12: Calculate Statistics (Medium-Hard)

**Goal:** Show statistics about filtered products.

### Requirements:

1. Calculate and display at the top of the page:
   - Total number of products shown
   - Average price of filtered products
   - Average rating of filtered products
   - Number of products on sale (have discount)
   - Total value of all filtered products

### Hints:

- Use `.reduce()` to calculate totals
- Average = sum / length
- Format averages to 2 decimal places: `.toFixed(2)`
- Count with discount: `.filter(p => p.discount).length`
- Total value: `.reduce((sum, p) => sum + p.price, 0)`

### Learning Focus:

- Using `.reduce()` for calculations
- Derived state from filtered data
- Number formatting
- Statistical operations

---

## Bonus Challenges (Optional)

### Challenge 1: Filter by Tags

- Extract all unique tags from products (use `.flatMap()` + `Set`)
- Create tag buttons/badges
- Filter products that have the selected tag
- Allow selecting multiple tags (array state)
- Show products that have ANY of the selected tags

### Challenge 2: Rating Filter

- Add a rating filter (e.g., "4 stars and above", "3 stars and above")
- Use radio buttons or dropdown
- Combine with other filters

### Challenge 3: Multi-Select Categories

- Instead of dropdown, use checkboxes
- Allow selecting multiple categories at once
- Show products from ANY selected category
- State becomes array: `useState<string[]>([])`

### Challenge 4: Price Range Slider

- Instead of preset ranges, use an input range slider
- Use `<input type="range">` with min/max values
- Display current range values
- Filter products within the selected range

### Challenge 5: Advanced Statistics Dashboard

- Create a separate section showing:
  - Most expensive product
  - Cheapest product
  - Best rated product
  - Most reviewed product
  - Category with most products
- Use `.reduce()`, `.sort()`, and array methods

### Challenge 6: "On Sale" Toggle

- Add a toggle switch for "Show Only Sale Items"
- Filter products where `discount` exists and is > 0
- Can be combined with other filters

### Challenge 7: Grid/List View Toggle

- Add buttons to switch between grid view and list view
- Grid: 3-4 columns (current layout)
- List: 1 column with horizontal layout (image on left, details on right)
- Use state to track view mode

### Challenge 8: Items Per Page

- Add a dropdown to select items per page (12, 24, 48)
- Show only that many products
- Add "Load More" button or pagination
- This is prep for learning pagination!

---

## Example Component Structure

```
app/
  products/
    page.tsx              ← Main catalog page (client component)
    [id]/
      page.tsx            ← Product detail page (server component)

components/
  ProductCard.tsx         ← Reusable product card
  CategoryFilter.tsx      ← Optional: extract category filter
  PriceFilter.tsx         ← Optional: extract price filter
  SearchBar.tsx           ← Optional: extract search
  SortDropdown.tsx        ← Optional: extract sorting
  ProductStats.tsx        ← Optional: statistics display

data/
  products.ts             ← Product data and interface
```

---

## Tips for Success

1. **Start with data:** Create good sample data first (Task 1)
2. **Build incrementally:** Get each task working before moving to next
3. **Console.log frequently:** Check your filtered data at each step
4. **Test edge cases:** What happens with no products? All filters active?
5. **Style as you go:** Don't wait until the end to style
6. **Reuse patterns:** Many patterns from student tracker apply here!
7. **Break down tasks:** If stuck, break task into smaller steps

---

## Comparison with Student Tracker

This project is similar but introduces:

- ✅ Optional properties (`discount?`)
- ✅ Price calculations and formatting
- ✅ Working with decimal numbers (ratings, prices)
- ✅ More complex filtering (price ranges)
- ✅ Tags (similar to subjects, but used differently)
- ✅ Statistics calculations (totals, averages)
- ✅ Discounts and sale logic

---

## Learning Outcomes

By completing this project, you'll master:

✅ **Array Methods:** `.map()`, `.filter()`, `.find()`, `.reduce()`, `.sort()`, `.flatMap()`, `Set`  
✅ **State Management:** Multiple `useState` hooks working together  
✅ **Filtering:** Complex multi-criteria filtering  
✅ **Sorting:** Multiple sort options  
✅ **Calculations:** Averages, totals, statistics  
✅ **Number Formatting:** Prices, percentages, decimals  
✅ **Conditional Rendering:** Based on multiple conditions  
✅ **Optional Properties:** TypeScript optional fields  
✅ **Component Composition:** Breaking down complex UIs  
✅ **User Experience:** Search, filters, clear buttons, hover states

---

## Estimated Time

- **Core Tasks (1-12):** 4-6 hours
- **Bonus Challenges:** 2-4 hours additional
- **Total:** 6-10 hours depending on experience

---

## Getting Started

1. Create the data file first (Task 1) - spend time on good sample data!
2. Build the basic grid (Task 2)
3. Create the ProductCard component (Task 3)
4. Add filters one by one (Tasks 4-7)
5. Implement sorting (Task 8)
6. Add polish (Tasks 9-11)
7. Add statistics (Task 12)
8. Try bonus challenges if you want more practice!

---

## Challenge Yourself

Try to complete this project **without looking back at your student tracker code** as much as possible. This will help you truly learn the patterns rather than just copying.

However, if you get stuck:

1. Try to solve it yourself first (10-15 minutes)
2. Check your student tracker for similar patterns
3. Review the `javascript-array-methods.md` guide
4. Ask for hints (not full solutions)

---

## When You're Done

You'll have:

- ✅ A fully functional product catalog
- ✅ Mastery of array methods
- ✅ Deep understanding of useState
- ✅ Experience with complex filtering logic
- ✅ A portfolio piece to show employers!

**Ready? Start with Task 1 and build something awesome!** 🚀

Good luck! 🛍️
