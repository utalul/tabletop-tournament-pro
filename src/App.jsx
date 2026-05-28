import React, { useState } from "react";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [champion, setChampion] = useState(null);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const addPlayer = () => {
    if (!playerName.trim()) return;
    if (players.includes(playerName.trim())) {
      alert("玩家不可重複");
      return;
    }
    setPlayers([...players, playerName.trim()]);
    setPlayerName("");
  };

  const startTournament = () => {
    const shuffled = shuffle(players);
    const firstRound = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      firstRound.push({
        player1: shuffled[i] || "輪空",
        player2: shuffled[i + 1] || "輪空",
        winner: null,
      });
    }

    setRounds([firstRound]);
    setStarted(true);
  };

  const selectWinner = (roundIndex, matchIndex, winner) => {
    const updated = [...rounds];
    updated[roundIndex][matchIndex].winner = winner;
    setRounds(updated);

    const current = updated[roundIndex];
    const done = current.every((m) => m.winner);

    if (done) {
      const winners = current.map((m) => m.winner);

      if (winners.length === 1) {
        setChampion(winners[0]);
        return;
      }

      const nextRound = [];
      for (let i = 0; i < winners.length; i += 2) {
        nextRound.push({
          player1: winners[i] || "輪空",
          player2: winners[i + 1] || "輪空",
          winner: null,
        });
      }

      setRounds([...updated, nextRound]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl text-center mb-6">🎲 桌遊賽事系統</h1>
    </div>
  );
}
