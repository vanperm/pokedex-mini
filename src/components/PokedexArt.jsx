function PokedexArt() {
  return (
    <svg
      className="pokedex-art"
      viewBox="0 0 420 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a Pokédex"
    >
      {/* hinge */}
      <rect x="200" y="10" width="20" height="280" rx="6" fill="#8a1414" />

      {/* left panel */}
      <rect x="10" y="10" width="200" height="280" rx="18" fill="#e0332a" />
      <rect x="10" y="10" width="200" height="280" rx="18" fill="none" stroke="#8a1414" strokeWidth="4" />

      {/* lens */}
      <circle cx="65" cy="60" r="38" fill="#8a1414" />
      <circle cx="65" cy="60" r="30" fill="#2e8b8b" />
      <circle cx="65" cy="60" r="30" fill="none" stroke="#1c5c5c" strokeWidth="3" />
      <ellipse cx="55" cy="49" rx="9" ry="6" fill="#ffffff" opacity="0.7" />

      {/* indicator lights */}
      <circle cx="128" cy="34" r="7" fill="#e05555" />
      <circle cx="150" cy="34" r="7" fill="#e0c23a" />
      <circle cx="172" cy="34" r="7" fill="#5ac95a" />

      {/* main screen */}
      <rect x="24" y="108" width="162" height="100" rx="8" fill="#f4f4f4" />
      <rect x="32" y="116" width="146" height="84" rx="4" fill="#1b2a52" />
      <rect x="40" y="124" width="60" height="10" rx="2" fill="#4fd0e0" />
      <rect x="40" y="140" width="90" height="6" rx="2" fill="#9fb3e8" />
      <rect x="40" y="152" width="70" height="6" rx="2" fill="#9fb3e8" />
      <circle cx="150" cy="182" r="12" fill="#4fd0e0" opacity="0.85" />

      {/* small button + d-pad row (kept clear of the screen above) */}
      <rect x="24" y="220" width="26" height="10" rx="5" fill="#c94a3a" />
      <g transform="translate(88,244)">
        <rect x="-8" y="-24" width="16" height="48" rx="4" fill="#2b2b2b" />
        <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#2b2b2b" />
      </g>
      <rect x="150" y="224" width="30" height="12" rx="6" fill="#7fca6a" />

      {/* right panel */}
      <rect x="220" y="10" width="190" height="280" rx="18" fill="#e0332a" />
      <rect x="220" y="10" width="190" height="280" rx="18" fill="none" stroke="#8a1414" strokeWidth="4" />

      {/* text screen */}
      <rect x="236" y="30" width="158" height="70" rx="6" fill="#14171a" />
      <rect x="248" y="42" width="120" height="6" rx="2" fill="#7fe0e8" />
      <rect x="248" y="54" width="130" height="6" rx="2" fill="#7fe0e8" opacity="0.8" />
      <rect x="248" y="66" width="90" height="6" rx="2" fill="#7fe0e8" opacity="0.6" />

      {/* button grid */}
      <g fill="#3f8fe0">
        {[0, 1, 2, 3, 4].map((col) =>
          [0, 1, 2].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={248 + col * 24}
              y={112 + row * 24}
              width="18"
              height="18"
              rx="3"
            />
          ))
        )}
      </g>

      {/* small controls under grid */}
      <circle cx="360" cy="190" r="7" fill="#c94a3a" />
      <rect x="330" y="184" width="20" height="10" rx="5" fill="#7fca6a" />

      <rect x="248" y="206" width="18" height="18" rx="3" fill="#f4f4f4" />
      <rect x="270" y="206" width="18" height="18" rx="3" fill="#f4f4f4" />
      <rect x="330" y="206" width="60" height="18" rx="3" fill="#14171a" />

      <rect x="248" y="236" width="60" height="18" rx="4" fill="#14171a" />
    </svg>
  );
}

export default PokedexArt;
