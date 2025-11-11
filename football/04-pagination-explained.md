# Pagination Explained: Implementing Shadcn Pagination Component

This document explains how to implement pagination using Shadcn UI components in your Next.js application, specifically how it's used in the football players page.

---

## 📄 Files Involved

- `app/football/page.tsx` - The page component with pagination logic
- `components/ui/pagination.tsx` - Shadcn pagination component (installed via CLI)

---

## 🔑 Key Concepts

### What is Pagination?

**Pagination** divides a large dataset into smaller, manageable chunks (pages) and provides navigation controls to move between pages.

**Why use it?**

- Improves performance by showing less data at once
- Better user experience - easier to navigate large lists
- Faster page loads
- Mobile-friendly

---

## 📦 Step 1: Install Shadcn Pagination Component

Before using pagination, you need to install the component from Shadcn:

```bash
npx shadcn@latest add pagination --yes
```

This will:

- Create `components/ui/pagination.tsx`
- Install any required dependencies
- Add the component to your project

**Important:** Always use the CLI to add Shadcn components instead of creating them manually to ensure compatibility.

---

## 📋 Implementation Breakdown

### **Step 2: Import Pagination Components**

```typescript
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
```

**What each component does:**

- `Pagination` - Main wrapper component
- `PaginationContent` - Container for pagination items
- `PaginationItem` - Individual pagination element wrapper
- `PaginationLink` - Clickable page number link
- `PaginationPrevious` - "Previous" button
- `PaginationNext` - "Next" button

---

### **Step 3: Define Constants**

```typescript
const ITEMS_PER_PAGE = 3;
```

**Purpose:**

- Determines how many items show per page
- Easy to change - just update this constant
- For this example: 3 players per page

---

### **Step 4: Add State Management**

```typescript
const [players, setPlayers] = useState<Player[]>([]);
const [currentPage, setCurrentPage] = useState(1);
```

**State variables:**

- `players` - Full list of all items from API
- `currentPage` - Which page user is currently viewing (starts at 1)

---

### **Step 5: Calculate Pagination Values**

```typescript
// Calculate total number of pages
const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);

// Calculate which items to show on current page
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

// Slice the array to get only current page items
const currentPlayers = players.slice(startIndex, endIndex);
```

**How it works:**

**`totalPages` calculation:**

```typescript
Math.ceil(players.length / ITEMS_PER_PAGE);
```

- If you have 10 players and `ITEMS_PER_PAGE = 3`
- `10 / 3 = 3.33...`
- `Math.ceil(3.33) = 4` pages total
- Always rounds UP (ceil) because partial page still counts

**`startIndex` calculation:**

```typescript
(currentPage - 1) * ITEMS_PER_PAGE;
```

- Page 1: `(1-1) * 3 = 0` (start at index 0)
- Page 2: `(2-1) * 3 = 3` (start at index 3)
- Page 3: `(3-1) * 3 = 6` (start at index 6)

**`slice()` example:**

```typescript
// If currentPage = 2, ITEMS_PER_PAGE = 3
// startIndex = 3, endIndex = 6
players.slice(3, 6); // Returns items at indices 3, 4, 5
```

---

### **Step 6: Create Navigation Handlers**

```typescript
// Navigate to specific page
const handlePageChange = (
  page: number,
  e?: React.MouseEvent<HTMLAnchorElement>
) => {
  e?.preventDefault(); // Prevent default anchor link behavior
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
};

// Go to previous page
const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Go to next page
const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
```

**Why `preventDefault()`?**

- Pagination links use `<a>` tags
- Prevents browser navigation when clicking
- Keeps everything client-side (no page reload)

**Edge case handling:**

- `handlePrevious`: Only works if `currentPage > 1`
- `handleNext`: Only works if `currentPage < totalPages`

---

### **Step 7: Update the Render to Use `currentPlayers`**

**Before (showing all players):**

```typescript
{
  players.map((player: Player) => <div key={player.id}>...</div>);
}
```

**After (showing only current page):**

```typescript
{
  currentPlayers.map((player: Player) => <div key={player.id}>...</div>);
}
```

**Why this change:**

- Instead of mapping over all `players`, map over `currentPlayers`
- `currentPlayers` only contains items for the current page
- Automatically updates when `currentPage` changes

---

### **Step 8: Add Pagination UI Component**

