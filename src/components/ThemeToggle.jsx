import React from "react";

function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button className="theme-toggle" onClick={toggleDarkMode}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ThemeToggle;