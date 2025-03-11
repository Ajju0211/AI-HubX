import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{

        top: "10px",
        right: "10px",
        padding: "10px",
        background: theme === "light" ? "#222" : "#fff",
        color: theme === "light" ? "#fff" : "#000",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
