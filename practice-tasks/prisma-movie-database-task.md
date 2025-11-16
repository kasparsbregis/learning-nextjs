# Prisma & API Calls Task: Movie Database

## Task Overview

You will create a complete movie database system using Prisma and Next.js API routes. This will involve:
1. Creating a Movie table in your database
2. Building API routes to add and fetch movies
3. Creating a page to display movies from the database
4. Creating a form to add new movies

---

## Part 1: Database Setup (30 minutes)

### Task 1.1: Create Movie Model

1. Open `prisma/schema.prisma`
2. Add a new `Movie` model with the following fields:
   - `id` - Auto-incrementing integer (primary key)
   - `title` - String (required)
   - `description` - Text (required, use `@db.Text`)
   - `genre` - Array of strings (String[])
   - `releaseYear` - Integer (required)
   - `rating` - Float (required, 0-10)
   - `director` - String (required)
   - `cast` - Array of strings (String[])
   - `runtime` - Integer (required, in minutes)
   - `poster` - String (required, image URL)
   - `isPopular` - Boolean (default: false)
   - `language` - String (required)
   - `createdAt` - DateTime (auto-set on creation)
   - `updatedAt` - DateTime (auto-update on modification)

### Task 1.2: Run Migration

```bash
npx prisma migrate dev --name add_movie_table
```

**Checkpoint:** Verify the migration was successful by running `npx prisma studio` and checking if the `Movie` table exists.

---

## Part 2: API Routes (45 minutes)

### Task 2.1: Create GET API Route

Create `app/api/movies/route.ts` with:

**Requirements:**
- GET function that fetches all movies
- Order by `createdAt` descending (newest first)
- Include error handling
- Return appropriate status codes

**Bonus:** Add query parameters support:
- `?popular=true` - Filter only popular movies
- `?minRating=8` - Filter movies with rating >= minRating
- `?limit=10` - Limit number of results

### Task 2.2: Create POST API Route

In the same `app/api/movies/route.ts` file, add:

**Requirements:**
- POST function that creates a new movie
- Validate required fields (title, description, director, releaseYear, rating, runtime, poster, language)
- Return the created movie with status 201
- Include proper error handling

**Validation Rules:**
- `title` - Required, minimum 1 character
- `description` - Required, minimum 10 characters
- `releaseYear` - Required, must be between 1900 and current year
- `rating` - Required, must be between 0 and 10
- `runtime` - Required, must be positive number

### Task 2.3: Create GET Single Movie API Route

Create `app/api/movies/[id]/route.ts`:

**Requirements:**
- GET function that fetches a single movie by ID
- Return 404 if movie not found
- Include error handling

---

## Part 3: Frontend - Display Movies (30 minutes)

### Task 3.1: Create Movies from DB Page

Create `app/movies-from-db/page.tsx`:

**Requirements:**
- Use Server Component (async function)
- Fetch movies using Prisma directly (not API route)
- Display movies in a grid layout (similar to your existing movies page)
- Show: poster, title, release year, rating, genres
- Each movie card should link to `/movies-from-db/[id]`

**Styling:**
- Use your existing MovieComponent styling as reference
- Make it responsive
- Add loading state (optional)

### Task 3.2: Create Single Movie Detail Page

Create `app/movies-from-db/[id]/page.tsx`:

**Requirements:**
- Fetch single movie using Prisma directly
- Display all movie information:
  - Large poster image
  - Title and release year
  - Rating
  - Director
  - Cast list
  - Genres
  - Runtime (convert to hours/minutes)
  - Language
  - Description
  - Popular badge (if applicable)
- Add "Back" button to return to movies list
- Handle 404 case (movie not found)

---

## Part 4: Add Movie Form (45 minutes)

### Task 4.1: Create Add Movie Page

Create `app/movies-from-db/add/page.tsx`:

