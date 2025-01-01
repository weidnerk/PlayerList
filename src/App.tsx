import React from 'react';
import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Player } from './types/Player';
import { PlayerCard } from './components/PlayerCard';
import { AddPlayerForm } from './components/AddPlayerForm';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleAddPlayer = (newPlayer: Omit<Player, 'id'>) => {
    setPlayers(prev => [...prev, {
      ...newPlayer,
      id: crypto.randomUUID()
    }]);
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-3 text-indigo-600">
          <Trophy className="w-8 h-8" />
          <h1 className="text-2xl font-bold">My Favorite NFL Players</h1>
        </div>

        <AddPlayerForm onAdd={handleAddPlayer} />

        <div className="space-y-4">
          {players.length === 0 ? (
            <p className="text-center text-gray-500">
              No players added yet. Add your first favorite player above!
            </p>
          ) : (
            players.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                onRemove={handleRemovePlayer}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
