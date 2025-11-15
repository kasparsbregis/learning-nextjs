# Movie Catalog Project

## Project Overview

Build a movie catalog application where users can browse, search, filter, and view detailed information about movies. This project will help you practice:

- Dynamic routing with Next.js (`movies/[id]/page.tsx`)
- Filtering by genre, year, rating, and language
- Searching movies by title, director, or cast
- Sorting by rating, release year, or runtime
- Displaying movie details on individual pages
- Working with arrays (genres, cast, awards)
- Conditional rendering based on movie properties

---

## Data Structure

The `Movie` interface includes:

```typescript
interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string[]; // Multiple genres per movie
  releaseYear: number;
  rating: number; // 0-10 (like IMDb)
  director: string;
  cast: string[]; // Main actors
  runtime: number; // in minutes
  poster: string; // image URL
  isPopular: boolean; // featured/popular movies
  language: string;
  awards?: string[]; // Optional awards
}
```

The data file is located at: `data/movies.ts`

---

## Project Requirements

### 1. Main Movies Page (`app/movies/page.tsx`)

**Features to implement:**

<!-- - Display all movies in a grid or list layout -->
<!-- - **Search functionality**: Search by title, director, or cast member names -->

- **Genre filter**: Filter movies by genre (multiple genres can be selected)
- **Year filter**: Filter by release year (maybe a range or specific years)
- **Rating filter**: Filter movies by minimum rating (e.g., 7.0+, 8.0+)
- **Language filter**: Filter by language
- **Sort options**: Sort by:
  - Rating (highest to lowest)
  - Release year (newest to oldest, or oldest to newest)
  - Runtime (shortest to longest, or longest to shortest)
  - Title (A-Z, Z-A)
- **Popular movies toggle**: Option to show only popular movies
- Display movie count (e.g., "Showing 15 of 20 movies")
- Each movie card should link to its detail page

**Movie Card should show:**

- Poster image
- Title
- Release year
- Rating (display nicely, maybe with stars or just the number)
- Genres (comma-separated)
- Runtime
- "Popular" badge if `isPopular` is true

---

### 2. Single Movie Page (`app/movies/[id]/page.tsx`)

**Features to implement:**

- Display full movie details:
  - Large poster image
  - Title
  - Release year
  - Rating (with nice formatting)
  - Director
  - Cast list (all actors)
  - Genres
  - Runtime
  - Language
  - Full description
  - Awards (if available)
  - Popular badge (if applicable)
- Back button to return to movies list
- Handle case where movie ID doesn't exist (404 or error message)

---

## Suggested Components

You might want to create these reusable components:

- `components/movies/MovieCard.tsx` - Individual movie card for the list
- `components/movies/SearchInput.tsx` - Search input field
- `components/movies/GenreFilter.tsx` - Genre filter (checkboxes or multi-select)
- `components/movies/YearFilter.tsx` - Year range or dropdown
- `components/movies/RatingFilter.tsx` - Minimum rating selector
- `components/movies/LanguageFilter.tsx` - Language dropdown/checkboxes
- `components/movies/SortFilter.tsx` - Sort options dropdown
- `components/movies/PopularToggle.tsx` - Toggle for popular movies only

---

## Tips & Hints

1. **Genre filtering**: Since movies have multiple genres, a movie should appear if ANY of the selected genres match
2. **Search**: Make it case-insensitive and search across title, director, and all cast members
3. **Rating display**: You could show it as "8.5/10" or with star icons
4. **Runtime**: Convert minutes to hours and minutes (e.g., 148 minutes = "2h 28m")
5. **Year filtering**: Consider a range slider or separate min/max inputs
6. **State management**: Use `useState` for all filters, search, and sort options
7. **URL params**: You can use URL search params to persist filters (optional, more advanced)

---

## Stretch Goals (Optional)

- Add pagination (show 10-12 movies per page)
- Add "Watchlist" functionality (save movies to a list)
- Add movie recommendations (suggest similar movies based on genre)
- Add a "Random Movie" button
- Display movie statistics (average rating, most common genre, etc.)
- Add dark/light theme toggle
- Make it responsive for mobile devices

---

## Getting Started

1. Create the main movies page: `app/movies/page.tsx`
2. Create the single movie page: `app/movies/[id]/page.tsx`
3. Build components as needed
4. Import and use the `movies` array from `data/movies.ts`

Good luck! You've got this! 🎬

