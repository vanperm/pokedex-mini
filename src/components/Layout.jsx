import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import PokedexArt from "./PokedexArt.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import BackgroundVideo from "./BackgroundVideo.jsx";

function Layout() {
  const [isUiHidden, setIsUiHidden] = useState(false);

  return (
    <>
      <BackgroundVideo />

      <button
        type="button"
        className="ui-toggle"
        onClick={() => setIsUiHidden((prev) => !prev)}
        aria-label={isUiHidden ? "Show the Pokédex interface" : "Hide the interface to watch the background"}
        title={isUiHidden ? "Show interface" : "Hide interface"}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            d={isUiHidden ? "M9 4l8 8-8 8" : "M15 4L7 12l8 8"}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={`app-shell${isUiHidden ? " app-shell-hidden" : ""}`}>
        <aside className="sidebar">
          <PokedexArt />
          <MusicPlayer />

          <div className="sidebar-decoration" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
              <path d="M4 50h32a14 14 0 0 0 28 0h32" fill="none" stroke="currentColor" strokeWidth="6" />
              <circle cx="50" cy="50" r="12" fill="#fff" stroke="currentColor" strokeWidth="6" />
            </svg>
          </div>

          <div className="sidebar-footer">
            <span className="sidebar-footer-dot" />
            Gotta build 'em all
          </div>
        </aside>

        <div className="main-content">
          <div className="app">
            <header className="app-header">
              <Link to="/" className="app-title-link">
                <h1>PokéDex Mini</h1>
              </Link>
            </header>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
