# Recipe App Flow: Props, Mapping & Find Explained

## Overview

This guide walks through how data flows from a static array through mapping, prop passing, routing, and lookup in a Next.js 16 TypeScript app.

---

## 1. List Page: `recipes/page.tsx`

### Import the Data

```tsx
import { recipes } from "@/data/recipes";
```

- `recipes` is an array of `Recipe` objects exported from `data/recipes.ts`.
- Each `Recipe` has `id`, `slug`, `name`, `description`, `ingredients`, `time`, `steps`, `imageUrl`.

### Map Over the Array

```tsx
<div className="py-10 flex flex-col items-center gap-4">
  {recipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ))}
</div>
```

**What `.map()` does:**

- Takes each item in the array and transforms it into JSX.
- `(recipe) => (...)` is the callback function that runs once per item.
- `recipe` is the current array element (one `Recipe` object).
- Returns a `<RecipeCard />` for each recipe.

**Props being passed:**

- `key={recipe.id}` — React's internal identifier (must be unique, used for efficient re-renders).
- `recipe={recipe}` — Passes the entire `Recipe` object as a prop named `recipe`.

---

## 2. Card Component: `components/RecipeCard.tsx`

### Receiving Props with TypeScript

```tsx
import { Recipe } from "@/data/recipes";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const recipeIngredients = recipe.ingredients.join(", ");
  // ...
};
```

**Breaking it down:**

- `({ recipe }: { recipe: Recipe })` — This is **destructuring with type annotation**.
  - The component receives a props object: `{ recipe: ... }`.
  - We immediately destructure to pull out `recipe`.
  - `: { recipe: Recipe }` tells TypeScript the shape of props.
- Inside the component, `recipe.name`, `recipe.slug`, etc. are all accessible because TypeScript knows the shape.

**What `.join()` does:**

```tsx
const recipeIngredients = recipe.ingredients.join(", ");
```

- `recipe.ingredients` is an array like `["Flour", "Sugar", "Eggs"]`.
- `.join(", ")` connects all elements into one string: `"Flour, Sugar, Eggs"`.

### Navigation Link

```tsx
<Link href={`/recipes/${recipe.slug}`}>
```

- Creates a link to the detail page.
- `recipe.slug` is part of the URL (e.g., `/recipes/lemon-herb-salmon`).
- The `[slug]` folder in `app/recipes/[slug]/page.tsx` catches this dynamic segment.

---

## 3. Detail Page: `app/recipes/[slug]/page.tsx`

### Receiving Dynamic Route Params (Next.js 16)

```tsx
const RecipePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const recipe = recipes.find((recipe) => recipe.slug === slug);
```

**Key concepts:**

1. **`params` is a Promise in Next.js 16:**

   - Must be typed as `Promise<{ slug: string }>`.
   - Must be `await`ed before accessing properties.
   - The `slug` field matches the folder name `[slug]`.

2. **What `.find()` does:**

   - Searches the `recipes` array for the **first** item where the callback returns `true`.
   - `(recipe) => recipe.slug === slug` checks if the current recipe's slug matches the URL slug.
   - Returns the matching `Recipe` object or `undefined` if none match.

3. **Error Handling:**

```tsx
if (!recipe) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Recipe Not Found</h1>
      <Link href={"/recipes"}>
        <Button>Go Back to Recipes</Button>
      </Link>
    </div>
  );
}
```

- If `find()` returns `undefined`, show a 404 message.
- Provides a link back to the list page.

---

## Summary: Data Flow

```
1. data/recipes.ts
   └─> Array of Recipe objects

2. recipes/page.tsx
   └─> .map() transforms array into JSX
   └─> Passes each recipe as props to RecipeCard

3. components/RecipeCard.tsx
   └─> Receives { recipe: Recipe } props via destructuring
   └─> Renders card with recipe data
   └─> Links to /recipes/[slug]

4. recipes/[slug]/page.tsx
   └─> Receives params.slug from URL
   └─> .find() searches array for matching slug
   └─> Renders detail view or 404
```

---

## Key TypeScript Patterns

### Props with Destructuring

```tsx
// Without destructuring
const RecipeCard = (props: { recipe: Recipe }) => {
  return <div>{props.recipe.name}</div>;
};

// With destructuring (cleaner)
const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return <div>{recipe.name}</div>;
};
```

### When to Use Interface vs Type

```tsx
// Both work for props
interface RecipeCardProps {
  recipe: Recipe;
}

type RecipeCardProps = {
  recipe: Recipe;
};

// Usage
const RecipeCard = ({ recipe }: RecipeCardProps) => { ... };
```

---

## Common Array Methods

| Method      | Purpose                       | Returns                    | Example                                                   |
| ----------- | ----------------------------- | -------------------------- | --------------------------------------------------------- |
| `.map()`    | Transform each item           | New array                  | `recipes.map(r => r.name)` → `["Pizza", "Salmon"]`        |
| `.find()`   | Find first match              | Single item or `undefined` | `recipes.find(r => r.id === 2)` → `{ id: 2, ... }`        |
| `.filter()` | Keep items matching condition | New array                  | `recipes.filter(r => r.time < 30)` → `[recipe1, recipe3]` |
| `.join()`   | Combine array into string     | String                     | `["A", "B"].join(", ")` → `"A, B"`                        |

---

## Resources

- [React: Passing Props](https://react.dev/learn/passing-props-to-a-component)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [TypeScript: React Patterns](https://www.typescriptlang.org/docs/handbook/react.html)
- [Next.js: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js 16: Async Params](https://nextjs.org/docs/messages/sync-dynamic-apis)
- [MDN: Array.prototype.map()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.find()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
