// src/components/ThemeToggle.tsx
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react"; // Import icons from Lucide

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="ml-4 px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition-colors duration-200 flex items-center gap-2"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}