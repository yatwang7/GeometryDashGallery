import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import "./App.css";

// === Firebase Auth ===
import { signIn, logOut, listenAuth } from "./utils/firebase";

// === Components ===
import LevelForm from "./components/LevelForm";
import Gallery from "./components/Gallery";

// === Assets ===
import titleCard from "./assets/title_card.png";
import allText from "./assets/all_text.png";
import nonDemonsText from "./assets/non-demons_text.png";
import demonsText from "./assets/demons_text.png";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = listenAuth((u) => {
      setUser(u);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  // --------------------------
  // Loading state
  // --------------------------
  if (loadingUser) {
    return (
      <div className="page" style={{ textAlign: "center", marginTop: "3rem" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // --------------------------
  // Login screen (no user)
  // --------------------------
  if (!user) {
    return (
      <div className="login-container">
        <img src={titleCard} alt="Geometry Dash Gallery"/>
        <p>Sign in to upload and view your levels</p>
        <button className="login-btn" onClick={signIn}>
          Sign in with Google
        </button>
        <p className="login-footer">&copy; 2025 Geometry Dash Gallery</p>
      </div>
    );
  }

  // --------------------------
  // Main App (user logged in)
  // --------------------------
  return (
    <Router>
      <div className="App">
        {/* ===== HEADER ===== */}
        <header>
          <img src={titleCard} alt="Geometry Dash Gallery"/>
          <div className="auth-info" style={{ marginTop: "1rem" }}>
            <p>Welcome, <strong>{user.displayName}</strong></p>
            <button className="clear-btn" onClick={logOut} >
              Log out
            </button>
          </div>
        </header>

        {/* ===== NAVIGATION ===== */}
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }>
                <img src={allText} alt="All Levels" className="nav-img"/>
              </NavLink>
            </li>
            <li>
              <NavLink to="/non-demons" className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }>
                <img src={nonDemonsText} alt="Non-Demons" className="nav-img"/>
              </NavLink>
            </li>
            <li>
              <NavLink to="/demons" className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }>
                <img src={demonsText} alt="Demons" className="nav-img"/>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ===== PAGE CONTENT ===== */}
        <main>
          <Routes>
            <Route path="/" element={
                <>
                  <LevelForm />
                  <Gallery />
                </>
              }/>
            <Route path="/non-demons" element={<Gallery filter="non-demon"/>}/>
            <Route path="/demons" element={<Gallery filter="demon"/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </main>

        {/* ===== FOOTER ===== */}
        <footer>
          <p>&copy; 2025 Geometry Dash Gallery</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;