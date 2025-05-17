import React from "react";
import { marked } from "marked";

function Preview({ markdown, darkMode }) {
  return (
    <div
      className={`preview ${darkMode ? "dark" : ""}`}
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
    />
  );
}

export default Preview;