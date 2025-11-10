# Understanding Filtering with useState - Student Tracker

## Overview

This guide explains how the student filtering system works in your Student Tracker app. We'll break down every piece of the code and show how state, filtering, and component communication work together.

---

## The Complete Flow

```
1. User clicks dropdown
2. Selects "B Students (80-90)"
3. StudentSelect calls setSkolnieki("b")
4. State updates from "all" to "b"
5. Component re-renders
6. Filter function runs with new state
7. New filtered array is created
8. Map renders only B students
```

---

## Your Code Analysis

### Part 1: Setting Up State

```tsx
"use client";
import { useState } from "react";

const StudentsPage = () => {
  const [skolnieki, setSkolnieki] = useState<string>("all");
```

**What's happening:**

- `"use client"` makes this a client component (required for `useState`)
- `skolnieki` is your state variable holding the current filter: `"all"`, `"a"`, `"b"`, `"c"`, or `"d"`
- `setSkolnieki` is the function to update that state
- `useState<string>("all")` means:
  - Type: `string`
  - Initial value: `"all"` (show all students on first load)

**Why `"all"` as initial value?**  
When the page first loads, you want to show all students before any filtering. This is the default state.

---

### Part 2: The Filter Logic

```tsx
const filteredStudents = students.filter((student) => {
  if (skolnieki === "all") {
    return true;
  }
  if (skolnieki === "a") {
    return student.grade >= 90 && student.grade <= 100;
  }
  if (skolnieki === "b") {
    return student.grade >= 80 && student.grade < 90;
  }
  if (skolnieki === "c") {
    return student.grade >= 70 && student.grade < 80;
  }
  if (skolnieki === "d") {
    return student.grade < 70;
  }
});
```

**Breaking it down:**

#### What `.filter()` does

- Takes an array (`students`)
- Runs a function on each item
- If the function returns `true`, keep the item
- If it returns `false`, remove the item
- Returns a **new array** with only the kept items

#### Your logic step-by-step

**When `skolnieki === "all"`:**

```tsx
if (skolnieki === "all") {
  return true; // Keep every student
}
```

Every student passes the filter, so all 8 students are in `filteredStudents`.

**When `skolnieki === "a"`:**

```tsx
if (skolnieki === "a") {
  return student.grade >= 90 && student.grade <= 100;
}
```

- Emma (92) → `92 >= 90 && 92 <= 100` → `true` → ✅ Kept
- Liam (78) → `78 >= 90 && 78 <= 100` → `false` → ❌ Removed
- Noah (95) → `95 >= 90 && 95 <= 100` → `true` → ✅ Kept
- Olivia (65) → `65 >= 90 && 65 <= 100` → `false` → ❌ Removed

Result: `filteredStudents` has only Emma, Noah, and any others with grades ≥90.

**When `skolnieki === "b"`:**

```tsx
if (skolnieki === "b") {
  return student.grade >= 80 && student.grade < 90;
}
```

- Emma (92) → `92 >= 80 && 92 < 90` → `false` (92 is not less than 90) → ❌ Removed
- Sophia (88) → `88 >= 80 && 88 < 90` → `true` → ✅ Kept
- Mason (82) → `82 >= 80 && 82 < 90` → `true` → ✅ Kept

Result: Only students with grades 80-89.

**Why `< 90` instead of `<= 89`?**  
Both work, but `< 90` is cleaner and prevents overlap with the A range.

---

### Part 3: The Child Component (StudentSelect)

```tsx
interface SkolniekiSelectProps {
  skolnieki: string;
  setSkolnieki: (value: string) => void;
}

const StudentSelect = ({ skolnieki, setSkolnieki }: SkolniekiSelectProps) => {
  return (
    <Select value={skolnieki} onValueChange={setSkolnieki}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select students" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Students</SelectLabel>
          <SelectItem value="all">All Students</SelectItem>
          <SelectItem value="a">A Students (Rating &gt;90)</SelectItem>
          <SelectItem value="b">B Students (Rating 80-90)</SelectItem>
          <SelectItem value="c">C Students (Rating 70-80)</SelectItem>
          <SelectItem value="d">D/F Students (Rating &lt;70)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
```

**What's happening:**

#### Props Interface

```tsx
interface SkolniekiSelectProps {
  skolnieki: string; // Current selected value
  setSkolnieki: (value: string) => void; // Function to update it
}
```

