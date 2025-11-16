import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // Fetch all players from database
    const players = await sql`
      SELECT * FROM "Players" 
      ORDER BY "createdAt" DESC
    `;

    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("Error details:", {
      message: errorMessage,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Missing",
    });

    return NextResponse.json(
      {
        error: "Failed to fetch players",
        message:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, team, position, isActive } = body;

    // Insert new player
    const newPlayer = await sql`
      INSERT INTO "Players" (name, age, team, position, "isActive", "createdAt")
      VALUES (${name}, ${age}, ${team}::text[], ${position}, ${isActive}, NOW())
      RETURNING *
    `;

    return NextResponse.json(newPlayer[0], { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}
