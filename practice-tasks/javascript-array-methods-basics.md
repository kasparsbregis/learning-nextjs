# JavaScript Array Methods - Step by Step Learning

## Setup

Create a simple file: `practice/array-methods-practice.js` (or just use the browser console)

Import your movies data:

```javascript
import { movies } from "./data/movies.js";
// Or in console, just copy the movies array
```

---

## TASK 1: Understanding `.filter()` - The Basics

**Goal:** Filter movies by a simple condition

### Task 1.1: Filter movies from 2010

```javascript
// Write ONE line that filters movies released in 2010
const movies2010 = movies.filter(???);
console.log(movies2010);
```

**Hint:** `movie.releaseYear === 2010`

---

### Task 1.2: Filter movies with rating above 8.5

```javascript
// Write ONE line that filters movies with rating > 8.5
const highRatedMovies = movies.filter(???);
console.log(highRatedMovies);
```

---

### Task 1.3: Filter popular movies

```javascript
// Write ONE line that filters movies where isPopular is true
const popularMovies = movies.filter(???);
console.log(popularMovies);
```

---

### Task 1.4: Filter movies in English

```javascript
// Write ONE line that filters movies where language is "English"
const englishMovies = movies.filter(???);
console.log(englishMovies);
```

---

## TASK 2: Understanding `.map()` - Transform Data

**Goal:** Transform each movie into something else

### Task 2.1: Get only movie titles

```javascript
// Write ONE line that creates an array of just movie titles
const titles = movies.map(???);
console.log(titles);
```

**Hint:** `movie => movie.title`

---

### Task 2.2: Get only ratings

```javascript
// Write ONE line that creates an array of just ratings
const ratings = movies.map(???);
console.log(ratings);
```

---

### Task 2.3: Get title and year together

```javascript
// Write ONE line that creates an array like: ["Inception (2010)", "The Dark Knight (2008)", ...]
const titleYear = movies.map(???);
console.log(titleYear);
```

**Hint:** Use template literals: `` `${movie.title} (${movie.releaseYear})` ``

---

### Task 2.4: Get movie info as objects

```javascript
// Write ONE line that creates objects with only title and rating
const simpleMovies = movies.map(???);
console.log(simpleMovies);
// Should output: [{title: "Inception", rating: 8.8}, ...]
```

**Hint:** `movie => ({ title: movie.title, rating: movie.rating })`

---

## TASK 3: Understanding `.find()` - Find One Item

**Goal:** Find a single movie that matches a condition

### Task 3.1: Find movie with title "Inception"

```javascript
// Write ONE line that finds the movie with title "Inception"
const inception = movies.find(???);
console.log(inception);
```

---

### Task 3.2: Find first movie with rating 9.0

```javascript
// Write ONE line that finds the first movie with rating exactly 9.0
const perfectMovie = movies.find(???);
console.log(perfectMovie);
```

---

### Task 3.3: Find movie directed by Christopher Nolan

```javascript
// Write ONE line that finds a movie directed by "Christopher Nolan"
const nolanMovie = movies.find(???);
console.log(nolanMovie);
```

---

## TASK 4: Understanding `.some()` and `.every()` - Check Conditions

**Goal:** Check if ANY or ALL movies match a condition

### Task 4.1: Check if ANY movie has rating 10

```javascript
// Write ONE line that checks if any movie has rating 10
const hasPerfect = movies.some(???);
console.log(hasPerfect); // Should be false
```

---

### Task 4.2: Check if ALL movies are in English

```javascript
// Write ONE line that checks if all movies are in English
const allEnglish = movies.every(???);
console.log(allEnglish); // Should be false
```

---

### Task 4.3: Check if ANY movie is from 2023

```javascript
// Write ONE line that checks if any movie is from 2023
const has2023 = movies.some(???);
console.log(has2023);
```

---

## TASK 5: Understanding `.sort()` - Order Arrays

**Goal:** Sort movies in different ways

### Task 5.1: Sort movies by release year (oldest first)

```javascript
// Write ONE line that sorts movies by releaseYear (ascending)
const sortedByYear = movies.sort(???);
console.log(sortedByYear);
```

**Hint:** `(a, b) => a.releaseYear - b.releaseYear`

---

### Task 5.2: Sort movies by rating (highest first)

```javascript
// Write ONE line that sorts movies by rating (descending)
const sortedByRating = movies.sort(???);
console.log(sortedByRating);
```

**Hint:** `(a, b) => b.rating - a.rating`

---

### Task 5.3: Sort movies by title (A-Z)

```javascript
// Write ONE line that sorts movies alphabetically by title
const sortedByTitle = movies.sort(???);
console.log(sortedByTitle);
```

**Hint:** `(a, b) => a.title.localeCompare(b.title)`

---

## TASK 6: Understanding `.reduce()` - Accumulate Values

**Goal:** Calculate totals and combine values

### Task 6.1: Calculate total runtime of all movies

```javascript
// Write ONE line that adds up all movie runtimes
const totalRuntime = movies.reduce(???);
console.log(totalRuntime);
```

**Hint:** `(total, movie) => total + movie.runtime` (start with 0)

---

### Task 6.2: Calculate average rating

```javascript
// Write ONE line that calculates average rating
const avgRating = movies.reduce(???) / movies.length;
console.log(avgRating);
```

---

### Task 6.3: Count movies by language

```javascript
// Write ONE line that creates an object counting movies per language
// Result: {English: 18, Korean: 1, Japanese: 1}
const languageCount = movies.reduce(???, {});
console.log(languageCount);
```

**Hint:**

