
import React from "react";
import "../App.css";

export default function Navbar({ currentTab, setCurrentTab }) {
  const tabs = ["artifacts", "creatures", "logs"];

  return (
    <nav className="navbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          className={`nav-button ${currentTab === tab ? 'active' : ''}`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
