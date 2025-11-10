# Student Grade Tracker - Practice Tasks

## Project Overview

Build a student grade management system where you can view, filter, and display student information. This project practices:
- Mapping arrays to components
- Passing typed props
- Using useState for filters
- Conditional rendering based on data
- Working with different data types (strings, numbers, arrays, booleans)

---

## Data Structure

You have a `Student` interface with these fields:

```tsx
interface Student {
  id: number;
  name: string;
  age: number;
  grade: number; // 0-100
  subjects: string[];
  isActive: boolean;
  email: string;
  avatar: string;
}
```

The data is in `data/students.ts` with 8 sample students.

---

## Task 1: Basic Student List (Easiest)

**Goal:** Display all students in a simple list.

### Requirements:
1. Create `app/students/page.tsx` as a server component
2. Import and map over the `students` array
3. For each student, display:
   - Avatar image (use Next.js `<Image>`)
   - Name
   - Age
   - Grade (as a number)
   - Email

### Hints:
- Use `.map()` to loop through students
- Don't forget the `key` prop (use `student.id`)
- Keep it simple—just display the data in a `<div>` or `<ul>`

### Learning Focus:
- Basic array mapping
- Accessing object properties
- Using keys in lists

### Docs:
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [Next.js: Image Component](https://nextjs.org/docs/app/api-reference/components/image)

---

## Task 2: StudentCard Component (Easy)

**Goal:** Extract the student display into a reusable component.

### Requirements:
1. Create `components/StudentCard.tsx`
2. Define a props interface that accepts a single `Student`
3. Move the student display logic into this component
4. The card should show:
   - Avatar
   - Name
   - Grade with a colored badge:
     - Green if grade >= 90 (A)
     - Blue if grade >= 80 (B)
     - Yellow if grade >= 70 (C)
     - Red if grade < 70 (D/F)
   - Number of subjects enrolled
   - Active/Inactive status

### Hints:
- Use destructuring: `({ student }: { student: Student })`
- For the badge color, use a ternary or if/else
- `subjects.length` gives you the count
- Display status with conditional text or icons

### Learning Focus:
- Creating typed components
- Props destructuring
- Conditional styling/rendering
- Working with arrays (`.length`)

### Docs:
- [React: Passing Props](https://react.dev/learn/passing-props-to-a-component)
- [TypeScript: React Components](https://www.typescriptlang.org/docs/handbook/react.html)

---

## Task 3: Filter by Grade Range (Medium)

**Goal:** Add a dropdown to filter students by grade range.

### Requirements:
1. Make `app/students/page.tsx` a **client component** (`"use client"`)
2. Create state: `useState<string>("all")`
3. Create a `<select>` dropdown with options:
   - "All Students"
   - "A Students (90-100)"
   - "B Students (80-89)"
   - "C Students (70-79)"
   - "D/F Students (0-69)"
4. Filter the students array based on the selected range
5. Display the filtered results

### Hints:
- Use `.filter()` with grade conditions
- Chain the conditions: `grade >= 90 && grade <= 100`
- Map over the **filtered array**, not the original
- If no students match, show "No students found"

### Learning Focus:
- Using useState
- Array filtering with conditions
- Conditional rendering for empty states
- Combining state with derived data

### Docs:
- [React: State](https://react.dev/learn/state-a-components-memory)
- [MDN: Array.filter()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

---

## Task 4: Filter by Active Status (Medium)

**Goal:** Add checkboxes to show only active, inactive, or all students.

### Requirements:
1. Add another state: `useState<"all" | "active" | "inactive">("all")`
2. Create radio buttons or a toggle to switch between:
   - All students
   - Active students only
   - Inactive students only
3. Apply **both** filters (grade range AND active status)
4. Show a count: "Showing X of Y students"

### Hints:
- Chain `.filter()` calls or use multiple conditions in one
- Example: `students.filter(s => s.grade >= 90).filter(s => s.isActive)`
- Or: `students.filter(s => s.grade >= 90 && s.isActive)`
- Calculate total with `students.length` and filtered with `filteredStudents.length`

### Learning Focus:
- Multiple state variables
- Combining multiple filters
- Working with booleans
- Dynamic counts

### Docs:
- [React: Managing State](https://react.dev/learn/managing-state)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)

---

## Task 5: Student Detail Page (Harder)

**Goal:** Create a dynamic route to show full details of a single student.

### Requirements:
1. Create `app/students/[id]/page.tsx`
2. Use `params` to get the student ID from the URL
3. Find the student using `.find()`
4. Display full information:
   - Avatar (larger)
   - Name, Age, Email
   - Grade with letter grade (A/B/C/D/F)
   - List of subjects (map over `subjects` array)
   - Active status
5. If student not found, show 404 message with link back to list
6. Add a "Back to Students" link

### Hints:
- Remember: `params` is a Promise in Next.js 16
- Type it as: `params: Promise<{ id: string }>`
- Convert string to number: `Number(params.id)`
- Use `.find(s => s.id === id)`
- Map over `subjects` array to display each one

### Learning Focus:
- Dynamic routes with [id]
- Using `.find()` for lookup
- Handling promises (await params)
- Error handling (student not found)
- Nested array mapping

### Docs:
- [Next.js: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [MDN: Array.find()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

---

## Task 6: Link Cards to Detail Page (Medium)

**Goal:** Make student cards clickable.

### Requirements:
1. Wrap each `StudentCard` in a Next.js `<Link>`
2. Link to `/students/[id]`
3. Add hover effects to show it's clickable
4. Ensure the link is accessible (proper href, no nested links)

### Hints:
- Import `Link` from `next/link`
- Use template literal: ``href={`/students/${student.id}`}``
- Add Tailwind classes like `hover:shadow-lg transition`
- Make sure the entire card is clickable

### Learning Focus:
- Next.js Link component
- Dynamic URLs
- User experience (hover states)

### Docs:
- [Next.js: Link Component](https://nextjs.org/docs/app/api-reference/components/link)

---

## Bonus Challenges (Optional)

### Challenge 1: Search by Name
- Add an input field for searching students by name
- Filter using `.filter()` with `.includes()` or `.toLowerCase()`
- Update results as user types

### Challenge 2: Sort Students
- Add buttons to sort by:
  - Name (A-Z)
  - Grade (High to Low)
  - Age (Young to Old)
- Use `.sort()` method
- Remember: create a new array before sorting (don't mutate state)

### Challenge 3: Calculate Class Average
- Calculate the average grade of all students
- Display it at the top
- Show how many students are above/below average
- Use `.reduce()` to sum grades

### Challenge 4: Subject Filter
- Create a dropdown of all unique subjects
- Filter students who are enrolled in the selected subject
- Use `.filter()` with `.includes()` on the subjects array

---

## Example Component Structure

```
app/
  students/
    page.tsx              ← Main list page (client component with filters)
    [id]/
      page.tsx            ← Detail page (server component)
    layout.tsx            ← Optional: shared layout

components/
  StudentCard.tsx         ← Reusable card component
  GradeFilter.tsx         ← Optional: extract filter dropdown
  StatusFilter.tsx        ← Optional: extract status toggle

data/
  students.ts             ← Student data and interface (already created)
```

---

## Tips for Success

1. **Start Simple:** Get Task 1 working before moving to Task 2
2. **Console.log Everything:** When confused, log the data to see what you're working with
3. **Check Types:** If TypeScript complains, read the error carefully
4. **Test Each Filter:** Make sure grade filter works alone before adding status filter
5. **Use the Docs:** The official React/Next.js docs are your best friend
6. **Break It Down:** If a task feels overwhelming, break it into smaller steps

---

## Learning Outcomes

By completing this project, you'll understand:

✅ How to map arrays to JSX  
✅ How to pass and type props  
✅ How to use useState for filtering  
✅ How to work with different data types  
✅ How to use `.filter()`, `.find()`, `.map()`, and `.length`  
✅ How to handle dynamic routes  
✅ How to combine multiple filters  
✅ How to render conditionally based on data  
✅ How to use Next.js Link and Image components  

---

## Getting Started

1. The data file `data/students.ts` is already created
2. Start with `app/students/page.tsx`
3. Work through tasks 1-6 in order
4. Refer back to your recipe project for similar patterns
5. Ask for help when stuck—but try to solve it first!

Good luck! 🎓

