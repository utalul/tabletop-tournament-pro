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
      // ⭐ 每一輪都重新隨機
      const winners = shuffle(current.map((m) => m.winner));

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
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          
          <h1 className="text-3xl md:text-5xl font-black text-center mb-6">
            🎲 桌遊賽事專業版
          </h1>

          {!started && (
            <>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                  placeholder="輸入玩家名稱"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4 text-lg"
                />

                <button
                  onClick={addPlayer}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-4 rounded-xl font-bold text-lg"
                >
                  新增
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
                className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl text-xl md:text-2xl font-black"
              >
                開始比賽
              </button>
            </>
          )}

          {champion && (
            <div className="bg-yellow-400 text-black rounded-3xl p-6 md:p-8 text-center mb-8">
              <div className="text-6xl md:text-7xl">🏆</div>
              <h2 className="text-3xl md:text-4xl font-black mt-4">
                {champion}
              </h2>
              <p className="text-lg mt-2">恭喜獲得冠軍！</p>
            </div>
          )}

          {/* 📱 手機直排 / 電腦橫排 */}
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
            {rounds.map((round, rIndex) => (
              <div
                key={rIndex}
                className="w-full md:min-w-[320px] bg-slate-800 rounded-3xl p-5"
              >
                <h2 className="text-xl md:text-2xl font-black text-center mb-5">
                  第 {rIndex + 1} 輪
                </h2>

                <div className="space-y-4">
                  {round.map((match, mIndex) => (
                    <div
                      key={mIndex}
                      className="bg-slate-900 rounded-2xl p-4"
                    >
                      <button
                        onClick={() =>
                          selectWinner(rIndex, mIndex, match.player1)
                        }
                        disabled={match.winner}
                        className={`w-full p-5 text-lg rounded-xl mb-3 font-bold ${
                          match.winner === match.player1
                            ? "bg-green-600"
                            : "bg-slate-700"
                        }`}
                      >
                        {match.player1}
                      </button>

                      <div className="text-center text-slate-500 mb-3">
                        VS
                      </div>

                      <button
                        onClick={() =>
                          selectWinner(rIndex, mIndex, match.player2)
                        }
                        disabled={match.winner}
                        className={`w-full p-5 text-lg rounded-xl font-bold ${
                          match.winner === match.player2
                            ? "bg-green-600"
                            : "bg-slate-700"
                        }`}
                      >
                        {match.player2}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
