# Complete Guide: Form Submission & API Calls in Next.js

This document explains everything about how form submissions work with API calls in your football player form.

---

## 📁 File Structure

```
app/
  ├── api/
  │   └── players/
  │       └── route.ts       # API endpoint (server-side)
  └── football/
      └── add/
          └── page.tsx        # Form component (client-side)
```

---

## Part 1: The Form Component (`app/football/add/page.tsx`)

### Line-by-Line Breakdown

#### **Lines 1-4: Imports**

```typescript
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
```

- **`"use client"`** - Tells Next.js this is a client component (runs in the browser)
- **`zodResolver`** - Connects Zod validation with React Hook Form
- **`useForm`** - Hook for form state management
- **`z`** - Zod for schema validation

#### **Lines 6-17: UI Component Imports**

```typescript
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, ... } from "@/components/ui/form";
```

- These are your UI components (shadcn/ui)

---

### **Lines 19-33: Form Schema (Validation Rules)**

```typescript
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.string().min(1, {
    message: "Age is required.",
  }),
  team: z.string().min(2, {
    message: "Team must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  isActive: z.boolean(),
});
```

**What this does:**

- **`z.object({...})`** - Defines the shape of your form data
- Each field has validation rules:
  - `name`: Must be a string, at least 2 characters
  - `age`: Must be a string (we'll convert to number later), at least 1 char
  - `team`: Must be a string, at least 2 characters
  - `position`: Must be a string, at least 2 characters
  - `isActive`: Must be a boolean (true or false)

**Why validation matters:**

- Catches errors before sending to the server
- Better user experience (immediate feedback)

---

### **Lines 37-46: Initialize the Form**

```typescript
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    age: "",
    team: "",
    position: "",
    isActive: false,
  },
});
```

**What this does:**

- **`useForm`** - Creates form object with methods like `handleSubmit`, `control`, `reset`
- **`<z.infer<typeof formSchema>>`** - TypeScript infers types from your schema
- **`resolver: zodResolver(formSchema)`** - Connect validation to form
- **`defaultValues`** - Initial values when form loads

---

### **Lines 49-75: The Submit Handler (THE IMPORTANT PART!)**

```typescript
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        age: parseInt(values.age),
        team: values.team.split(",").map((t) => t.trim()),
        position: values.position,
        isActive: values.isActive,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Player added:", data);
      form.reset();
    } else {
      console.error("Failed to add player");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}
```

#### **Line 49: `async function onSubmit`**

- **`async`** - Allows use of `await` (waits for API response)
- **`values`** - Form data passed from React Hook Form
- Gets data after validation passes

#### **Line 51: `const response = await fetch("/api/players", {...})`**

**THIS IS THE CORE API CALL!**

- **`fetch()`** - Built-in browser API for HTTP requests
- **`"/api/players"`** - The URL (Next.js automatically creates this from `app/api/players/route.ts`)
- **`await`** - Waits for server response before continuing

#### **Line 52-55: Request Configuration**

```typescript
method: "POST",           // HTTP method (GET, POST, PUT, DELETE)
headers: {                // Extra metadata
  "Content-Type": "application/json",
},
```

#### **Lines 56-62: Request Body (The Data You're Sending)**

```typescript
body: JSON.stringify({
  name: values.name,
  age: parseInt(values.age),          // Convert string to number
  team: values.team.split(",").map((t) => t.trim()),  // Convert to array
  position: values.position,
  isActive: values.isActive,
}),
```

- **`JSON.stringify()`** - Converts JavaScript object to JSON string
- **`parseInt(values.age)`** - Convert "25" → 25
- **`split(",").map((t) => t.trim())`** - "Team1, Team2" → ["Team1", "Team2"]

#### **Lines 65-71: Handle Response**

```typescript
if (response.ok) {
  // Check if request succeeded (200-299)
  const data = await response.json(); // Parse JSON response
  console.log("Player added:", data);
  form.reset(); // Clear form fields
} else {
  console.error("Failed to add player");
}
```

- **`response.ok`** - Boolean, true if status is 200-299
- **`await response.json()`** - Parses JSON from server
- **`form.reset()`** - Clears all form fields after success

#### **Lines 72-74: Error Handling**

```typescript
catch (error) {
  console.error("Error submitting form:", error);
}
```

- Catches network errors, server errors, etc.

---

### **Lines 122-158: Radio Button Integration**

```typescript
<FormField
  control={form.control}
  name="isActive"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Is player Active?</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => field.onChange(value === "active")}
          value={field.value ? "active" : "inactive"}
        >
```

**Key parts:**

- **`control={form.control}`** - Connects to form state
- **`onValueChange={(value) => field.onChange(value === "active")}`**
  - Converts "active" → `true`, "inactive" → `false`
- **`value={field.value ? "active" : "inactive"}`**
  - Converts `true` → "active", `false` → "inactive" (for display)

---

## Part 2: The API Route (`app/api/players/route.ts`)

### **Lines 1-2: Imports**

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
```

- **`NextResponse`** - Next.js helper for API responses
- **`prisma`** - Database client

### **Lines 4-17: GET Handler (Fetch All Players)**

```typescript
export async function GET() {
  try {
    const players = await prisma.players.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
```

- Runs when you send GET request to `/api/players`
- Fetches all players from database
- Returns JSON response

### **Lines 19-42: POST Handler (Create New Player)**

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, team, position, isActive } = body;

    const newPlayer = await prisma.players.create({
      data: {
        name,
        age,
        team,
        position,
        isActive,
      },
    });

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}
```

#### **Line 21: `const body = await request.json()`**

- Extracts JSON from request body
- This is what you sent from the form!

#### **Line 22: Destructure data**

```typescript
const { name, age, team, position, isActive } = body;
```

- Destructure for cleaner code

#### **Lines 24-32: Create in Database**

```typescript
const newPlayer = await prisma.players.create({
  data: {
    name,
    age,
    team,
    position,
    isActive,
  },
});
```

- **`prisma.players.create()`** - Inserts new row into database
- **`await`** - Waits for database to finish
- Returns the newly created player

#### **Line 34: Return Response**

```typescript
return NextResponse.json(newPlayer, { status: 201 });
```

- **`201`** - HTTP status code for "Created"
- Sends back the created player data

---

## 🔄 The Complete Flow

```
1. User fills form → 2. Clicks "Add Player"
   ↓
3. Form validates (Zod) → 4. onSubmit runs
   ↓
5. fetch() sends POST to "/api/players"
   ↓
6. Next.js routes to app/api/players/route.ts
   ↓
7. POST handler extracts data → 8. Saves to database
   ↓
9. Returns new player → 10. Form receives response
   ↓
11. Form resets (success!) or shows error
```

---

## ❓ "Is it good practice to write fetch inside the form file?"

### **Short Answer: For simple cases, YES. For complex apps, consider alternatives.**

### **✅ When it's OK to write fetch inside the component:**

1. **Simple forms** (like yours)
2. **Few API calls** in the app
3. **Quick prototypes**
4. **One-off operations**

**Advantages:**

- ✅ Simple and straightforward
- ✅ Easy to understand
- ✅ No extra abstraction layers
- ✅ Works great for learning

### **⚠️ When to consider alternatives:**

As your app grows, you might want:

1. **Separate API service files**

   ```typescript
   // lib/api/players.ts
   export async function createPlayer(data) {
     return fetch("/api/players", {...})
   }

   // Then in your component
   import { createPlayer } from "@/lib/api/players";
   ```

2. **React Query / SWR** (for complex state management)

   ```typescript
   import { useMutation } from "@tanstack/react-query";

   const { mutate } = useMutation({
     mutationFn: (data) => fetch("/api/players", ...)
   });
   ```

3. **Server Actions** (Next.js 13+ feature)
   ```typescript
   // app/actions.ts
   "use server";
   export async function createPlayer(data) {
     // Runs on server, no fetch needed!
   }
   ```

### **Recommendation for your current project:**

**Keep the fetch in the form!** Here's why:

1. ✅ You're learning - simpler is better
2. ✅ Your form is straightforward
3. ✅ You only have one API call here
4. ✅ It's easy to understand and debug

**When to refactor:**

- When you have 5+ different API calls
- When you need to reuse the same call in multiple places
- When you need advanced features (caching, retries, etc.)

---

## 📚 Key Concepts Recap

### **1. Client vs Server**

- **Client Component** (`"use client"`) - Runs in browser
- **API Route** (`route.ts`) - Runs on server

### **2. async/await**

- Makes asynchronous code readable
- Wait for promises without callbacks

### **3. JSON.stringify / JSON.parse**

- **`JSON.stringify()`** - JavaScript object → JSON string (for sending)
- **`JSON.parse()`** - JSON string → JavaScript object (for receiving)

### **4. HTTP Methods**

- **GET** - Fetch data
- **POST** - Create new data
- **PUT** - Update existing data
- **DELETE** - Remove data

### **5. HTTP Status Codes**

- **200** - OK (success)
- **201** - Created (new resource)
- **400** - Bad Request (invalid data)
- **500** - Server Error

---

## 🎯 Summary

Your current approach with fetch inside the form component is **perfectly fine** for what you're building. It's a clean, simple solution that's easy to understand and maintain. As you build more complex applications, you can explore alternatives like React Query or server actions.

**Remember:** Don't over-engineer. Start simple, optimize when needed!
