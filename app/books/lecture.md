# React Map, Props, and TypeScript Guide

## Understanding `.map()` Syntax

### Common `.map()` Patterns

#### 1. Implicit Return with Parentheses (Most Common)

```javascript
// ✅ Returns JSX directly
books.map((book) => <BookCard key={book.slug} book={book} />);
```

**When to use:** Rendering JSX components or single expressions.

#### 2. Explicit Return with Curly Braces

```javascript
// ✅ Explicit return statement
books.map((book) => {
  return <BookCard key={book.slug} book={book} />;
});
```

**When to use:** When you need multi-line logic or conditionals.

#### 3. With TypeScript Type Annotation

```typescript
// ✅ Type annotation for the parameter
books.map((book: Book) => <BookCard key={book.slug} book={book} />);
```

**When to use:** When TypeScript can't infer the type automatically.

### Common Mistakes

#### ❌ WRONG: Invalid TypeScript Syntax

```typescript
books.map((book: (book:any)) => (
  <BookCard key={book.slug} />
))
```

**Problem:** `(book: (book:any))` is not valid syntax.

#### ✅ CORRECT: Let TypeScript Infer

```typescript
books.map((book) => <BookCard key={book.slug} book={book} />);
```

#### ✅ CORRECT: Explicit Type (if needed)

```typescript
books.map((book: Book) => <BookCard key={book.slug} book={book} />);
```

---

## Difference: `.map()` vs `.forEach()`

| Method       | Returns       | Use Case                     |
| ------------ | ------------- | ---------------------------- |
| `.map()`     | **New Array** | Transform data into JSX      |
| `.forEach()` | `undefined`   | Side effects (logging, etc.) |

```javascript
// ✅ .map() - Creates a new array of JSX elements
const bookComponents = books.map((book) => (
  <BookCard key={book.slug} book={book} />
));

// ❌ .forEach() - Doesn't return anything
books.forEach((book) => {
  console.log(book.title); // Just side effects
});
```

---

## Props in React Components

### What are Props?

Props (short for "properties") are how you pass data from parent to child components.

### Step 1: Define the Props Type

You have 3 options:

#### Option 1: Inline Type Definition

```typescript
function BookCard({ book }: { book: Book }) {
  return <div>{book.title}</div>;
}
```

**Use when:** Simple, one-off component.

#### Option 2: Interface (Most Common)

```typescript
interface BookCardProps {
  book: Book;
  onClick?: () => void; // Optional prop
}

function BookCard({ book, onClick }: BookCardProps) {
  return <div>{book.title}</div>;
}
```

**Use when:** Component is reused or props are complex.

#### Option 3: Type Alias

```typescript
type BookCardProps = {
  book: Book;
  onClick?: () => void;
};

function BookCard({ book, onClick }: BookCardProps) {
  return <div>{book.title}</div>;
}
```

**Use when:** Similar to interface, personal preference.

### Step 2: Access Props in Component

```typescript
const BookCard = ({ book }: BookCardProps) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
    </div>
  );
};
```

---

## Complete Example: The Books App

### Component Definition (BookCard.tsx)

```typescript
// Define the props interface
interface BookCardProps {
  book: {
    slug: string;
    title: string;
    author: string;
    description: string;
  };
}

// Use props with destructuring
const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card>
      <CardTitle>{book.title}</CardTitle>
      <p>{book.author}</p>
    </Card>
  );
};
```

### Parent Component (page.tsx)

```typescript
const BooksPage = () => {
  return (
    <div>
      {books.map((book) => (
        <BookCard key={book.slug} book={book} />
      ))}
    </div>
  );
};
```

**Key Points:**

1. `books.map()` iterates over the array
2. Each `book` is passed as a **prop** to `<BookCard>`
3. `key={book.slug}` helps React track list items
4. `book={book}` passes the data down

---

## TypeScript: `any` vs Proper Types

### Avoid `any` When Possible

#### ❌ BAD: Using `any` everywhere

```typescript
books.map((book: any) => <BookCard key={book.id} book={book} />);
```

**Problems:**

- No autocomplete
- No type checking
- Lose all TypeScript benefits

#### ✅ GOOD: Proper Types

```typescript
// Define the type once
interface Book {
  slug: string;
  title: string;
  author: string;
  description: string;
}

// Use it everywhere
const books: Book[] = [...];

books.map((book: Book) => (
  <BookCard key={book.slug} book={book} />
))
```

#### ✅ BEST: Let TypeScript Infer (usually)

```typescript
// TypeScript knows books is Book[]
books.map(
  (
    book // Type inferred automatically!
  ) => <BookCard key={book.slug} book={book} />
);
```

---

## Real-World Example Flow

```
1. DATA SOURCE (books.ts)
   ↓
   export const books = [
     { slug: "the-hobbit", title: "The Hobbit", ... },
     { slug: "1984", title: "1984", ... }
   ]

2. PARENT COMPONENT (page.tsx)
   ↓
   {books.map((book) => (        ← Gets each book
     <BookCard book={book} />     ← Passes book as prop
   ))}

3. CHILD COMPONENT (BookCard.tsx)
   ↓
   const BookCard = ({ book }) => {     ← Receives book as prop
     return <div>{book.title}</div>     ← Uses book data
   }
```

---

## Common Pitfalls

### ❌ Forgetting to Pass Props

```typescript
// Parent
<BookCard key={book.slug} />; // Missing book={book}!

// Child tries to use it
{
  book.title;
} // ERROR: book is undefined
```

### ✅ Correctly Passing Props

```typescript
// Parent
<BookCard key={book.slug} book={book} />;

// Child
{
  book.title;
} // ✅ Works!
```

---

## Quick Reference

### `.map()` Syntax Options

| Use Case        | Syntax                                        |
| --------------- | --------------------------------------------- |
| JSX element     | `array.map(item => (<Component />))`          |
| Multi-line      | `array.map(item => { return <Component /> })` |
| With types      | `array.map((item: Type) => (<Component />))`  |
| Multiple params | `array.map((item, index) => (<Component />))` |

### Prop Patterns

| Pattern          | Code                                     |
| ---------------- | ---------------------------------------- |
| Define interface | `interface Props { data: string }`       |
| Use props        | `({ data }: Props) => <div>{data}</div>` |
| Pass props       | `<Component data={value} />`             |
| Optional prop    | `onClick?: () => void`                   |

---

## Summary

1. **`.map()`** = Transform array into JSX
2. **Props** = Passing data from parent to child
3. **TypeScript** = Type your props with interfaces
4. **Avoid `any`** = Let TypeScript infer or use proper types
5. **Destructure props** = `const Component = ({ prop1, prop2 }) => {}`

Remember: In React, data flows **DOWN** through props, never up!
