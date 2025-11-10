# JavaScript Array Methods Reference Guide

A practical guide to the most commonly used array methods with simple examples.

---

## Table of Contents
1. [.map()](#map) - Transform items
2. [.filter()](#filter) - Remove unwanted items
3. [.find()](#find) - Find one item
4. [.some()](#some) - Check if any match
5. [.every()](#every) - Check if all match
6. [.includes()](#includes) - Check if array contains value
7. [.sort()](#sort) - Reorder items
8. [.reduce()](#reduce) - Combine into single value
9. [.flatMap()](#flatmap) - Transform and flatten
10. [.flat()](#flat) - Flatten nested arrays
11. [Set](#set) - Remove duplicates
12. [.forEach()](#foreach) - Loop through items
13. [.slice()](#slice) - Copy portion of array
14. [Array Chaining](#chaining) - Combining methods

---

## .map()

**Purpose:** Transform each item in an array into something else.

**Returns:** New array with same length

**When to use:** When you want to transform every item (e.g., extracting properties, formatting data)

### Example 1: Basic transformation
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Example 2: Extracting properties
```javascript
const students = [
  { name: "Emma", age: 20 },
  { name: "Liam", age: 19 },
  { name: "Sophia", age: 21 }
];

const names = students.map(student => student.name);
console.log(names); // ["Emma", "Liam", "Sophia"]
```

### Example 3: Creating JSX (React)
```jsx
const students = [...];
return (
  <div>
    {students.map(student => (
      <StudentCard key={student.id} student={student} />
    ))}
  </div>
);
```

---

## .filter()

**Purpose:** Keep only items that pass a test (condition).

**Returns:** New array with same or fewer items

**When to use:** When you want to remove items that don't match criteria

### Example 1: Filter by condition
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]
```

### Example 2: Filter objects
```javascript
const students = [
  { name: "Emma", grade: 92 },
  { name: "Liam", grade: 78 },
  { name: "Noah", grade: 95 }
];

const topStudents = students.filter(student => student.grade >= 90);
console.log(topStudents); 
// [{ name: "Emma", grade: 92 }, { name: "Noah", grade: 95 }]
```

### Example 3: Multiple conditions
```javascript
const students = [...];
const activeAStudents = students.filter(student => 
  student.grade >= 90 && student.isActive === true
);
```

---

## .find()

**Purpose:** Find the **first** item that matches a condition.

**Returns:** Single item (or `undefined` if not found)

**When to use:** When you need to locate one specific item

### Example 1: Find by ID
```javascript
const students = [
  { id: 1, name: "Emma" },
  { id: 2, name: "Liam" },
  { id: 3, name: "Sophia" }
];

const student = students.find(s => s.id === 2);
console.log(student); // { id: 2, name: "Liam" }
```

### Example 2: Handle not found
```javascript
const students = [...];
const student = students.find(s => s.id === 999);

if (!student) {
  console.log("Student not found!");
}
```

### Example 3: Find by name
```javascript
const students = [...];
const emma = students.find(s => s.name === "Emma Wilson");
```

---

## .some()

**Purpose:** Check if **at least one** item passes a test.

**Returns:** `true` or `false`

**When to use:** When you want to know "does ANY item match?"

### Example 1: Check if any number is even
```javascript
const numbers = [1, 3, 5, 8, 9];
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true (because of 8)
```

### Example 2: Check if student has a subject
```javascript
const student = {
  name: "Emma",
  subjects: ["Math", "Physics", "Computer Science"]
};

const hasMath = student.subjects.some(subject => subject === "Math");
console.log(hasMath); // true
```

### Example 3: Search in array of subjects
```javascript
const students = [...];
const filteredStudents = students.filter(student =>
  student.subjects.some(subject => 
    subject.toLowerCase().includes("math")
  )
);
```

---

## .every()

**Purpose:** Check if **all** items pass a test.

**Returns:** `true` or `false`

**When to use:** When you want to know "do ALL items match?"

### Example 1: Check if all pass
```javascript
const grades = [85, 90, 92, 88];
const allPassing = grades.every(grade => grade >= 70);
console.log(allPassing); // true
```

### Example 2: Check if all are adults
```javascript
const students = [
  { name: "Emma", age: 20 },
  { name: "Liam", age: 19 },
  { name: "Sophia", age: 21 }
];

const allAdults = students.every(student => student.age >= 18);
console.log(allAdults); // true
```

---

## .includes()

**Purpose:** Check if an array contains a specific value.

**Returns:** `true` or `false`

**When to use:** When checking for exact matches in an array

### Example 1: Check if value exists
```javascript
const fruits = ["apple", "banana", "orange"];
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false
```

### Example 2: Check if student takes a subject
```javascript
const subjects = ["Math", "Physics", "Chemistry"];
const takesMath = subjects.includes("Math");
console.log(takesMath); // true
```

### Example 3: Case-sensitive check
```javascript
const subjects = ["Mathematics"];
console.log(subjects.includes("mathematics")); // false (case matters!)
console.log(subjects.includes("Mathematics")); // true
```

---

## .sort()

**Purpose:** Reorder items in an array.

**Returns:** The same array (mutated!)

**When to use:** When you need to sort alphabetically, numerically, or by custom logic

**⚠️ Warning:** `.sort()` changes the original array! Use `[...array].sort()` to avoid mutation.

### Example 1: Sort numbers (ascending)
```javascript
const numbers = [5, 2, 8, 1, 9];
const sorted = [...numbers].sort((a, b) => a - b);
console.log(sorted); // [1, 2, 5, 8, 9]
```

### Example 2: Sort numbers (descending)
```javascript
const numbers = [5, 2, 8, 1, 9];
const sorted = [...numbers].sort((a, b) => b - a);
console.log(sorted); // [9, 8, 5, 2, 1]
```

### Example 3: Sort strings alphabetically
```javascript
const names = ["Sophia", "Emma", "Liam", "Noah"];
const sorted = [...names].sort((a, b) => a.localeCompare(b));
console.log(sorted); // ["Emma", "Liam", "Noah", "Sophia"]
```

### Example 4: Sort objects by property
```javascript
const students = [
  { name: "Emma", grade: 92 },
  { name: "Liam", grade: 78 },
  { name: "Noah", grade: 95 }
];

const sorted = [...students].sort((a, b) => b.grade - a.grade);
console.log(sorted); 
// [{ name: "Noah", 95 }, { name: "Emma", 92 }, { name: "Liam", 78 }]
```

### How .sort() comparison works:
- Return **negative number** (like -1): Put `a` before `b`
- Return **positive number** (like 1): Put `b` before `a`
- Return **0**: Keep same order

---

## .reduce()

**Purpose:** Combine all items into a single value.

**Returns:** Single value (number, string, object, array, etc.)

**When to use:** When you need to calculate totals, averages, or combine data

### Example 1: Sum all numbers
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15
```

### Example 2: Calculate average grade
```javascript
const students = [
  { name: "Emma", grade: 92 },
  { name: "Liam", grade: 78 },
  { name: "Noah", grade: 95 }
];

const totalGrade = students.reduce((sum, student) => sum + student.grade, 0);
const average = totalGrade / students.length;
console.log(average); // 88.33
```

### Example 3: Count occurrences
```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }
```

### How .reduce() works:
- **First parameter**: Accumulator (the running total/result)
- **Second parameter**: Current item
- **After callback**: Initial value for accumulator

---

## .flatMap()

**Purpose:** Transform each item AND flatten the result by one level.

**Returns:** New flattened array

**When to use:** When `.map()` would create nested arrays that you want flattened

### Example 1: Get all subjects from all students
```javascript
const students = [
  { name: "Emma", subjects: ["Math", "Physics"] },
  { name: "Liam", subjects: ["Biology", "Chemistry"] },
  { name: "Sophia", subjects: ["English", "History"] }
];

const allSubjects = students.flatMap(student => student.subjects);
console.log(allSubjects); 
// ["Math", "Physics", "Biology", "Chemistry", "English", "History"]
```

### Example 2: Compare with .map() (creates nested arrays)
```javascript
const students = [...];

// Using .map() - creates nested arrays
const nested = students.map(student => student.subjects);
console.log(nested); 
// [["Math", "Physics"], ["Biology", "Chemistry"], ...]

// Using .flatMap() - flattens automatically
const flat = students.flatMap(student => student.subjects);
console.log(flat); 
// ["Math", "Physics", "Biology", "Chemistry", ...]
```

---

## .flat()

**Purpose:** Flatten nested arrays.

**Returns:** New flattened array

**When to use:** When you have nested arrays and want to flatten them

### Example 1: Flatten one level
```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.flat();
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

### Example 2: Flatten deeply nested arrays
```javascript
const deeplyNested = [1, [2, [3, [4]]]];
const flat = deeplyNested.flat(3); // flatten 3 levels
console.log(flat); // [1, 2, 3, 4]
```

### Example 3: Alternative to .flatMap()
```javascript
const students = [...];

// Using .map() + .flat()
const allSubjects = students.map(s => s.subjects).flat();

// Same as .flatMap()
const allSubjects2 = students.flatMap(s => s.subjects);
```

---

## Set

**Purpose:** Store unique values (automatically removes duplicates).

**Returns:** Set object (convert to array with `[...set]` or `Array.from(set)`)

**When to use:** When you need to remove duplicates from an array

### Example 1: Remove duplicate numbers
```javascript
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4, 5]
```

### Example 2: Remove duplicate strings
```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana"];
const uniqueFruits = [...new Set(fruits)];
console.log(uniqueFruits); // ["apple", "banana", "orange"]
```

### Example 3: Get unique subjects from all students
```javascript
const students = [...];
const allSubjects = students.flatMap(s => s.subjects);
const uniqueSubjects = [...new Set(allSubjects)];
console.log(uniqueSubjects); // All unique subjects
```

---

## .forEach()

**Purpose:** Execute a function for each item (like a loop).

**Returns:** `undefined` (doesn't return anything useful)

**When to use:** When you want to do something for each item but don't need to transform or collect results

### Example 1: Console log each item
```javascript
const students = ["Emma", "Liam", "Sophia"];
students.forEach(name => {
  console.log(`Hello, ${name}!`);
});
// Logs:
// Hello, Emma!
// Hello, Liam!
// Hello, Sophia!
```

### Example 2: Update external state
```javascript
let total = 0;
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => {
  total += num;
});
console.log(total); // 15
```

**Note:** For most cases, prefer `.map()`, `.filter()`, or `.reduce()` over `.forEach()`!

---

## .slice()

**Purpose:** Copy a portion of an array.

**Returns:** New array with copied portion

**When to use:** When you need a subset or copy of an array

### Example 1: Copy first 3 items
```javascript
const numbers = [1, 2, 3, 4, 5];
const first3 = numbers.slice(0, 3);
console.log(first3); // [1, 2, 3]
```

### Example 2: Copy from index to end
```javascript
const numbers = [1, 2, 3, 4, 5];
const last3 = numbers.slice(-3);
console.log(last3); // [3, 4, 5]
```

### Example 3: Shallow copy entire array
```javascript
const original = [1, 2, 3];
const copy = original.slice();
// or: const copy = [...original];
```

---

## Array Chaining

You can chain multiple array methods together!

### Example 1: Filter then map
```javascript
const students = [
  { name: "Emma", grade: 92 },
  { name: "Liam", grade: 78 },
  { name: "Noah", grade: 95 }
];

const topStudentNames = students
  .filter(student => student.grade >= 90)
  .map(student => student.name);

console.log(topStudentNames); // ["Emma", "Noah"]
```

### Example 2: Filter, sort, map
```javascript
const students = [...];

const sortedActiveStudentNames = students
  .filter(s => s.isActive)
  .sort((a, b) => b.grade - a.grade)
  .map(s => s.name);
```

### Example 3: Complex chain (like your project!)
```javascript
const students = [...];
const searchTerm = "ma";

const result = students
  .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(s => s.grade >= 90)
  .filter(s => s.isActive)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(s => <StudentCard key={s.id} student={s} />);
```

---

## Quick Reference Table

| Method | Purpose | Returns | Mutates Original? |
|--------|---------|---------|-------------------|
| `.map()` | Transform items | New array (same length) | No |
| `.filter()` | Remove items | New array (shorter/same) | No |
| `.find()` | Find one item | Single item or `undefined` | No |
| `.some()` | Check if any match | Boolean | No |
| `.every()` | Check if all match | Boolean | No |
| `.includes()` | Check if contains value | Boolean | No |
| `.sort()` | Reorder items | Same array (sorted) | **Yes!** ⚠️ |
| `.reduce()` | Combine into one value | Single value | No |
| `.flatMap()` | Transform + flatten | New flat array | No |
| `.flat()` | Flatten arrays | New flat array | No |
| `.forEach()` | Loop through | `undefined` | No |
| `.slice()` | Copy portion | New array | No |

---

## Common Patterns You Used in Your Project

### Pattern 1: Search/filter by name
```javascript
const filtered = students.filter(student =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Pattern 2: Check if array property includes value
```javascript
const filtered = students.filter(student =>
  student.subjects.some(subject =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  )
);
```

### Pattern 3: Filter by exact subject
```javascript
const filtered = students.filter(student =>
  student.subjects.includes(selectedSubject)
);
```

### Pattern 4: Get unique values from nested arrays
```javascript
const allSubjects = students.flatMap(s => s.subjects);
const uniqueSubjects = [...new Set(allSubjects)];
```

### Pattern 5: Sort alphabetically
```javascript
const sorted = [...students].sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

### Pattern 6: Calculate average
```javascript
const total = students.reduce((sum, s) => sum + s.grade, 0);
const average = total / students.length;
```

---

## Tips for Success

1. **Read left to right:** `array.method()` means "take array and do method"
2. **Chain for clarity:** Break complex logic into multiple steps
3. **Console.log everything:** When confused, log the data at each step
4. **Avoid mutations:** Use `[...array]` before `.sort()` or other mutating methods
5. **Return values matter:** `.map()` and `.filter()` return new arrays; `.forEach()` returns nothing
6. **Check the docs:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) is your best friend!

---

## Practice Challenges

Try these to solidify your understanding:

### Challenge 1: Chain multiple filters
```javascript
// Get names of active students with grade >= 80 who take Math
const students = [...];
const result = // your code here
```

### Challenge 2: Group by grade letter
```javascript
// Group students into { A: [...], B: [...], C: [...], D: [...] }
const students = [...];
const grouped = // your code here (hint: use .reduce())
```

### Challenge 3: Find most common subject
```javascript
// Which subject is taken by the most students?
const students = [...];
const mostCommon = // your code here
```

---

## Congratulations! 🎉

You now have a reference guide for the most important array methods in JavaScript. Bookmark this and refer back to it whenever you need a refresher!

**Remember:** The best way to learn is by doing. Keep practicing with real projects like your student tracker! 🚀