- `skolnieki: string` → The dropdown needs to know what's currently selected to highlight it
- `setSkolnieki: (value: string) => void` → The dropdown needs a way to tell the parent when the user picks something new

#### The Select Component

```tsx
<Select value={skolnieki} onValueChange={setSkolnieki}>
```

- `value={skolnieki}` → Shows the current selection (controlled component)
- `onValueChange={setSkolnieki}` → When user picks a new item, call `setSkolnieki` with the new value

**Example flow:**

1. User clicks dropdown
2. User clicks "B Students (Rating 80-90)"
3. The `SelectItem` with `value="b"` is clicked
4. `onValueChange` fires with `"b"` as the argument
5. `setSkolnieki("b")` is called
6. State updates in the parent component
7. The dropdown now shows "B Students" as selected

---

### Part 4: Passing Props to Child

```tsx
<StudentSelect
  skolnieki={skolnieki}
  setSkolnieki={(value: string) => setSkolnieki(value)}
/>
```

**Breaking down the props:**

#### `skolnieki={skolnieki}`

Passes the current state value down to the child. The child needs this to:

- Show which option is currently selected
- Keep the dropdown's visual state in sync

#### `setSkolnieki={(value: string) => setSkolnieki(value)}`

This looks redundant, but it's actually correct! Here's why:

**The child component expects:**

```tsx
setSkolnieki: (value: string) => void
```

**What you're passing:**

```tsx
(value: string) => setSkolnieki(value);
```

This is a wrapper function that:

1. Receives the new value from the dropdown
2. Calls the parent's `setSkolnieki` with that value

**Simpler alternative (does the same thing):**

```tsx
<StudentSelect skolnieki={skolnieki} setSkolnieki={setSkolnieki} />
```

You can pass `setSkolnieki` directly since it already has the right signature! Your version works too, but this is shorter.

---

### Part 5: Rendering the Filtered Results

```tsx
<div className="py-10 flex flex-col gap-4">
  {filteredStudents.map((student) => (
    <StudentCard key={student.id} student={student} />
  ))}
</div>
```

**What's happening:**

- `filteredStudents` is the **new array** created by the filter
- `.map()` loops through **only the filtered students**
- Each student gets rendered as a `<StudentCard>`
- `key={student.id}` uses the unique ID (not `index`—good job!)

**Example:**

If `skolnieki === "a"`, and only Emma and Noah have A grades:

```tsx
filteredStudents = [
  { id: 1, name: "Emma Wilson", grade: 92, ... },
  { id: 4, name: "Noah Johnson", grade: 95, ... },
];
```

The `.map()` renders 2 cards instead of 8.

---

## Complete Execution Flow Example

Let's trace what happens when the user changes the filter:

### Initial Load

1. **Component renders:**
   - `skolnieki = "all"`
   - `filteredStudents = students.filter(...)` → All 8 students pass
   - 8 `<StudentCard>`s render
   - Dropdown shows "All Students"

### User Clicks Dropdown and Selects "B Students"

2. **User interaction:**

   - User clicks `<SelectItem value="b">`
   - `onValueChange` fires with `"b"`

3. **State updates:**

   - `setSkolnieki("b")` is called
   - React schedules a re-render

4. **Re-render happens:**
   - Component function runs again from the top
   - `skolnieki = "b"` (updated!)
   - Filter runs again:

```tsx
const filteredStudents = students.filter((student) => {
  if (skolnieki === "all") {
    return true; // Nope, skolnieki is "b"
  }
  if (skolnieki === "a") {
    return student.grade >= 90 && student.grade <= 100; // Nope
  }
  if (skolnieki === "b") {
    return student.grade >= 80 && student.grade < 90; // YES! This runs
  }
  // ...
});
```

5. **New filtered array:**

   - Only students with grades 80-89 pass the filter
   - Example: Sophia (88), Mason (82), Ava (89)

6. **UI updates:**
   - Only 3 `<StudentCard>`s render instead of 8
   - Dropdown shows "B Students (Rating 80-90)"

---

## Common Patterns You're Using

### 1. Controlled Components

```tsx
<Select value={skolnieki} onValueChange={setSkolnieki}>
```

The `Select` doesn't manage its own state. The parent (`StudentsPage`) owns the state, and the child just displays it and reports changes. This is called a **controlled component**.

### 2. Lifting State Up

The state (`skolnieki`) lives in the **parent** because:

