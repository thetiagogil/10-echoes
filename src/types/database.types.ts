import type { Database as SharedDatabase } from "@thetiagogil/shared-db-types";

type EmptyRecord = {
  [_ in never]: never;
};

export type EchoesConcertRow = {
  artist: string;
  city: string | null;
  concert_date: string | null;
  created_at: string;
  id: number;
  is_wishlist: boolean;
  notes: string | null;
  rating: number | null;
  setlist: string | null;
  tags: string[];
  updated_at: string;
  user_id: string;
  venue: string;
};

export type EchoesConcertInsert = {
  artist: string;
  city?: string | null;
  concert_date?: string | null;
  created_at?: string;
  id?: never;
  is_wishlist?: boolean;
  notes?: string | null;
  rating?: number | null;
  setlist?: string | null;
  tags?: string[];
  updated_at?: string;
  user_id: string;
  venue: string;
};

export type EchoesConcertUpdate = {
  artist?: string;
  city?: string | null;
  concert_date?: string | null;
  created_at?: string;
  id?: never;
  is_wishlist?: boolean;
  notes?: string | null;
  rating?: number | null;
  setlist?: string | null;
  tags?: string[];
  updated_at?: string;
  user_id?: string;
  venue?: string;
};

export type EchoesSchema = {
  Tables: {
    concerts: {
      Row: EchoesConcertRow;
      Insert: EchoesConcertInsert;
      Update: EchoesConcertUpdate;
      Relationships: [
        {
          foreignKeyName: "concerts_user_id_fkey";
          columns: ["user_id"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        },
      ];
    };
  };
  Views: EmptyRecord;
  Functions: {
    create_concert: {
      Args: {
        p_artist: string;
        p_venue: string;
        p_concert_date: string | null;
        p_city?: string | null;
        p_rating?: number | null;
        p_setlist?: string | null;
        p_notes?: string | null;
        p_tags?: string[];
        p_is_wishlist?: boolean;
      };
      Returns: EchoesConcertRow;
    };
    update_concert: {
      Args: {
        p_concert_id: number;
        p_artist: string;
        p_venue: string;
        p_concert_date: string | null;
        p_city?: string | null;
        p_rating?: number | null;
        p_setlist?: string | null;
        p_notes?: string | null;
        p_tags?: string[];
        p_is_wishlist?: boolean;
      };
      Returns: EchoesConcertRow;
    };
    delete_concert: {
      Args: {
        p_concert_id: number;
      };
      Returns: EchoesConcertRow;
    };
  };
  Enums: EmptyRecord;
  CompositeTypes: EmptyRecord;
};

export type Database = Omit<SharedDatabase, "echoes"> & {
  echoes: EchoesSchema;
};
