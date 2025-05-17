import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import WordCount from "./components/WordCount";
import ThemeToggle from "./components/ThemeToggle";
import WelcomePage from "./components/WelcomePage";
import { FaDownload, FaTrash, FaEye, FaEyeSlash, FaGithub, FaSun, FaMoon, FaInfoCircle } from "react-icons/fa";
import "./App.css";

function generateId() {
  return Date.now().toString();
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved
      ? JSON.parse(saved)
      : [{ id: generateId(), title: "Untitled", content: "" }];
  });
  const [selectedId, setSelectedId] = useState(() => notes[0].id);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showPreview, setShowPreview] = useState(true);
    // Download current note as .md
  const downloadNote = () => {
    const note = notes.find((n) => n.id === selectedId);
    const blob = new Blob([note.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title || "note"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
   // Reset/Clear current note
  const clearNote = () => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedId ? { ...note, content: "" } : note
      )
    );
  };
  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Get current note
  const currentNote = notes.find((n) => n.id === selectedId);

  // Update note content
  const updateNote = (content) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === selectedId ? { ...note, content } : note))
    );
  };

  // Update note title
  const updateTitle = (title) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === selectedId ? { ...note, title } : note))
    );
  };

  // Add new note
  const addNote = () => {
    const newNote = {
      id: generateId(),
      title: "Untitled",
      content: "",
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  };

  // Delete note
  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
    if (filtered.length) setSelectedId(filtered[0].id);
    else addNote();
  };

  // Select note
  const selectNote = (id) => setSelectedId(id);

  if (showWelcome) {
    return <WelcomePage onStart={() => setShowWelcome(false)} />;
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="navbar">
        <div className="navbar-title">
        <button
  className="navbar-logo-btn"
  onClick={() => setShowWelcome(true)}
  style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}
  title="Back to Welcome"
>
  <img
    src="/notiva.png"
    alt="Notiva Logo"
    style={{ height: "5rem", width: "auto", marginRight: "0.7rem", verticalAlign: "middle" }}
  />
</button>
        </div>
        <div className="navbar-actions">
          <button className="icon-btn" onClick={downloadNote} title="Download as .md"><FaDownload /></button>
          <button className="icon-btn" onClick={clearNote} title="Clear Note">  <FaTrash /></button>
          <button
            className="icon-btn"
            onClick={() => setShowPreview((v) => !v)}
            title="Toggle Live Preview"
          >
             {showPreview ? <FaEye /> : <FaEyeSlash />}
          </button>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <a
            className="icon-btn"
            href="https://github.com/ishwari03/Notiva"
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub Repo"
            style={{ fontSize: "1.3rem" }}
          >
            <FaGithub />
          </a>
          <button
          className="icon-btn"
          onClick={() => setShowHelp(true)}
          title="Help / Info">
          <FaInfoCircle />
        </button>
        </div>
      </header>
      <main className="main-content">
        <aside className="sidebar">
          <button className="add-note-btn" onClick={addNote}>
            + New Note
          </button>
                  <ul className="notes-list">
          {notes.map((note) => {
            const isEditing = editingId === note.id;
            return (
              <li
                key={note.id}
                className={`note-item ${note.id === selectedId ? "active" : ""}`}
                onClick={() => selectNote(note.id)}
              >
                {isEditing ? (
                  <input
                    className="note-title-input"
                    value={note.title}
                    autoFocus
                    onChange={(e) => updateTitle(e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditingId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span
                    className="note-title-text"
                    onDoubleClick={() => setEditingId(note.id)}
                    title="Double-click to rename"
                    style={{ flex: 1, cursor: "pointer" }}
                  >
                    {note.title}
                  </span>
                )}
                <button
                  className="delete-note-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  title="Delete note"
                >
                  🗑️
                </button>
              </li>
            );
          })}
        </ul>
        </aside>
        <section className="editor-section">
          <Editor
            value={currentNote?.content || ""}
            onChange={(e) => updateNote(e.target.value)}
            darkMode={darkMode}
          />
        </section>
          {showPreview && (
        <section className="preview-section">
           <WordCount text={currentNote?.content || ""} darkMode={darkMode} />
          <Preview markdown={currentNote?.content || ""} darkMode={darkMode} />
         
        </section>
      )}
      {showHelp && (
  <div className="modal-backdrop" onClick={() => setShowHelp(false)}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={() => setShowHelp(false)} title="Close">&times;</button>
      <h2>ℹ️ How to Use Notiva</h2>
      <ul>
        <li><strong>Markdown:</strong> Write notes using <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">Markdown syntax</a> (e.g. <code># Heading</code>, <code>**bold**</code>, <code>*italic*</code>, <code>[Link](url)</code>, lists, etc.).</li>
        <li><strong>Auto-save:</strong> Notes are saved automatically in your browser (localStorage).</li>
        <li><strong>Multiple Notes:</strong> Use the sidebar to create, select, rename (double-click), or delete notes.</li>
        <li><strong>Download:</strong> Download your note as a <code>.md</code> file.</li>
        <li><strong>Clear:</strong> Reset the current note’s content.</li>
        <li><strong>Preview:</strong> Toggle live Markdown preview.</li>
        <li><strong>Theme:</strong> Switch between light and dark mode.</li>
      </ul>
      <p style={{fontSize: "0.95em", color: "#888"}}>Made with React + Vite. Your notes never leave your device.</p>
    </div>
  </div>
)}
      </main>
      <footer className="footer">
        <small>Auto-saved to browser localStorage</small>
        
      </footer>
    </div>
  );
}

export default App;