- The parent needs it to filter the students
- The child needs it to show the selection

When multiple components need the same state, lift it to their closest common parent.

### 3. Derived State

```tsx
const filteredStudents = students.filter(...);
```

`filteredStudents` is **not** state—it's **derived** from state. Every time `skolnieki` changes, the filter automatically recalculates. No need for a separate `useState`.

### 4. Single Source of Truth

There's only **one** place where the current filter is stored: the `skolnieki` state. Everything else (dropdown, filtered list) reads from it. This prevents bugs where the UI and data get out of sync.

---

## What Happens Behind the Scenes (React Internals)

### Render Cycle

1. **Initial Render:**

```
State: skolnieki = "all"
↓
Filter runs: filteredStudents = [all 8 students]
↓
Map runs: 8 StudentCards created
↓
Dropdown receives "all" as value
↓
UI displays
```

2. **User Changes Selection:**

```
User clicks "B Students"
↓
onValueChange("b") fires
↓
setSkolnieki("b") called
↓
React marks component as "needs update"
↓
React schedules re-render
```

3. **Re-Render:**

```
State: skolnieki = "b" (NEW!)
↓
Filter runs: filteredStudents = [only B students]
↓
Map runs: 3 StudentCards created (5 removed)
↓
Dropdown receives "b" as value
↓
React compares old vs new virtual DOM
↓
React updates only the changed parts in real DOM
↓
UI shows only B students
```

**Key insight:** The entire component function runs again, but React is smart about only updating the DOM where things actually changed.

---

## Comparison: Before and After Filter

### Before (No Filter)

```tsx
{
  students.map((student) => <StudentCard key={student.id} student={student} />);
}
```

- Always renders all 8 students
- No state needed
- No filtering logic

### After (With Filter)

```tsx
const [skolnieki, setSkolnieki] = useState<string>("all");

const filteredStudents = students.filter((student) => {
  // filtering logic
});

{
  filteredStudents.map((student) => (
    <StudentCard key={student.id} student={student} />
  ));
}
```

- Renders only students matching the filter
- State tracks the current selection
- Filter creates a new array on every render

---

## What You've Learned

✅ **State management** - Creating and updating state with `useState`  
✅ **Array filtering** - Using `.filter()` with conditional logic  
✅ **Props passing** - Sending state and setters to child components  
✅ **Controlled components** - Parent controls child's display  
✅ **Derived data** - Computing values from state without extra state  
✅ **Re-rendering** - Understanding when and why components update  
✅ **Type safety** - Using TypeScript interfaces for props  
✅ **Component communication** - Child reports changes to parent

---

## Potential Improvements (Optional)

### 1. Handle Missing Cases

Your filter doesn't have a `return false` at the end. If somehow `skolnieki` is an unexpected value, the filter will return `undefined`, which is falsy, so it works. But being explicit is better:

```tsx
const filteredStudents = students.filter((student) => {
  if (skolnieki === "all") return true;
  if (skolnieki === "a") return student.grade >= 90 && student.grade <= 100;
  if (skolnieki === "b") return student.grade >= 80 && student.grade < 90;
  if (skolnieki === "c") return student.grade >= 70 && student.grade < 80;
  if (skolnieki === "d") return student.grade < 70;
  return true; // Default: show student if unknown filter
});
```

### 2. Extract Filter Logic

```tsx
const getStudentsByGrade = (students, level) => {
  return students.filter((student) => {
    // same logic
  });
};

const filteredStudents = getStudentsByGrade(students, skolnieki);
```

This makes the component cleaner and the function reusable.

### 3. Use a Switch Statement

```tsx
const filteredStudents = students.filter((student) => {
  switch (skolnieki) {
    case "all":
      return true;
    case "a":
      return student.grade >= 90;
    case "b":
      return student.grade >= 80 && student.grade < 90;
    case "c":
      return student.grade >= 70 && student.grade < 80;
    case "d":
      return student.grade < 70;
    default:
      return true;
  }
});
```

Some developers prefer `switch` for multiple conditions like this.

---

## Summary

Your code is **correct, well-structured, and follows React best practices**:

- State lives in the parent ✅
- Child is a controlled component ✅
- Filter creates derived data ✅
- Props are properly typed ✅
- Keys use unique IDs ✅
- Logic is clear and readable ✅

You've successfully implemented a dynamic filtering system! This is exactly how filtering works in real production apps. Great job! 🎉
