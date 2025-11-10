# Understanding useState in React

## What is State?

**State** is data that can change over time in your component. When state changes, React automatically re-renders the component to show the updated data on the screen.

Think of state like a variable that React "watches"—whenever it changes, React updates the UI for you.

---

## The Basic Syntax

```tsx
import { useState } from "react";

const [value, setValue] = useState(initialValue);
```

**Breaking it down:**

- `useState` is a React Hook that creates a state variable
- `initialValue` is what the state starts as (can be a number, string, boolean, object, array, etc.)
- `value` is the current state value (read-only—never modify it directly!)
- `setValue` is the function you call to update the state

**Array destructuring:** `useState` returns an array with two items:

1. The current state value
2. A function to update that value

You can name these anything, but the convention is `[something, setSomething]`.

---

## Real Example from Our Recipe App

### Time Filter State

```tsx
const [selectedTime, setSelectedTime] = useState(60);
```

**What's happening:**

1. Initial state is `60` (show recipes that take ≤60 minutes)
2. `selectedTime` holds the current filter value
3. `setSelectedTime` is the function we call to change it

**When the user picks a different time:**

```tsx
<TimeDropDown
  selectedTime={selectedTime}
  setSelectedTime={(value: string) => setSelectedTime(Number(value))}
/>
```

1. User clicks "Less than 30min" in the dropdown
2. The dropdown calls `setSelectedTime(30)`
3. React updates `selectedTime` from `60` to `30`
4. The component re-renders
5. The filter runs again: `recipes.filter(recipe => recipe.time <= 30)`
6. Only recipes ≤30min appear on screen

---

## The Golden Rules

### ❌ NEVER modify state directly

```tsx
// ❌ WRONG - React won't detect the change
selectedTime = 30;

// ❌ WRONG - Directly mutating state
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // React won't re-render!
```

### ✅ ALWAYS use the setter function

```tsx
// ✅ CORRECT
setSelectedTime(30);

// ✅ CORRECT - Create a new array
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // Spread creates a new array
```

---

## Simple Examples

### Example 1: Counter

```tsx
"use client";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

**What happens:**

1. Component renders with `count = 0`
2. User clicks button
3. `setCount(count + 1)` is called → `setCount(1)`
4. React re-renders the component
5. Now `count = 1` and the UI updates

### Example 2: Toggle Visibility

```tsx
"use client";
import { useState } from "react";

const ToggleMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} Message
      </button>
      {isVisible && <p>Hello! I'm visible now.</p>}
    </div>
  );
};
```

**What happens:**

- `!isVisible` flips the boolean: `false` → `true` → `false`
- When `isVisible` is `true`, the message appears
- When `false`, the message disappears

### Example 3: Input Field

```tsx
"use client";
import { useState } from "react";

const NameInput = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
};
```

**What happens:**

- User types in the input
- `onChange` fires on every keystroke
- `e.target.value` is the current input text
- `setName(e.target.value)` updates state
- The `<p>` tag shows the updated name immediately

---

## Advanced: Updating Based on Previous State

When the new state depends on the old state, use the **functional update** form:

```tsx
const [count, setCount] = useState(0);

// ❌ Can cause bugs in async situations
setCount(count + 1);

// ✅ Safer - always uses the latest state
setCount((prevCount) => prevCount + 1);
```

**Why?** If multiple updates happen quickly, the functional form guarantees you're working with the most recent value.

---

## Our Recipe Filter: Full Flow

```tsx
"use client";
import { useState } from "react";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import { TimeDropDown } from "@/components/TimeDropDown";

