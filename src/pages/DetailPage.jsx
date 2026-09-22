import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import { capitalize } from "../utils.js";

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      setPokemon(null);

      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);

        if (!response.ok) {
          throw new Error(`No Pokémon named "${name}" — check the spelling.`);
        }

        const data = await response.json();

        if (isCurrent) {
          setPokemon(data);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]); // re-run whenever the :name in the URL changes

  if (isLoading) {
    return (
      <div className="detail-page">
        <Link to="/" className="back-link">← Back to list</Link>
        <p className="status">Loading {name}…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page">
        <Link to="/" className="back-link">← Back to list</Link>
        <p className="status status-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to list</Link>
      <div className="detail-card">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={200}
          height={200}
        />
        <h2>{capitalize(pokemon.name)}</h2>
        <p className="pokemon-types">
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <ul className="stat-list">
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              <span className="stat-name">{s.stat.name}</span>
              <span className="stat-value">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;
