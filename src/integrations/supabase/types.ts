export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      listings: {
        Row: {
          agent_bio: string | null
          agent_name: string
          agent_title: string
          bio: string | null
          bookmarks: number | null
          category: string
          created_at: string | null
          description: string
          id: string
          images: string[]
          is_establishment: boolean | null
          name: string
          pricing: string
          rating: number | null
          reviews: number | null
          tags: string[]
          title: string
          updated_at: string | null
          visit_url: string | null
        }
        Insert: {
          agent_bio?: string | null
          agent_name: string
          agent_title: string
          bio?: string | null
          bookmarks?: number | null
          category: string
          created_at?: string | null
          description: string
          id?: string
          images?: string[]
          is_establishment?: boolean | null
          name: string
          pricing: string
          rating?: number | null
          reviews?: number | null
          tags?: string[]
          title: string
          updated_at?: string | null
          visit_url?: string | null
        }
        Update: {
          agent_bio?: string | null
          agent_name?: string
          agent_title?: string
          bio?: string | null
          bookmarks?: number | null
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          images?: string[]
          is_establishment?: boolean | null
          name?: string
          pricing?: string
          rating?: number | null
          reviews?: number | null
          tags?: string[]
          title?: string
          updated_at?: string | null
          visit_url?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_therapist: boolean | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          is_therapist?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_therapist?: boolean | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          therapist_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          therapist_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          therapist_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          subscription_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status: string
          subscription_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          subscription_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      therapists: {
        Row: {
          agent_name: string | null
          agent_title: string | null
          bookmarks: number | null
          category: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          logo: string | null
          name: string
          pricing: string
          rating: number | null
          reviews: number | null
          tags: string[] | null
          updated_at: string
          visit_url: string | null
        }
        Insert: {
          agent_name?: string | null
          agent_title?: string | null
          bookmarks?: number | null
          category?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          logo?: string | null
          name: string
          pricing: string
          rating?: number | null
          reviews?: number | null
          tags?: string[] | null
          updated_at?: string
          visit_url?: string | null
        }
        Update: {
          agent_name?: string | null
          agent_title?: string | null
          bookmarks?: number | null
          category?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          logo?: string | null
          name?: string
          pricing?: string
          rating?: number | null
          reviews?: number | null
          tags?: string[] | null
          updated_at?: string
          visit_url?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
