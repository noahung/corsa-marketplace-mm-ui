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
      chats: {
        Row: {
          created_at: string | null
          id: number
          listing_id: number | null
          message: string
          receiver_id: number | null
          sender_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          message: string
          receiver_id?: number | null
          sender_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          message?: string
          receiver_id?: number | null
          sender_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      compare_items: {
        Row: {
          added_at: string | null
          id: number
          listing_id: number | null
          user_id: number | null
        }
        Insert: {
          added_at?: string | null
          id?: number
          listing_id?: number | null
          user_id?: number | null
        }
        Update: {
          added_at?: string | null
          id?: number
          listing_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compare_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compare_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dealers: {
        Row: {
          created_at: string | null
          dealership_name: string | null
          logo_url: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          dealership_name?: string | null
          logo_url?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          dealership_name?: string | null
          logo_url?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "dealers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          added_at: string | null
          listing_id: number
          user_id: number
        }
        Insert: {
          added_at?: string | null
          listing_id: number
          user_id: number
        }
        Update: {
          added_at?: string | null
          listing_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          id: number
          listing_id: number | null
          url: string
        }
        Insert: {
          id?: number
          listing_id?: number | null
          url: string
        }
        Update: {
          id?: number
          listing_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          color: string | null
          condition: string | null
          created_at: string | null
          description: string | null
          fuel_type: string | null
          id: number
          is_featured: boolean | null
          is_sold: boolean | null
          make: string
          mileage: number | null
          model: string
          owner_id: number
          price: number
          region: string | null
          seller_type: string | null
          title: string
          township: string | null
          transmission: string | null
          year: number | null
        }
        Insert: {
          color?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          fuel_type?: string | null
          id?: number
          is_featured?: boolean | null
          is_sold?: boolean | null
          make: string
          mileage?: number | null
          model: string
          owner_id: number
          price: number
          region?: string | null
          seller_type?: string | null
          title: string
          township?: string | null
          transmission?: string | null
          year?: number | null
        }
        Update: {
          color?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          fuel_type?: string | null
          id?: number
          is_featured?: boolean | null
          is_sold?: boolean | null
          make?: string
          mileage?: number | null
          model?: string
          owner_id?: number
          price?: number
          region?: string | null
          seller_type?: string | null
          title?: string
          township?: string | null
          transmission?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          id: number
          listing_id: number | null
          reason: string | null
          reported_by: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          reason?: string | null
          reported_by?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          reason?: string | null
          reported_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: number
          is_active: boolean
          name: string | null
          password: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          is_active?: boolean
          name?: string | null
          password: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          is_active?: boolean
          name?: string | null
          password?: string
          role?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