```typescript
{
  totalPages > 1 && (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevious}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageChange(index + 1, e)}
                isActive={currentPage === index + 1}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

**Component structure:**

1. **Conditional rendering:**

   ```typescript
   {totalPages > 1 && (...)}
   ```

   - Only shows pagination if there's more than 1 page
   - No point showing pagination for 1-3 items

2. **Previous button:**

   - Disabled when on first page (`currentPage === 1`)
   - Uses `pointer-events-none opacity-50` to show it's disabled

3. **Page numbers:**

   ```typescript
   {Array.from({ length: totalPages }, (_, index) => (...))}
   ```

   - Creates array with numbers 0 to (totalPages - 1)
   - `index + 1` gives page numbers 1, 2, 3...
   - `isActive` highlights current page

4. **Next button:**
   - Disabled when on last page (`currentPage === totalPages`)

---

## 🔄 Complete Flow

```
1. Component loads
   ↓
2. useEffect fetches all players from API
   ↓
3. Players stored in state (full array)
   ↓
4. Calculate totalPages based on ITEMS_PER_PAGE
   ↓
5. Calculate currentPlayers for currentPage
   ↓
6. Render only currentPlayers (3 items)
   ↓
7. User clicks page 2
   ↓
8. handlePageChange(2) updates currentPage
   ↓
9. currentPlayers recalculated automatically
   ↓
10. Component re-renders with new currentPlayers
```

---

## 🎯 How to Use in Your Future Projects

### **Template Implementation**

1. **Install component:**

   ```bash
   npx shadcn@latest add pagination --yes
   ```

2. **Set up constants and state:**

   ```typescript
   const ITEMS_PER_PAGE = 10; // Adjust as needed
   const [items, setItems] = useState<Item[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   ```

3. **Calculate pagination:**

   ```typescript
   const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
   const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
   ```

4. **Create handlers:**

   ```typescript
   const handlePageChange = (
     page: number,
     e?: React.MouseEvent<HTMLAnchorElement>
   ) => {
     e?.preventDefault();
     setCurrentPage(page);
     window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
     e.preventDefault();
     if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
     e.preventDefault();
     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
   };
   ```

5. **Render with pagination:**

   ```typescript
   {
     currentItems.map((item) => <div key={item.id}>{item.name}</div>);
   }

   {
     totalPages > 1 && (
       <Pagination>
         <PaginationContent>
           <PaginationItem>
             <PaginationPrevious
               href="#"
               onClick={handlePrevious}
               className={
                 currentPage === 1 ? "pointer-events-none opacity-50" : ""
               }
             />
           </PaginationItem>
           {Array.from({ length: totalPages }, (_, index) => (
             <PaginationItem key={index}>
               <PaginationLink
                 href="#"
                 onClick={(e) => handlePageChange(index + 1, e)}
                 isActive={currentPage === index + 1}
               >
                 {index + 1}
               </PaginationLink>
             </PaginationItem>
           ))}
           <PaginationItem>
             <PaginationNext
               href="#"
               onClick={handleNext}
               className={
                 currentPage === totalPages
                   ? "pointer-events-none opacity-50"
                   : ""
               }
             />
           </PaginationItem>
         </PaginationContent>
       </Pagination>
     );
   }
   ```

---

## 💡 Advanced: Server-Side Pagination

**Current implementation:** Client-side pagination (all data loaded, sliced in browser)

**Server-side pagination:** Request only current page data from API

**Benefits:**

- Faster initial load
- Less memory usage
- Better for very large datasets

**Implementation approach:**

1. Modify API to accept `page` and `limit` query parameters
2. Database query with `skip` and `take`
3. Return only requested page data
4. Update frontend to request specific page

**Example API route:**

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const players = await prisma.players.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.players.count();
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    players,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
    },
  });
}
```

---

## ✅ Key Takeaways

1. **Always use Shadcn CLI** - Don't create components manually
2. **Calculate pagination values** - `totalPages`, `startIndex`, `currentItems`
3. **Use state for currentPage** - React automatically re-renders when it changes
4. **Prevent default behavior** - On anchor tags to keep navigation client-side
5. **Conditional rendering** - Only show pagination when `totalPages > 1`
6. **Disable buttons** - At edges (first/last page) to prevent invalid navigation
7. **Map over currentItems** - Not the full array

---

## 🐛 Common Issues & Solutions

**Issue:** Pagination not showing

- **Check:** Is `totalPages > 1`?
- **Solution:** Ensure you have enough items

**Issue:** Clicking doesn't change page

- **Check:** Did you add `onClick` handlers?
- **Solution:** Make sure handlers call `setCurrentPage`

**Issue:** All items showing instead of paginated

- **Check:** Are you mapping over `currentPlayers` or `players`?
- **Solution:** Use `currentPlayers` in the map function

**Issue:** Page numbers not updating

- **Check:** Is `isActive` prop set correctly?
- **Solution:** Compare `currentPage === index + 1` for active state

---

Now you're ready to implement pagination in any of your future projects! 🚀








