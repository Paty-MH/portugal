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

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch("/playersPortugal.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos cargados:", data);
        setPlayers(data);
      });
  }, []);

  return (
    <div className="container">
      <h1>Transferencias de Jugadores de Portugal</h1>
      <div className="card-container">
        {players.map((player, idx) => (
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
    </div>
  );
}

export default App;