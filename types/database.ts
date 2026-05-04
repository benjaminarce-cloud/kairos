export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      canvas_connections: {
        Row: {
          id: string;
          user_id: string;
          canvas_base_url: string;
          encrypted_token: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          canvas_base_url: string;
          encrypted_token: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          canvas_base_url?: string;
          encrypted_token?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      assignments: {
        Row: {
          id: string;
          user_id: string;
          canvas_assignment_id: number;
          canvas_course_id: number;
          name: string;
          description: string | null;
          due_at: string | null;
          workflow_state: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          canvas_assignment_id: number;
          canvas_course_id: number;
          name: string;
          description?: string | null;
          due_at?: string | null;
          workflow_state?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          canvas_assignment_id?: number;
          canvas_course_id?: number;
          name?: string;
          description?: string | null;
          due_at?: string | null;
          workflow_state?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
