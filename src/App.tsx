import React, { useState, useEffect, useCallback } from 'react';
import { Trophy } from 'lucide-react';
import { Player } from './types/Player';
import { PlayerCard } from './components/PlayerCard';
import { AddPlayerForm } from './components/AddPlayerForm';
import { LogoutButton } from './components/LogoutButton';
import { SignIn } from './pages/SignIn';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPlayers();
    }
  }, [user]);

  const fetchPlayers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (newPlayer: Omit<Player, 'id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('players')
        .insert([
          {
            ...newPlayer,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setPlayers(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const handleRemovePlayer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPlayers(prev => prev.filter(player => player.id !== id));
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading players...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-indigo-600">
            <Trophy className="w-8 h-8" />
            <h1 className="text-2xl font-bold">My Favorite NFL Players</h1>
          </div>
          <LogoutButton />
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
