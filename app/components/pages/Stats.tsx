'use client';

import { useEffect, useState, useCallback } from 'react';
import Table from '../ui/Table';
import CharacterIcon from '../ui/CharacterIcon';
import { TableColumn, TableRow, Result } from '../../types';
import { supabase } from '../../lib/supabase';
import { useRealtimeSubscription } from '../../hooks/useRealtimeSubscription';

interface CharacterStats {
  character: string;
  wins: number;
  total: number;
  winRate: number;
}

export default function Stats() {
  const [characterStats, setCharacterStats] = useState<CharacterStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWinRatesCallback = useCallback(() => {
    fetchWinRates();
  }, []);

  useEffect(() => {
    fetchWinRates();
  }, []);

  // Set up real-time subscription to the results table
  useRealtimeSubscription({
    table: 'results',
    callback: fetchWinRatesCallback,
    enabled: true
  });

  const fetchWinRates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('results')
        .select('*');

      if (error) throw error;

      const stats = calculateWinRates(data || []);
      setCharacterStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch win rates');
      console.error('Error fetching win rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateWinRates = (matches: Result[]): CharacterStats[] => {
    const characterData: { [key: string]: { wins: number; total: number } } = {};

    matches.forEach((match) => {
      // Count P1 character stats
      if (match.p1_character) {
        if (!characterData[match.p1_character]) {
          characterData[match.p1_character] = { wins: 0, total: 0 };
        }
        characterData[match.p1_character].total++;
        if (match.winner === match.p1_name) {
          characterData[match.p1_character].wins++;
        }
      }

      // Count P2 character stats
      if (match.p2_character) {
        if (!characterData[match.p2_character]) {
          characterData[match.p2_character] = { wins: 0, total: 0 };
        }
        characterData[match.p2_character].total++;
        if (match.winner === match.p2_name) {
          characterData[match.p2_character].wins++;
        }
      }
    });

    // Convert to array and calculate win rates
    const stats: CharacterStats[] = Object.entries(characterData)
      .map(([character, data]) => ({
        character,
        wins: data.wins,
        total: data.total,
        winRate: data.total > 0 ? (data.wins / data.total) * 100 : 0
      }))
      .filter(stat => stat.total >= 3) // Only show characters with at least 3 matches
      .sort((a, b) => b.winRate - a.winRate); // Sort by win rate descending

    return stats;
  };

  const columns: TableColumn[] = [
    { key: 'rank', label: 'Rank', className: 'text-foreground/60 text-center' },
    { key: 'character', label: 'Character' },
    { key: 'winRate', label: 'Win Rate', className: 'text-center font-semibold' },
    { key: 'record', label: 'Record', className: 'text-center text-foreground/70' },
    { key: 'matches', label: 'Matches', className: 'text-center text-foreground/60' }
  ];

  const data: TableRow[] = characterStats.map((stat, index) => ({
    rank: index + 1,
    character: (
      <div className="flex items-center gap-3">
        <CharacterIcon character={stat.character} size={32} />
        <span className="font-medium">{stat.character}</span>
      </div>
    ),
    winRate: (
      <div className="flex flex-col items-center">
        <span className={`text-lg font-bold ${
          stat.winRate >= 70 ? 'text-green-600' : 
          stat.winRate >= 50 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {stat.winRate.toFixed(1)}%
        </span>
        <div className="w-16 h-2 bg-foreground/10 rounded-full mt-1 overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              stat.winRate >= 70 ? 'bg-green-600' : 
              stat.winRate >= 50 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            style={{ width: `${Math.min(stat.winRate, 100)}%` }}
          />
        </div>
      </div>
    ),
    record: `${stat.wins}-${stat.total - stat.wins}`,
    matches: stat.total
  }));

  if (error) {
    return (
      <section className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Character Win Rates
          </h2>
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            Error loading win rates: {error}
          </div>
          <p className="text-foreground/60 mt-4">
            Make sure your Supabase configuration is set up correctly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Character Win Rates
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Discover which characters dominate the battlefield. Rankings based on characters with at least 3 matches.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
            <p className="text-foreground/70 mt-4">Calculating win rates...</p>
          </div>
        ) : characterStats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">No character data found</p>
            <p className="text-foreground/50 mt-2">Play some matches to see character win rates!</p>
          </div>
        ) : (
          <>
            <div className="bg-foreground/5 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {characterStats[0]?.character || 'N/A'}
                  </div>
                  <div className="text-foreground/60">Top Character</div>
                  <div className="text-sm text-foreground/50">
                    {characterStats[0]?.winRate.toFixed(1)}% win rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {characterStats.length}
                  </div>
                  <div className="text-foreground/60">Characters Tracked</div>
                  <div className="text-sm text-foreground/50">
                    {characterStats.reduce((sum, stat) => sum + stat.total, 0)} total matches
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {(characterStats.reduce((sum, stat) => sum + stat.winRate, 0) / characterStats.length).toFixed(1)}%
                  </div>
                  <div className="text-foreground/60">Average Win Rate</div>
                  <div className="text-sm text-foreground/50">
                    Across all characters
                  </div>
                </div>
              </div>
            </div>
            
            <Table columns={columns} data={data} />
            
            <div className="text-center mt-8 text-sm text-foreground/50">
              <p>* Only characters with 3+ matches are shown</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}