export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          name: string | null;
          title: string | null;
          bio: string | null;
          email: string | null;
          location: string | null;
          avatar_url: string | null;
          resume_url: string | null;
          social: Json;
          skills: Json;
          projects: Json;
          experience: Json;
          education: Json;
          template: string;
          primary_color: string;
          accent_color: string;
          font: string;
          dark_mode: boolean;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          name?: string | null;
          title?: string | null;
          bio?: string | null;
          email?: string | null;
          location?: string | null;
          avatar_url?: string | null;
          resume_url?: string | null;
          social?: Json;
          skills?: Json;
          projects?: Json;
          experience?: Json;
          education?: Json;
          template?: string;
          primary_color?: string;
          accent_color?: string;
          font?: string;
          dark_mode?: boolean;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string;
          name?: string | null;
          title?: string | null;
          bio?: string | null;
          email?: string | null;
          location?: string | null;
          avatar_url?: string | null;
          resume_url?: string | null;
          social?: Json;
          skills?: Json;
          projects?: Json;
          experience?: Json;
          education?: Json;
          template?: string;
          primary_color?: string;
          accent_color?: string;
          font?: string;
          dark_mode?: boolean;
          published?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience row type
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
