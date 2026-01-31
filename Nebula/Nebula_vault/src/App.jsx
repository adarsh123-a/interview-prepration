
import React, { useState } from "react";
import UniverseTab from "./components/UniverseTab";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("artifacts");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">NebulaVault</h1>
        <p className="app-subtitle">Cosmic Data Management System</p>
      </header>
      
      <div className="content-wrapper">
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="content-container">
          <UniverseTab name={currentTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
