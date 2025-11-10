# GET Request Explained: `app/football/page.tsx`

This document explains how the GET request works to fetch all players from the database.

---

## 📄 File: `app/football/page.tsx`

This file displays a list of all football players by making a GET request to the API.

---

## 🔑 Key Concepts

### Client Component

```typescript
"use client";
```

- **What it means:** This component runs in the browser (client-side)
- **Why needed:** Because we're using `useState` and `useEffect` (React hooks that only work in the browser)
- **Alternative:** Could be a server component, but then we'd fetch data differently

---

## 📋 Line-by-Line Breakdown

### **Lines 1-4: Imports**

```typescript
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
```

- **`"use client"`** - Marks this as a client component
- **`Button`** - UI component for the "Add Player" button
- **`Link`** - Next.js component for navigation
- **`useEffect, useState`** - React hooks for managing state and side effects

---

### **Lines 6-14: TypeScript Interface**

```typescript
interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string[];
  isActive: boolean;
  createdAt: string;
}
```

**What this does:**

- Defines the structure of a player object
- Ensures type safety - TypeScript knows exactly what data to expect
- Prevents errors when accessing properties

**Why `team: string[]`?**

- Players can belong to multiple teams
- The database stores this as an array: `["Team1", "Team2"]`

---

### **Lines 16-18: Component Setup**

```typescript
const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
```

**Line 17: `useState<Player[]>([])`**

- **Purpose:** Stores the list of players
- **Type:** `Player[]` (array of Player objects)
- **Initial:** Empty array `[]`
- **Updater function:** `setPlayers(data)` - updates the state

**Line 18: `useState(true)`**

- **Purpose:** Tracks loading state
- **Initial:** `true` (we start loading)
- **Why:** Shows "Loading..." while fetching data

---

### **Lines 20-46: useEffect Hook**

```typescript
useEffect(() => {
  const getPlayers = async () => {
    try {
      const response = await fetch("/api/players", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Players:", data);
        setPlayers(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch players");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching players", error);
      setLoading(false);
    }
  };

  getPlayers();
}, []);
```

#### **What is useEffect?**

- **Runs after the component renders**
- **Empty dependency array `[]`** = runs only ONCE when component mounts
- Perfect for fetching data on page load

#### **Line 21: `const getPlayers = async () => {`**

- Async function to fetch data
- Defined inside useEffect (local function)

#### **Line 23: `const response = await fetch("/api/players", {...})`**

**THE GET REQUEST HAPPENS HERE!**

- **`fetch()`** - Browser API for HTTP requests
- **`"/api/players"`** - The endpoint URL
- **`method: "GET"`** - HTTP method to fetch data (read operation)
- **`await`** - Waits for server response

**What happens:**

1. Browser sends GET request to server
2. Server processes request at `app/api/players/route.ts`
3. Server queries database
4. Server returns JSON response

#### **Lines 24-27: Request Headers**

```typescript
headers: {
  "Content-Type": "application/json",
},
```

- Tells server we're sending/receiving JSON
- Not strictly needed for GET, but good practice

#### **Lines 30-35: Handle Success**

```typescript
if (response.ok) {
  const data = await response.json();
  console.log("Players:", data);
  setPlayers(data); // Store players in state
  setLoading(false); // Stop loading
}
```

**Line 30: `response.ok`**

- Boolean: `true` if status code is 200-299
- Checks if request succeeded

**Line 31: `await response.json()`**

- Parses JSON string to JavaScript object
- Example: `'{"id":1}'` → `{id: 1}`

**Line 33: `setPlayers(data)`**

- **Updates state** with fetched players
- **Triggers re-render** with new data

**Line 34: `setLoading(false)`**

- Turns off loading spinner
- Shows the player list

#### **Lines 35-38: Handle Failure**

```typescript
} else {
  console.error("Failed to fetch players");
  setLoading(false);
}
```

- If status code is 400-599, log error
- Still turn off loading

#### **Lines 39-42: Handle Network Errors**

```typescript
catch (error) {
  console.error("Error fetching players", error);
  setLoading(false);
}
```

- Catches network failures, timeouts, etc.

#### **Line 46: `getPlayers()`**

- Actually calls the function we defined
- Executes the GET request

