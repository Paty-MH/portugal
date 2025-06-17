import { useEffect, useState } from "react";
import "./App.css";

interface Player {
  numero: string;
  nombre: string;
  posicion: string;
  nacionalidades: string;
  edad: string;
  club: string;
  valor_mercado: string;
  fecha_actualizacion: string;
  url_foto: string;
}

const ITEMS_PER_PAGE = 20;

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/playersPortugal.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPlayers = players.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Jugadores de Portugal</h1>
      <div className="card-container">
        {currentPlayers.map((player, idx) => (
          <div className="card" key={idx}>
            <img
              src={player.url_foto}
              alt={player.nombre}
              className="player-img"
            />
            <h2>{player.nombre}</h2>
            <p><strong>Posición:</strong> {player.posicion}</p>
            <p><strong>Nacionalidades:</strong> {player.nacionalidades}</p>
            <p><strong>Edad:</strong> {player.edad}</p>
            <p><strong>Club:</strong> {player.club || "No disponible"}</p>
            <p><strong>Valor de mercado:</strong> {player.valor_mercado}</p>
            <p><strong>Fecha de actualización:</strong> {player.fecha_actualizacion}</p>
          </div>
        ))}
      </div>

      {/* Navegación por páginas */}
      <div className="pagination">
        <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          );
        })}
        <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default App;
