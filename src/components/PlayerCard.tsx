import React from 'react';
import { Star, Trash2 } from 'lucide-react';
import { Player } from '../types/Player';

interface PlayerCardProps {
  player: Player;
  onRemove: (id: string) => void;
}

export function PlayerCard({ player, onRemove }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
      {player.image_url ? (
        <img
          src={player.image_url}
          alt={player.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{player.name}</h3>
        <div className="text-sm text-gray-600">
          <span className="mr-2">#{player.number}</span>
          <span className="mr-2">•</span>
          <span className="mr-2">{player.position}</span>
          <span className="mr-2">•</span>
          <span>{player.team}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(player.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="Remove player"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}