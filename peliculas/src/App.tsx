import { useEffect, useState } from "react";
import "./App.css";

interface Player {
  name: string;
  age: number;
  position: string;
  nationality: string;
  origin: string;
  destination: string;
  marketValue: string;
  image: string;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch("/playersPortugal.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div className="container">
      <h1>Transferencias de Jugadores de Portugal</h1>
      <div className="card-container">
        {players.map((player, idx) => (
          <div className="card" key={idx}>
            <img src={player.image} alt={player.name} className="player-img" />
            <h2>{player.name}</h2>
            <p><strong>Edad:</strong> {player.age}</p>
            <p><strong>Posición:</strong> {player.position}</p>
            <p><strong>Nacionalidad:</strong> {player.nationality}</p>
            <p><strong>Origen:</strong> {player.origin}</p>
            <p><strong>Destino:</strong> {player.destination}</p>
            <p><strong>Valor de mercado:</strong> {player.marketValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