const RecipesPage = () => {
  // 1. Create state with initial value 60
  const [selectedTime, setSelectedTime] = useState(60);

  // 2. Filter runs on EVERY render using current state
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.time <= selectedTime
  );

  return (
    <section>
      <h1>All recipes</h1>

      {/* 3. Pass state and setter to child component */}
      <TimeDropDown
        selectedTime={selectedTime}
        setSelectedTime={(value: string) => setSelectedTime(Number(value))}
      />

      {/* 4. Render filtered results */}
      <div>
        {filteredRecipes.length === 0 ? (
          <div>Recipes not found</div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </section>
  );
};
```

**Step-by-step execution:**

1. **Initial render:**

   - `selectedTime = 60`
   - `filteredRecipes` = all recipes with `time <= 60` (probably all of them)
   - UI shows all recipe cards

2. **User selects "Less than 30min":**

   - Dropdown calls `setSelectedTime(30)`
   - React schedules a re-render

3. **Re-render happens:**

   - `selectedTime = 30` (updated!)
   - Filter runs again: `recipes.filter(recipe => recipe.time <= 30)`
   - `filteredRecipes` now only contains recipes ≤30 minutes
   - UI updates to show only those cards

4. **User selects "Less than 10min":**
   - Same process: `setSelectedTime(10)` → re-render → filter updates → UI updates

---

## Common Mistakes

### Mistake 1: Forgetting "use client"

```tsx
// ❌ This will error in Next.js App Router
import { useState } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);
  // Error: useState only works in client components
};
```

```tsx
// ✅ Add "use client" at the top
"use client";
import { useState } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);
  // Now it works!
};
```

### Mistake 2: Calling setState in the render body

```tsx
// ❌ INFINITE LOOP!
const BadComponent = () => {
  const [count, setCount] = useState(0);

  setCount(count + 1); // Called every render, causes infinite loop!

  return <div>{count}</div>;
};
```

```tsx
// ✅ Call setState in event handlers or useEffect
const GoodComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // Only called when button is clicked
  };

  return <button onClick={handleClick}>{count}</button>;
};
```

### Mistake 3: Expecting immediate updates

```tsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(5);
  console.log(count); // ❌ Still logs 0!
  // State updates are batched and happen AFTER the function finishes
};
```

**Why?** `setCount` schedules an update but doesn't change the variable immediately. The new value appears on the next render.

---

## State Types Cheat Sheet

```tsx
// Number
const [age, setAge] = useState(25);
setAge(26);

// String
const [name, setName] = useState("John");
setName("Jane");

// Boolean
const [isOpen, setIsOpen] = useState(false);
setIsOpen(true);

// Array
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // Add item
setItems(items.filter((item) => item !== 2)); // Remove item

// Object
const [user, setUser] = useState({ name: "John", age: 25 });
setUser({ ...user, age: 26 }); // Update one field
```

---

## When to Use State vs Props

|                 | State                       | Props                |
| --------------- | --------------------------- | -------------------- |
| **Defined in**  | The component itself        | Parent component     |
| **Can change?** | Yes (via setter)            | No (read-only)       |
| **Used for**    | Data that changes over time | Passing data down    |
| **Example**     | Filter value, form input    | Recipe data, styling |

**Our recipe app uses both:**

- **State:** `selectedTime` (changes when user picks a filter)
- **Props:** `recipe` object passed to `RecipeCard` (doesn't change)

---

## Lifting State Up

When two components need to share state, move it to their closest common parent.

**Before (broken):**

```tsx
// Each component has its own state - they don't sync!
const FilterDropdown = () => {
  const [time, setTime] = useState(30);
  return <select onChange={...} />;
};

const RecipeList = () => {
  const [time, setTime] = useState(30); // Different state!
  const filtered = recipes.filter(r => r.time <= time);
  return <div>{filtered.map(...)}</div>;
};
```

**After (working):**

```tsx
// Parent owns state, children receive via props
const RecipesPage = () => {
  const [time, setTime] = useState(30); // Single source of truth
  const filtered = recipes.filter((r) => r.time <= time);

  return (
    <>
      <FilterDropdown selectedTime={time} onChange={setTime} />
      <RecipeList recipes={filtered} />
    </>
  );
};
```

---

## Practice Exercise

Try building a simple search filter for recipes by name:

```tsx
"use client";
import { useState } from "react";
import { recipes } from "@/data/recipes";

const SearchRecipes = () => {
  // 1. Create state for search text
  const [searchText, setSearchText] = useState("");

  // 2. Filter recipes by name (case-insensitive)
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {/* 3. Input updates state on every keystroke */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search recipes..."
      />

      {/* 4. Display filtered results */}
      <div>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>{recipe.name}</div>
        ))}
      </div>
    </div>
  );
};
```

**Challenge:** Add a "Clear" button that resets `searchText` to an empty string.

---

## Resources

- [React: State - A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React: useState Hook](https://react.dev/reference/react/useState)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Next.js: Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [TypeScript: React Hooks](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks)

---

## Summary

1. **useState creates reactive data** that triggers re-renders when changed
2. **Always use the setter function** to update state
3. **State updates are asynchronous** and batched
4. **Lift state up** to share it between components
5. **Use "use client"** directive in Next.js App Router
6. **Never call setState directly** in the component body (only in handlers/effects)

Once you understand `useState`, you've unlocked the power to make your React components interactive! 🎉
