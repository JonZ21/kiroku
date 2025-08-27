export interface Database {
  public: {
    Tables: {
      results: {
        Row: {
          id: number;
          created_at: string;
          p1_name: string;
          p2_name: string | null;
          p1_character: string | null;
          p2_character: string | null;
          winner: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          p1_name: string;
          p2_name?: string | null;
          p1_character?: string | null;
          p2_character?: string | null;
          winner?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          p1_name?: string;
          p2_name?: string | null;
          p1_character?: string | null;
          p2_character?: string | null;
          winner?: string | null;
        };
      };
      players: {
        Row: {
          id: string;
          username: string;
          created_at: string;
          wins: number;
          losses: number;
        };
        Insert: {
          id?: string;
          username: string;
          created_at?: string;
          wins?: number;
          losses?: number;
        };
        Update: {
          id?: string;
          username?: string;
          created_at?: string;
          wins?: number;
          losses?: number;
        };
      };
    };
  };
}

export type Result = Database['public']['Tables']['results']['Row'];
export type Player = Database['public']['Tables']['players']['Row'];