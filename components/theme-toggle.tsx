"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is a standard pattern for handling hydration with next-themes
    // We need to wait for client-side mount before reading theme to avoid hydration mismatch
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <Sun className="opacity-0" />
      </div>
    );
  }

  return (
    <div>
      {theme === "light" ? (
        <div
          onClick={() => setTheme("dark")}
          className="border p-2 border-black/30 rounded-lg"
        >
          <Moon className="h-4 w-4" />
        </div>
      ) : (
        <div
          onClick={() => setTheme("light")}
          className="border p-2 border-white/30 rounded-lg"
        >
          <Sun className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
