"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string[];
  isActive: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 3;

const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calculate pagination values
  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlayers = players.slice(startIndex, endIndex);

  // Handle page navigation
  const handlePageChange = (
    page: number,
    e?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e?.preventDefault();
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-sm md:text-xl text-center font-bold">
        ⚽ List of all football players from database ⚽
      </h1>
      <div className="mt-10">
        <Link href={"/football/add"}>
          <Button variant={"outline"} className="hover:cursor-pointer">
            + Add a Player
          </Button>
        </Link>
      </div>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <div className="mt-6 w-full max-w-2xl">
          {players.length === 0 ? (
            <p className="text-center">No players found. Add one!</p>
          ) : (
            <>
              <div className="space-y-2">
                {currentPlayers.map((player: Player) => (
                  <div
                    key={player.id}
                    className={`border border-gray-500 dark:border-gray-200/20 p-4 rounded-xl ${
                      player.isActive
                        ? "bg-green-400/30 dark:bg-green-400/20"
                        : "bg-red-400/30 dark:bg-red-400/20"
                    }`}
                  >
                    <h3 className="font-bold">{player.name}</h3>
                    <p>Age: {player.age}</p>
                    <p>Position: {player.position}</p>
                    <p>Teams: {player.team.join(", ")}</p>
                    <p>
                      Active:{" "}
                      <span
                        className={`font-bold ${
                          player.isActive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {player.isActive ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={handlePrevious}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => handlePageChange(index + 1, e)}
                            isActive={currentPage === index + 1}
                            className="cursor-pointer"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={handleNext}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default PlayersPage;
