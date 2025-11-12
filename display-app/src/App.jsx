import React, { useState, useEffect } from "react";
import "./App.css";
import { signIn, logOut, listenAuth } from "./utils/firebase";
import LevelForm from "./components/LevelForm";
import Gallery from "./components/Gallery";
import titleCard from "./assets/title_card.png"; // reuse your title image

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = listenAuth(setUser);
    return () => unsubscribe();
  }, []);

  // ===============================
  // LOGIN SCREEN (when user = null)
  // ===============================
  if (!user) {
    return (
      <div className="login-container">
        <img src={titleCard} alt="Geometry Dash Gallery" />
        <p>Sign in to upload and view your levels</p>
        <button className="login-btn" onClick={signIn}>
          Sign in with Google
        </button>
        <p className="login-footer">&copy; 2025 Geometry Dash Gallery</p>
      </div>
    );
  }

  // ===============================
  // MAIN APP (after login)
  // ===============================
  return (
    <div className="App">
      <header>
        <img
          src={titleCard}
          alt="Geometry Dash Gallery"
          style={{
            width: "90%",
            maxWidth: "600px",
            filter: "drop-shadow(0 0 10px var(--accent))",
          }}
        />

        <div className="auth-info" style={{ marginTop: "1rem" }}>
          <p>
            Welcome, <strong>{user.displayName}</strong>
          </p>
          <button
            className="clear-btn"
            onClick={logOut}
            style={{ marginTop: "0.5rem" }}
          >
            Log out
          </button>
        </div>
      </header>

      <main>
        <LevelForm />
        <Gallery />
      </main>

      <footer>
        <p>&copy; 2025 Geometry Dash Gallery</p>
      </footer>
    </div>
  );
}

export default App;