#### **Line 46: `[]` dependency array**

- Empty array = run once on mount
- If we had `[players]`, it would run every time players change (infinite loop!)

---

### **Lines 48-85: JSX Return (UI)**

```typescript
return (
  <section>
    <h1>⚽ List of all football players from database ⚽</h1>

    <Link href={"/football/add"}>
      <Button>+ Add a Player</Button>
    </Link>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {players.length === 0 ? (
          <p>No players found. Add one!</p>
        ) : (
          <div>
            {players.map((player: Player) => (
              <div key={player.id}>
                <h3>{player.name}</h3>
                <p>Age: {player.age}</p>
                {/* etc */}
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </section>
);
```

#### **Lines 60-62: Loading State**

```typescript
{loading ? (
  <p className="mt-4">Loading...</p>
) : (
```

- Shows "Loading..." while `loading === true`
- Hides once data arrives

#### **Lines 64-66: Empty State**

```typescript
{players.length === 0 ? (
  <p className="text-center">No players found. Add one!</p>
) : (
```

- Shows message if no players in database
- Encourages user to add first player

#### **Lines 68-79: Map Through Players**

```typescript
{
  players.map((player: Player) => (
    <div key={player.id}>
      <h3 className="font-bold">{player.name}</h3>
      <p>Age: {player.age}</p>
      <p>Position: {player.position}</p>
      <p>Teams: {player.team.join(", ")}</p>
      <p>Active: {player.isActive ? "Yes" : "No"}</p>
    </div>
  ));
}
```

**How `.map()` works:**

- Loops through `players` array
- Creates a `<div>` for each player
- **`key={player.id}`** - React needs unique keys for list items

**Line 76: `player.team.join(", ")`**

- Converts array to string
- `["Real Madrid", "Chelsea"]` → `"Real Madrid, Chelsea"`

---

## 🔄 Complete Flow

```
1. User visits /football
   ↓
2. Component renders
   ↓
3. useEffect runs (once)
   ↓
4. getPlayers() function called
   ↓
5. fetch("GET /api/players") sent to server
   ↓
6. Server queries database via Prisma
   ↓
7. Database returns all players
   ↓
8. Server sends JSON response
   ↓
9. Client receives response
   ↓
10. response.json() parses data
   ↓
11. setPlayers(data) updates state
   ↓
12. Component re-renders with players
   ↓
13. Map through players → display cards
```

---

## 💡 Key Takeaways

### **1. useState: Storing Data**

```typescript
const [players, setPlayers] = useState<Player[]>([]);
```

- Holds list of players
- Starts empty, gets filled after API call

### **2. useEffect: Fetching Data on Mount**

```typescript
useEffect(() => {
  // Fetch data here
}, []); // Empty array = run once
```

### **3. Loading State Pattern**

```typescript
const [loading, setLoading] = useState(true);
// Show spinner while true
// Show data when false
```

### **4. GET Request**

- **Purpose:** Fetch/read data
- **No body needed** (we're requesting, not sending)
- **Response:** Array of players

---

## ⚠️ Common Mistakes to Avoid

### **1. Calling useState outside component**

```typescript
// ❌ WRONG
const [players, setPlayers] = useState([]); // Outside!

const Component = () => { ... }
```

### **2. Forgetting useEffect dependency**

```typescript
// ❌ WRONG - runs on every render
useEffect(() => {
  getPlayers();
}); // No dependency array

// ✅ CORRECT - runs once
useEffect(() => {
  getPlayers();
}, []); // Empty array
```

### **3. Not handling loading state**

```typescript
// ❌ WRONG - shows empty array initially
return <div>{players.map(...)}</div>

// ✅ CORRECT - shows loading
{loading ? <p>Loading...</p> : players.map(...)}
```

---

## 🎯 Summary

**What this file does:**

1. Displays list of all players
2. Makes GET request to `/api/players`
3. Shows loading state while fetching
4. Renders player cards when data arrives
5. Provides link to add new players

**Key React Concepts:**

- **Client Component** - runs in browser
- **useState** - manages state
- **useEffect** - handles side effects (API calls)
- **GET request** - fetches data from server
- **Loading pattern** - better UX

This is a **complete GET request example** showing how to fetch and display data in React!

