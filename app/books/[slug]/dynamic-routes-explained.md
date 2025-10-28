# Dynamic Routes in Next.js - Step by Step

## Understanding the Flow

When a user clicks "Learn More" on a book card, here's what happens:

```
User clicks → navigates to /books/the-hobbit
            ↓
Next.js catches [slug] route
            ↓
Passes "the-hobbit" as params.slug
            ↓
Your component finds matching book
            ↓
Displays book details
```

---

## Step-by-Step Explanation

### 1. **URL Structure**

```
/books/the-hobbit
    ↑        ↑
 route     slug (dynamic value)
```

The `[slug]` folder name makes it dynamic!

### 2. **Type the Params Correctly**

```typescript
// ❌ WRONG
const Page = ({ params }: { params: slug }) => {};

// ✅ CORRECT (Next.js 15+)
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {};

// OR simpler (TypeScript infers it's a Promise)
const Page = async ({ params }: { params: { slug: string } }) => {};
```

**Why:** In Next.js 15+, `params` is a Promise that needs to be awaited!

### 3. **Extract the Slug** (Next.js 15+)

```typescript
const { slug } = await params; // In Next.js 15+, params is a Promise!
```

Now `slug` contains the URL parameter (e.g., "the-hobbit")

### 4. **Find the Matching Book**

```typescript
const book = books.find((book) => book.slug === slug);
```

**How `.find()` works:**

- Returns **first match** or `undefined`
- Perfect for finding ONE thing by a unique value

### 5. **Handle Not Found**

```typescript
if (!book) {
  return <div>Book Not Found</div>;
}
```

Always handle the case where slug doesn't match any book!

### 6. **Display the Data**

```typescript
return (
  <div>
    <h1>{book.title}</h1>
    <p>{book.author}</p>
    <p>{book.description}</p>
  </div>
);
```

---

## Complete Example

```typescript
import { books } from "@/data/books";

const SingleBookPage = async ({ params }: { params: { slug: string } }) => {
  // Step 1: Extract slug from params (await in Next.js 15+)
  const { slug } = await params;

  // Step 2: Find matching book
  const book = books.find((book) => book.slug === slug);

  // Step 3: Handle not found
  if (!book) {
    return <div>Book not found</div>;
  }

  // Step 4: Display data
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};
```

---

## Key Differences: `.map()` vs `.find()`

| Method    | Returns                        | Use Case                     |
| --------- | ------------------------------ | ---------------------------- |
| `.map()`  | **New Array** (all)            | Transform all items into JSX |
| `.find()` | **Single Item** or `undefined` | Find one specific item       |

### When to Use Each:

```typescript
// Use .map() - Showing ALL books
books.map((book) => <BookCard book={book} />);

// Use .find() - Showing ONE specific book
books.find((book) => book.slug === slug);
```

---

## Linking to Dynamic Routes

### From BookCard Component:

```typescript
import Link from "next/link";

<Link href={`/books/${book.slug}`}>
  <Button>Learn More</Button>
</Link>;
```

**Template literals** `\`/books/${book.slug}\`` create dynamic URLs!

---

## Common Mistakes

### ❌ Wrong Params Type

```typescript
({ params }: { params: slug })  // slug is not a type!
```

### ❌ Missing `async` and `await` (Next.js 15+)

```typescript
const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params; // Error: params is a Promise!
};
```

### ✅ Correct Params Type (Next.js 15+)

```typescript
const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params; // ✅ Correct!
};
```

### ❌ Not Handling Undefined

```typescript
const book = books.find(...);
return <h1>{book.title}</h1>;  // Error if book is undefined!
```

### ✅ Always Check

```typescript
const book = books.find(...);
if (!book) return <div>Not found</div>;
return <h1>{book.title}</h1>;  // ✅ Safe!
```

### ❌ Missing `await` on params (Next.js 15+)

```typescript
const { slug } = params; // Error: params is a Promise!
```

### ✅ Must await params (Next.js 15+)

```typescript
const { slug } = await params; // ✅ Correct!
```

---

## Summary

1. **Dynamic Route:** Use `[slug]` folder name
2. **Params Type:** `{ params: { slug: string } }` (note: in Next.js 15+, params is a Promise!)
3. **Extract:** `const { slug } = await params;` ⚠️ **Use await!**
4. **Find:** `books.find((book) => book.slug === slug)`
5. **Handle:** Check if book exists
6. **Display:** Show the book data
7. **Link:** Use `href={\`/books/${book.slug}\`}`

**Important:** In Next.js 15+, `params` is now a Promise and must be awaited!

Remember: Dynamic routes let you create pages based on URL parameters!
