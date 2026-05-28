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
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-5xl font-black text-center mb-3">
            🎲 桌遊賽事專業版
          </h1>

          {!started && (
            <>
              <div className="flex gap-3 mb-6">
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                  placeholder="輸入玩家名稱"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4"
                />

                <button
                  onClick={addPlayer}
                  className="bg-indigo-600 px-6 rounded-xl font-bold"
                >
                  新增
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {players.map((player) => (
                  <div
                    key={player}
                    className="bg-slate-800 rounded-2xl p-4 text-center font-bold"
                  >
                    {player}
                  </div>
                ))}
              </div>

              <button
                onClick={startTournament}
                className="w-full bg-green-600 py-4 rounded-2xl text-2xl font-black"
              >
                開始比賽
              </button>
            </>
          )}

          {champion && (
            <div className="bg-yellow-400 text-black rounded-3xl p-8 text-center mb-8">
              <div className="text-7xl">🏆</div>
              <h2 className="text-4xl font-black mt-4">{champion}</h2>
            </div>
          )}

          <div className="flex gap-6 overflow-x-auto">
            {rounds.map((round, rIndex) => (
              <div
                key={rIndex}
                className="min-w-[320px] bg-slate-800 rounded-3xl p-5"
              >
                <h2 className="text-2xl font-black text-center mb-5">
                  第 {rIndex + 1} 輪
                </h2>

                {round.map((match, mIndex) => (
                  <div
                    key={mIndex}
                    className="bg-slate-900 rounded-2xl p-4 mb-4"
                  >
                    <button
                      onClick={() =>
                        selectWinner(rIndex, mIndex, match.player1)
                      }
                      className="w-full p-3 bg-slate-700 mb-2"
                    >
                      {match.player1}
                    </button>

                    <button
                      onClick={() =>
                        selectWinner(rIndex, mIndex, match.player2)
                      }
                      className="w-full p-3 bg-slate-700"
                    >
                      {match.player2}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
