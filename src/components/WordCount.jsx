import React from "react";

// Remove markdown syntax for accurate word count
function stripMarkdown(text) {
  return text
    .replace(/[#_*~`>[\]()-]/g, "") // Remove markdown symbols
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links
    .replace(/^\s*>/gm, "") // Remove blockquotes
    .replace(/^\s*[-+*]\s+/gm, "") // Remove list bullets
    .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered lists
    .replace(/`{1,3}.*?`{1,3}/g, "") // Remove inline code
    .replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
}

function WordCount({ text, darkMode }) {
  const clean = stripMarkdown(text || "");
  const count = clean.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div className={`word-count ${darkMode ? "dark" : ""}`}>
      {count} word{count !== 1 ? "s" : ""}
    </div>
  );
}

export default WordCount;