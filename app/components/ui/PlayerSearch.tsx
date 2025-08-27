'use client';

import { useState } from 'react';

interface PlayerSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayerSearch({ isOpen, onClose }: PlayerSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Mock search results - replace with actual API call later
    if (term.length > 0) {
      setSearchResults([
        'Player1',
        'PlayerX',
        'SuperGamer',
        'SmashPro',
        'Champion2024'
      ].filter(player => 
        player.toLowerCase().includes(term.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search for players..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        
        {searchResults.length > 0 && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {searchResults.map((player, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  // Handle player selection - navigate to player profile
                  console.log('Selected player:', player);
                  onClose();
                }}
              >
                {player}
              </div>
            ))}
          </div>
        )}
        
        {searchTerm && searchResults.length === 0 && (
          <div className="mt-2 px-3 py-2 text-gray-500 text-sm">
            No players found
          </div>
        )}
      </div>
    </div>
  );
}