```javascript
(acc, movie) => {
  acc[movie.language] = (acc[movie.language] || 0) + 1;
  return acc;
};
```

---

## TASK 7: Understanding `.includes()` - Check Membership

**Goal:** Check if arrays contain values

### Task 7.1: Find movies with "Action" genre

```javascript
// Write ONE line that filters movies that have "Action" in their genre array
const actionMovies = movies.filter(???);
console.log(actionMovies);
```

**Hint:** `movie.genre.includes("Action")`

---

### Task 7.2: Find movies with Leonardo DiCaprio

```javascript
// Write ONE line that filters movies where cast includes "Leonardo DiCaprio"
const dicaprioMovies = movies.filter(???);
console.log(dicaprioMovies);
```

---

## TASK 8: Combining Methods - Chain Them Together

**Goal:** Use multiple methods in sequence

### Task 8.1: Get titles of high-rated movies

```javascript
// Write ONE line that: filters movies with rating > 8.5, then gets their titles
const highRatedTitles = movies.filter(???).map(???);
console.log(highRatedTitles);
```

---

### Task 8.2: Get average rating of popular movies

```javascript
// Write ONE line that: filters popular movies, gets their ratings, calculates average
const avgPopularRating = movies.filter(???).reduce(???) / movies.filter(???).length;
console.log(avgPopularRating);
```

---

### Task 8.3: Get sorted titles of English movies

```javascript
// Write ONE line that: filters English movies, gets titles, sorts them
const sortedEnglishTitles = movies.filter(???).map(???).sort(???);
console.log(sortedEnglishTitles);
```

---

## TASK 9: Understanding `.flatMap()` - Flatten and Map

**Goal:** Map and flatten arrays in one step

### Task 9.1: Get all unique genres

```javascript
// Step 1: Get all genres (will be nested arrays)
const allGenres = movies.map(movie => movie.genre);
console.log(allGenres); // [[...], [...], ...]

// Step 2: Flatten the array
const flatGenres = allGenres.flat();
console.log(flatGenres); // ["Sci-Fi", "Action", ...]

// Step 3: Do it in ONE line with flatMap
const allGenresOneLine = movies.flatMap(???);
console.log(allGenresOneLine);

// Step 4: Get unique genres only (bonus)
const uniqueGenres = [...new Set(allGenresOneLine)];
console.log(uniqueGenres);
```

---

### Task 9.2: Get all cast members

```javascript
// Write ONE line that gets all cast members from all movies (flattened)
const allCast = movies.flatMap(???);
console.log(allCast);
```

---

## TASK 10: Understanding `.forEach()` - Loop Through

**Goal:** Execute code for each item (no return value)

### Task 10.1: Log each movie title

```javascript
// Write ONE line that logs each movie title
movies.forEach(???);
```

**Hint:** `movie => console.log(movie.title)`

---

### Task 10.2: Count movies per decade

```javascript
// Write code that counts movies per decade (2010s, 2020s, etc.)
const decadeCount = {};
movies.forEach((movie) => {
  const decade = Math.floor(movie.releaseYear / 10) * 10;
  decadeCount[decade] = (decadeCount[decade] || 0) + 1;
});
console.log(decadeCount);
```

---

## TASK 11: Understanding `.slice()` - Get Portion of Array

**Goal:** Get a subset of the array

### Task 11.1: Get first 5 movies

```javascript
// Write ONE line that gets the first 5 movies
const firstFive = movies.???;
console.log(firstFive);
```

---

### Task 11.2: Get last 3 movies

```javascript
// Write ONE line that gets the last 3 movies
const lastThree = movies.???;
console.log(lastThree);
```

---

## TASK 12: Understanding `.indexOf()` and `.findIndex()` - Find Position

**Goal:** Find the index/position of items

### Task 12.1: Find index of "Inception"

```javascript
// Write ONE line that finds the index of the movie "Inception"
const inceptionIndex = movies.findIndex(???);
console.log(inceptionIndex);
```

---

## TASK 13: Real-World Practice - Build a Search Function

### Task 13.1: Search movies by title

```javascript
// Write a function that searches movies by title (case-insensitive)
function searchMovies(searchTerm) {
  return movies.filter(???);
}

console.log(searchMovies("dark"));
console.log(searchMovies("INCEPTION"));
```

**Hint:** Use `.toLowerCase()` on both title and searchTerm

---

### Task 13.2: Filter by multiple criteria

```javascript
// Write a function that filters by genre AND minimum rating
function filterMovies(genre, minRating) {
  return movies.filter(???);
}

console.log(filterMovies("Action", 8.0));
```

**Hint:** Check both conditions: `movie.genre.includes(genre) && movie.rating >= minRating`

---

## How to Practice

1. **Start with Task 1.1** - Don't move on until you understand it
2. **Use console.log()** - Always log the result to see what you got
3. **If stuck:** Look at the hint, but try to understand WHY it works
4. **Test your understanding:** After completing a task, explain it to yourself in plain English

## Key Concepts to Remember

- **`.filter()`** - Returns NEW array with items that match condition
- **`.map()`** - Returns NEW array with transformed items
- **`.find()`** - Returns FIRST item that matches (or undefined)
- **`.some()`** - Returns true if ANY item matches
- **`.every()`** - Returns true if ALL items match
- **`.sort()`** - Sorts array in place (modifies original)
- **`.reduce()`** - Accumulates/combines all items into one value
- **`.flatMap()`** - Maps then flattens arrays
- **`.forEach()`** - Loops through items (no return value)

Good luck! Take it one task at a time. 🚀
