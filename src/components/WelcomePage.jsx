import React from "react";
import { FaMarkdown, FaEye, FaMoon, FaDownload, FaGithub } from "react-icons/fa";

function WelcomePage({ onStart }) {
  return (
    <div className="welcome-container">
      {/* Main Content */}
      <div className="welcome-logo" aria-label="Markdown Notes Logo">
        <img src="/notiva.png" alt="Notiva Logo" style={{ width: "7rem", height: "7rem" }} />
      </div>
      <div className="welcome-title">Welcome to Notiva</div>
      <div className="welcome-tagline">
        Fast, beautiful, and private markdown note-taking in your browser.
      </div>
      <div className="welcome-features">
        <div className="welcome-feature-card">
          <span className="welcome-feature-icon"><FaMarkdown /></span>
          <span>Write in <strong>Markdown</strong></span>
        </div>
        <div className="welcome-feature-card">
          <span className="welcome-feature-icon"><FaEye /></span>
          <span>Live <strong>Preview</strong></span>
        </div>
        <div className="welcome-feature-card">
          <span className="welcome-feature-icon"><FaMoon /></span>
          <span>Dark/Light <strong>Mode</strong></span>
        </div>
        <div className="welcome-feature-card">
          <span className="welcome-feature-icon"><FaDownload /></span>
          <span>Auto-save & <strong>Download</strong></span>
        </div>
      </div>
      <button className="welcome-getstarted-btn" onClick={onStart}>
        Get Started
      </button>
<div className="faq-section">
  <h2 className="faq-title">
    What does <span className="faq-brand">Notiva</span> do?
  </h2>
  <div className="faq-items">
    <div className="faq-item">
      <h3 className="faq-question">📝 Is Notiva a general note-taking app?</h3>
      <p className="faq-answer">
        Notiva is focused on <strong>Markdown-based note-taking</strong>, perfect for technical notes, daily journaling, or simple to-do lists — all in one place.
      </p>
    </div>
    <div className="faq-item">
      <h3 className="faq-question">👩‍💻 Who is it for?</h3>
      <p className="faq-answer">
        Notiva is built for <strong>developers, students, and writers</strong> who love writing in Markdown and want a clean, distraction-free writing environment.
      </p>
    </div>
    <div className="faq-item">
      <h3 className="faq-question">🚀 What features does it include?</h3>
      <p className="faq-answer">
        It comes with <strong>live preview, auto-save, light/dark mode, and one-click downloads</strong> — all running right in your browser.
      </p>
    </div>
    <div className="faq-item">
      <h3 className="faq-question">🔒 Is my data stored anywhere?</h3>
      <p className="faq-answer">
        No — everything is stored in your browser. Your notes never leave your device.
      </p>
    </div>
  </div>
</div>

      <div className="welcome-footer">
        Made with React + Vite
        <a
          href="https://github.com/ishwari03/Notiva"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repo"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default WelcomePage;