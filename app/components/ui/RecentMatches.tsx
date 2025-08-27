'use client';

import Table from './Table';
import CharacterIcon from './CharacterIcon';
import { TableColumn, TableRow } from '../../types';

export default function RecentMatches() {
  const columns: TableColumn[] = [
    { key: 'date', label: 'Date', className: 'text-gray-600' },
    { key: 'character', label: 'Character' },
    { key: 'opponent', label: 'Opponent' },
    { key: 'result', label: 'Result' },
    { key: 'duration', label: 'Duration', className: 'text-gray-600' }
  ];

  const characters = ['Mario', 'Pikachu', 'Link', 'Samus', 'Donkey Kong'];
  const opponents = ['Pikachu', 'Mario', 'Zelda', 'Captain Falcon', 'Fox'];

  const data: TableRow[] = [...Array(10)].map((_, i) => ({
    date: `Dec ${20 + i}, 2024`,
    character: <CharacterIcon character={characters[i % characters.length]} size={24} />,
    opponent: <CharacterIcon character={opponents[i % opponents.length]} size={24} />,
    result: (
      <span className={`font-semibold ${i % 3 === 0 ? 'text-green-600' : 'text-red-600'}`}>
        {i % 3 === 0 ? 'Win' : 'Loss'}
      </span>
    ),
    duration: `${3 + (i % 4)}:45`
  }));

  return (
    <section className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-6xl mx-auto">

        <Table columns={columns} data={data} />
        
        <div className="text-center mt-8">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
            View All Matches
          </button>
        </div>
      </div>
    </section>
  );
}