import { Outlet, Link } from "react-router-dom";
import PokedexArt from "./PokedexArt.jsx";
import MusicPlayer from "./MusicPlayer.jsx";

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <PokedexArt />
        <MusicPlayer />
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
  );
}

export default Layout;
