import React from "react";

function Editor({ value, onChange, darkMode }) {
  return (
    <textarea
      className={`editor ${darkMode ? "dark" : ""}`}
      value={value}
      onChange={onChange}
      placeholder="Write your markdown here..."
    />
  );
}

export default Editor;