# Prisma & API Calls Guide - Step by Step

## Overview

This guide will teach you how to:

1. Create a new table using Prisma
2. Write API routes to add records (POST)
3. Write API routes to get records (GET)
4. Display data from the database in your Next.js app

---

## Prerequisites

✅ You already have:

- Prisma installed and configured
- Neon PostgreSQL database connected
- Prisma client set up in `lib/prisma.ts`
- Basic understanding of Next.js API routes

---

## Part 1: Creating a New Table with Prisma

### Step 1: Define Your Model in `prisma/schema.prisma`

Let's create a new model for **Movies** (since you're working with movies):

```prisma
model Movie {
  id          Int      @id @default(autoincrement())
  title       String
  description String   @db.Text  // Use @db.Text for longer text
  genre       String[]
  releaseYear Int
  rating      Float    // For decimal ratings like 8.5
  director    String
  cast        String[]
  runtime     Int      // in minutes
  poster      String   // image URL
  isPopular   Boolean  @default(false)
  language    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Key Prisma Field Types:**

- `String` - Text up to 255 characters
- `String @db.Text` - Longer text (for descriptions)
- `Int` - Whole numbers
- `Float` - Decimal numbers
- `Boolean` - true/false
- `String[]` - Array of strings
- `DateTime` - Date and time
- `@id @default(autoincrement())` - Auto-incrementing primary key
- `@default(now())` - Sets current timestamp on creation
- `@updatedAt` - Automatically updates on record modification

### Step 2: Create and Run Migration

After adding your model to `schema.prisma`:

```bash
# Generate Prisma Client and create migration
npx prisma migrate dev --name add_movie_table

# This will:
# 1. Create a migration file
# 2. Apply it to your database
# 3. Regenerate Prisma Client
```

**What happens:**

- Prisma creates a SQL migration file in `prisma/migrations/`
- The migration is applied to your Neon database
- Your Prisma Client is updated with the new `Movie` model

### Step 3: Verify in Prisma Studio (Optional)

```bash
npx prisma studio
```

This opens a visual database browser where you can see your tables and data.

---

## Part 2: Creating API Routes

### Understanding Next.js API Routes

In Next.js, API routes are created in the `app/api` folder:

- `app/api/movies/route.ts` → Handles `/api/movies`
- `app/api/movies/[id]/route.ts` → Handles `/api/movies/123` (dynamic)

### API Route Structure

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch data
export async function GET() {
  // Your code here
}

// POST - Create new record
export async function POST(request: Request) {
  // Your code here
}

// PUT - Update record
export async function PUT(request: Request) {
  // Your code here
}

// DELETE - Delete record
export async function DELETE(request: Request) {
  // Your code here
}
```

---

## Part 3: Writing GET API (Fetch Data)

### Example: Get All Movies

Create `app/api/movies/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all movies from database
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
```

### Common Prisma Query Methods:

```typescript
// Get all records
prisma.movie.findMany();

// Get one record by ID
prisma.movie.findUnique({ where: { id: 1 } });

// Get records with conditions
prisma.movie.findMany({
  where: {
    isPopular: true,
    rating: { gte: 8.0 }, // greater than or equal
  },
  orderBy: { rating: "desc" },
  take: 10, // limit to 10 results
});

// Count records
prisma.movie.count({ where: { isPopular: true } });
```

### Example: Get Single Movie by ID

Create `app/api/movies/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
}
```

---

## Part 4: Writing POST API (Add Data)

### Example: Create New Movie

In `app/api/movies/route.ts`, add the POST function:

```typescript
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      title,
      description,
      genre,
      releaseYear,
      rating,
      director,
      cast,
      runtime,
      poster,
      isPopular,
      language,
    } = body;

    // Validate required fields (optional but recommended)
    if (!title || !description || !director) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new movie in database
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        genre: genre || [],
        releaseYear: parseInt(releaseYear),
        rating: parseFloat(rating),
        director,
        cast: cast || [],
        runtime: parseInt(runtime),
        poster,
        isPopular: isPopular || false,
        language,
      },
    });

    // Return the created movie
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
```

**Key Points:**

- `request.json()` - Parses JSON from request body
- `prisma.movie.create()` - Inserts new record
- Always use try/catch for error handling
- Return appropriate HTTP status codes (201 for created, 400 for bad request, 500 for server error)

---

## Part 5: Fetching Data in Your Components

### Option 1: Server Component (Recommended for Next.js)

```typescript
// app/movies-from-db/page.tsx
async function MoviesFromDB() {
  // Fetch directly in server component
  const response = await fetch("http://localhost:3000/api/movies", {
    cache: "no-store", // Always fetch fresh data
  });

  if (!response.ok) {
    return <div>Failed to load movies</div>;
  }

  const movies = await response.json();

  return (
    <div>
      <h1>Movies from Database</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Option 2: Client Component with useEffect

```typescript
"use client";

import { useEffect, useState } from "react";

export default function MoviesFromDB() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Movies from Database</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Option 3: Using Prisma Directly in Server Components (Best Performance)

```typescript
// app/movies-from-db/page.tsx
import { prisma } from "@/lib/prisma";

async function MoviesFromDB() {
  // Query database directly (no API call needed!)
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Movies from Database</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
}
```

**When to use each:**

- **Server Component with Prisma**: Best for initial page load, SEO-friendly
- **API Route + Client Component**: Best for dynamic updates, user interactions
- **API Route + Server Component**: Good for reusability, but adds extra network call

---

## Part 6: Common Prisma Operations

### Update a Record

```typescript
// PUT /api/movies/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const id = parseInt(params.id);

  const updatedMovie = await prisma.movie.update({
    where: { id },
    data: {
      title: body.title,
      rating: body.rating,
      // Only update fields that are provided
    },
  });

  return NextResponse.json(updatedMovie);
}
```

### Delete a Record

```typescript
// DELETE /api/movies/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  await prisma.movie.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Movie deleted" });
}
```

### Advanced Queries

```typescript
// Filter and sort
const movies = await prisma.movie.findMany({
  where: {
    isPopular: true,
    rating: { gte: 8.0 },
    releaseYear: { gte: 2020 },
    genre: { has: "Action" }, // Array contains
  },
  orderBy: [{ rating: "desc" }, { releaseYear: "desc" }],
  take: 10, // Limit results
  skip: 0, // Pagination offset
});

// Include related data (if you have relations)
const movie = await prisma.movie.findUnique({
  where: { id: 1 },
  include: {
    reviews: true, // If you have a Review model
  },
});
```

---

## Part 7: Error Handling Best Practices

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Database operation
    const movie = await prisma.movie.create({
      data: body,
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    // Handle Prisma errors
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Quick Reference: HTTP Status Codes

- `200` - OK (successful GET, PUT)
- `201` - Created (successful POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (database/server errors)

---

## Next Steps

1. ✅ Create your Movie model in `schema.prisma`
2. ✅ Run migration: `npx prisma migrate dev --name add_movie_table`
3. ✅ Create API routes for GET and POST
4. ✅ Test with Postman or your frontend
5. ✅ Create a page to display movies from database

---

## Troubleshooting

**"Prisma Client not generated"**

```bash
npx prisma generate
```

**"Migration failed"**

- Check your `DATABASE_URL` in `.env`
- Make sure Neon database is running
- Check migration files for errors

**"Cannot find module @prisma/client"**

```bash
npm install @prisma/client
npx prisma generate
```

---

Good luck! 🚀
