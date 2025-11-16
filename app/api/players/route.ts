import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const players = await prisma.players.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);

    // More detailed error information for debugging
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
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
