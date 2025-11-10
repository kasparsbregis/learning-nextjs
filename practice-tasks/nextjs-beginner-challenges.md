## Next.js + TypeScript Practice Tasks

Each task builds on the last. Start with simple array rendering and work up to combining filtering, pagination, and type-safe props.

---

### 1. Render a Static Team Roster
- **Goal:** Create a `TeamList` client component that maps over a hard-coded array of players and outputs a list.
- **Focus Areas:** Basic `map`, defining a `Player` interface, typing component props.
- **Deliverable:** A component displayed on a dedicated `/football/roster` page showing player name + position.
- **Hints:**
  - Define `interface Player { id: number; name: string; position: string }`.
  - Use `Array.map` to turn data into `<li>` elements; each needs a `key`.
  - Accept the roster array as a prop so the component can be reused later.
- **Docs:** [Next.js Rendering Fundamentals](https://nextjs.org/docs/pages/building-your-application/rendering), [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html), [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists).

---

### 2. Filter Players by Position
- **Goal:** Extend `TeamList` with a dropdown that filters players by position.
- **Focus Areas:** `filter`, state in client components, typing event handlers.
- **Deliverable:** Selecting a position updates the rendered players instantly.
- **Hints:**
  - Store the selected position with `useState<string>('All')`.
  - Filter before mapping: `players.filter(player => matchesSelection)`.
  - Create a `PlayerFilterProps` interface so the filter knows what options it receives.
- **Docs:** [Next.js: Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components), [React Docs: Responding to Events](https://react.dev/learn/responding-to-events), [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

---

### 3. Paginate the Filtered List
- **Goal:** Add client-side pagination (e.g. 5 players per page) after filtering.
- **Focus Areas:** Derived data (`useMemo`), basic pagination math, prop drilling.
- **Deliverable:** Buttons to move between pages while keeping the position filter applied.
- **Hints:**
  - Calculate `startIndex = currentPage * pageSize` and `endIndex`.
  - Derive the filtered list once, then slice for the current page.
  - Pass pagination state as props into a reusable `PaginationControls` component.
- **Docs:** [React Docs: Keeping Components Pure](https://react.dev/learn/keeping-components-pure), [TypeScript React Cheat Sheet: Typing Hooks](https://www.typescriptlang.org/docs/handbook/react.html), [Next.js: Sharing UI Between Pages](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts).

---

### 4. Fetch Players from a Server Component
- **Goal:** Move the player data into a server component (e.g. a `page.tsx`) that fetches from a mock API or filesystem, then passes typed props to the client components you built.
- **Focus Areas:** Server vs client boundary, `async` server components, prop typing across the boundary.
- **Deliverable:** `/football/players` page that fetches data server-side and renders the same roster UI client-side.
- **Hints:**
  - Use `export default async function Page()` to fetch data with `await`.
  - Create a shared `Player` type in `types/player.ts` and import it on both server + client.
  - Remember client components must live in files marked with `"use client"`.
- **Docs:** [Next.js: Data Fetching in Server Components](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching), [Next.js: Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-server-and-client-components-together), [TypeScript: Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html).

---

### 5. Add Search with Debouncing and Empty-State UX
- **Goal:** Introduce a search input that filters players by name with debounced input, combines results with pagination, and displays “No players found” when appropriate.
- **Focus Areas:** Controlled inputs, debouncing (`setTimeout` or a utility), composing reusable typed props.
- **Deliverable:** Smooth UX where typing updates results after a short delay; pagination resets on new searches.
- **Hints:**
  - Extract search state into a custom hook `useDebouncedValue<T>(value, delay)`.
  - Reset `currentPage` to `0` when filters change.
  - Type the hook generically to keep it reusable.
  - Handle the empty list edge case with a friendly message component.
- **Docs:** [React Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects), [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), [Next.js UX Patterns](https://nextjs.org/learn/dashboard-app/adding-search).

---

Work through the tasks sequentially. After finishing each one, refactor to ensure props and interfaces remain consistent and reusable—you’ll deepen both Next.js and TypeScript intuition in the process.


