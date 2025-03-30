
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
      therapists: {
        Row: {
          id: string
          name: string
          logo: string | null
          images: string[] | null
          rating: number | null
          reviews: number | null
          pricing: string
          description: string | null
          tags: string[] | null
          category: string | null
          featured: boolean | null
          visit_url: string | null
          bookmarks: number | null
          agent_name: string | null
          agent_title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo?: string | null
          images?: string[] | null
          rating?: number | null
          reviews?: number | null
          pricing: string
          description?: string | null
          tags?: string[] | null
          category?: string | null
          featured?: boolean | null
          visit_url?: string | null
          bookmarks?: number | null
          agent_name?: string | null
          agent_title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string | null
          images?: string[] | null
          rating?: number | null
          reviews?: number | null
          pricing?: string
          description?: string | null
          tags?: string[] | null
          category?: string | null
          featured?: boolean | null
          visit_url?: string | null
          bookmarks?: number | null
          agent_name?: string | null
          agent_title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          therapist_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          therapist_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          therapist_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string
          subscription_type: string
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status: string
          subscription_type: string
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          subscription_type?: string
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          is_therapist: boolean | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          is_therapist?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          is_therapist?: boolean | null
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