**Requirements:**
- Client Component with form
- Form fields:
  - Title (text input, required)
  - Description (textarea, required)
  - Genre (multi-select or checkboxes, at least one required)
  - Release Year (number input, required)
  - Rating (number input, 0-10, required)
  - Director (text input, required)
  - Cast (text input with comma separation, or multiple inputs)
  - Runtime (number input in minutes, required)
  - Poster URL (text input, required)
  - Language (text input, required)
  - Is Popular (checkbox)
- Form validation (client-side)
- Submit button that calls POST API route
- Show success/error messages
- Redirect to movies list after successful submission

**Form Handling:**
- Use `useState` for form state
- Use `fetch` to POST to `/api/movies`
- Handle loading state
- Display validation errors

**Example Structure:**
```typescript
"use client";

export default function AddMovie() {
  const [formData, setFormData] = useState({...});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your code here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

---

## Part 5: Testing & Data Population (20 minutes)

### Task 5.1: Test Your API Routes

Use one of these methods:

**Option A: Using Browser/Postman**
- Test GET: Visit `http://localhost:3000/api/movies`
- Test POST: Use Postman or fetch from browser console

**Option B: Create Test Script**
Create `scripts/test-api.ts`:
```typescript
// Test POST
const response = await fetch("http://localhost:3000/api/movies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Test Movie",
    description: "This is a test movie",
    // ... other fields
  }),
});
```

### Task 5.2: Add Sample Data

Add at least 5 movies to your database using:
1. The form you created
2. Or directly via Prisma Studio (`npx prisma studio`)
3. Or via API calls

**Sample Movie Data:**
- Use movies from your existing `data/movies.ts` file
- Or create your own test data

---

## Part 6: Bonus Challenges (Optional)

### Bonus 1: Update Movie API
- Create PUT route at `app/api/movies/[id]/route.ts`
- Create edit page at `app/movies-from-db/[id]/edit/page.tsx`
- Allow users to update movie information

### Bonus 2: Delete Movie API
- Create DELETE route at `app/api/movies/[id]/route.ts`
- Add delete button on movie detail page
- Add confirmation dialog before deleting

### Bonus 3: Search & Filter
- Add search functionality to movies list page
- Filter by genre, rating, year
- Use API routes with query parameters

### Bonus 4: Pagination
- Implement pagination for movies list
- Use `skip` and `take` in Prisma queries
- Add "Load More" or page numbers

### Bonus 5: Image Upload
- Instead of poster URL, allow image file upload
- Store images in `public/movie-posters/`
- Save file path in database

---

## Success Criteria

✅ Movie model created and migrated  
✅ GET `/api/movies` returns all movies  
✅ POST `/api/movies` creates new movie  
✅ GET `/api/movies/[id]` returns single movie  
✅ Movies list page displays all movies from database  
✅ Single movie page shows all movie details  
✅ Add movie form successfully creates new movies  
✅ At least 5 movies in database  
✅ All pages are responsive  
✅ Error handling works correctly  

---

## Tips

1. **Start Small**: Complete Part 1 and 2 first, test with Postman/browser
2. **Use Existing Code**: Reference your `app/api/players/route.ts` for structure
3. **Test Incrementally**: Test each API route as you create it
4. **Error Handling**: Always wrap database calls in try/catch
5. **Validation**: Validate data on both client and server side
6. **TypeScript**: Use proper types for your API responses

---

## Getting Help

If you get stuck:
1. Check the guide: `practice-tasks/prisma-api-calls-guide.md`
2. Review your existing `app/api/players/route.ts` for reference
3. Check Prisma docs: https://www.prisma.io/docs
4. Check Next.js API routes docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## Submission Checklist

Before considering the task complete:

- [ ] Movie model in `schema.prisma`
- [ ] Migration run successfully
- [ ] GET `/api/movies` works
- [ ] POST `/api/movies` works
- [ ] GET `/api/movies/[id]` works
- [ ] Movies list page displays data
- [ ] Single movie page displays data
- [ ] Add movie form works
- [ ] At least 5 movies in database
- [ ] No console errors
- [ ] Responsive design works

---

Good luck! You've got this! 🎬🚀

