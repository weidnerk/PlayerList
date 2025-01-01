export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          user_id: string
          name: string
          team: string
          position: string
          number: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          team: string
          position: string
          number: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          team?: string
          position?: string
          number?: string
          image_url?: string | null
          created_at?: string
        }
      }
    }
  }
}