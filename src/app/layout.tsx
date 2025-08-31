"use client";
import "./index.css";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

// Theme hook
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { theme, toggleTheme };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  console.log("theme:", theme);

  const renderContent = () => {
    if (pathname?.indexOf("/admin") !== -1) {
      return children;
    } else {
      return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="pt-16 w-full">{children}</main>
          <Footer />
          <footer
            className={`py-8 ${
              theme === "dark" ? "bg-gray-800" : "bg-maroon-800"
            } w-full`}
          >
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-300 w-full">
              <p>© {new Date().getFullYear()} SIIT. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
    }
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        {renderContent()}
      </body>
    </html>
  );
}
