'use client';

import { useEffect, useState, useCallback } from 'react';
import Table from '../ui/Table';
import CharacterIcon from '../ui/CharacterIcon';
import { TableColumn, TableRow, Result } from '../../types';
import { supabase } from '../../lib/supabase';
import { useRealtimeSubscription } from '../../hooks/useRealtimeSubscription';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalMatches: number;
  matchesPerPage: number;
}

export default function AllMatches() {
  const [matches, setMatches] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalMatches: 0,
    matchesPerPage: 20
  });

  const fetchMatches = async (page: number = 1) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pagination.matchesPerPage;

      // Get total count
      const { count } = await supabase
        .from('results')
        .select('*', { count: 'exact', head: true });

      // Get paginated results
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + pagination.matchesPerPage - 1);

      if (error) throw error;

      const totalMatches = count || 0;
      const totalPages = Math.ceil(totalMatches / pagination.matchesPerPage);

      setMatches(data || []);
      setPagination({
        ...pagination,
        currentPage: page,
        totalPages,
        totalMatches
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchesCallback = useCallback(() => {
    fetchMatches(pagination.currentPage);
  }, [pagination.currentPage]);

  useEffect(() => {
    fetchMatches(1);
  }, []);

  // Set up real-time subscription to the results table
  useRealtimeSubscription({
    table: 'results',
    callback: fetchMatchesCallback,
    enabled: true
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchMatches(page);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns: TableColumn[] = [
    { key: 'date', label: 'Date', className: 'text-foreground/60' },
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

  const Pagination = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    
    // Calculate which page numbers to show
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ←
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="text-foreground/50">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              page === currentPage
                ? 'bg-foreground text-background border-foreground'
                : 'border-foreground/20 hover:bg-foreground/5'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-foreground/50">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          →
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <section className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            All Matches
          </h1>
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            Error loading matches: {error}
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            All Matches
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Complete match history with detailed results and statistics.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
            <p className="text-foreground/70 mt-4">Loading matches...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">No matches found</p>
            <p className="text-foreground/50 mt-2">Start tracking your matches to see them here!</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="bg-foreground/5 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {pagination.totalMatches}
                  </div>
                  <div className="text-foreground/60">Total Matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {pagination.currentPage}
                  </div>
                  <div className="text-foreground/60">Current Page</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {pagination.matchesPerPage}
                  </div>
                  <div className="text-foreground/60">Per Page</div>
                </div>
              </div>
            </div>
            
            <Table columns={columns} data={data} />
            
            {pagination.totalPages > 1 && <Pagination />}
            
            <div className="text-center mt-8 text-sm text-foreground/50">
              <p>Showing {((pagination.currentPage - 1) * pagination.matchesPerPage) + 1} - {Math.min(pagination.currentPage * pagination.matchesPerPage, pagination.totalMatches)} of {pagination.totalMatches} matches</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}