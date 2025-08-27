'use client';

import { useEffect, useState } from 'react';
import Table from './Table';
import CharacterIcon from './CharacterIcon';
import { TableColumn, TableRow, Result } from '../../types';
import { supabase } from '../../lib/supabase';

export default function RecentMatches() {
  const [matches, setMatches] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentMatches();
  }, []);

  const fetchRecentMatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setMatches(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const columns: TableColumn[] = [
    { key: 'date', label: 'Date', className: 'text-gray-600' },
    { key: 'player', label: 'Player' },
    { key: 'opponent', label: 'Opponent' },
    { key: 'result', label: 'Result' }
  ];

  const data: TableRow[] = matches.map((match) => ({
    date: formatDate(match.created_at),
    player: (
      <div className="flex items-center gap-2">
        {match.p1_character && <CharacterIcon character={match.p1_character} size={24} />}
        <span>{match.p1_name}</span>
      </div>
    ),
    opponent: (
      <div className="flex items-center gap-2">
        {match.p2_character && <CharacterIcon character={match.p2_character} size={24} />}
        <span>{match.p2_name || 'Unknown'}</span>
      </div>
    ),
    result: (
      <span className={`font-semibold ${match.winner === match.p1_name ? 'text-green-600' : 'text-red-600'}`}>
        {match.winner === match.p1_name ? 'Win' : 'Loss'}
      </span>
    )
  }));

  if (error) {
    return (
      <section className="min-h-screen bg-white px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Recent Matches
          </h2>
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            Error loading matches: {error}
          </div>
          <p className="text-gray-600 mt-4">
            Make sure your Supabase configuration is set up correctly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 text-center mb-12">
          Recent Matches
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading matches...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No matches found</p>
            <p className="text-gray-500 mt-2">Start tracking your matches to see them here!</p>
          </div>
        ) : (
          <>
            <Table columns={columns} data={data} />
            
            <div className="text-center mt-8">
              <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                View All Matches
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}