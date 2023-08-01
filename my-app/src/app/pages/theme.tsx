import React from "react";
import useTheme from "./hooks/useTheme";

export default function Theme() {
  const { theme, toggleTheme } = useTheme<string>("light", "dark");

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-gray-900"} text-gray-800 ${theme === "dark" && "text-white"}`}>
      <header className="bg-indigo-600 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-white">Doan Viet Tien Dat</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <section className="py-16">
          <h2 className="text-xl font-semibold">Hello World</h2>
          <p className="mt-4">
            Click the Toggle Theme button to switch between themes.
          </p>
        </section>
      </main>
      <button
        onClick={toggleTheme}
        className={`fixed bottom-4 right-4 p-2 rounded-full bg-${theme === "light" ? "indigo" : "yellow"}-500`}
      >
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>
    </div>
  );
}
