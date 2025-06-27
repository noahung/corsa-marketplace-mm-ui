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
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          message: string
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          message?: string
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      compare_items: {
        Row: {
          added_at: string | null
          id: number
          listing_id: number | null
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          id?: number
          listing_id?: number | null
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          id?: number
          listing_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compare_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      dealers: {
        Row: {
          created_at: string | null
          dealership_name: string | null
          logo_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dealership_name?: string | null
          logo_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dealership_name?: string | null
          logo_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          added_at: string | null
          listing_id: number
          user_id: string
        }
        Insert: {
          added_at?: string | null
          listing_id: number
          user_id: string
        }
        Update: {
          added_at?: string | null
          listing_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_institutions: {
        Row: {
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_rates: {
        Row: {
          age_multipliers: Json | null
          base_premium_rate: number
          coverage_type: string
          created_at: string
          effective_from: string
          effective_until: string | null
          id: string
          institution_id: string | null
          is_active: boolean
          location_multipliers: Json | null
          max_premium: number | null
          min_premium: number | null
          updated_at: string
          vehicle_age_multipliers: Json | null
        }
        Insert: {
          age_multipliers?: Json | null
          base_premium_rate: number
          coverage_type: string
          created_at?: string
          effective_from?: string
          effective_until?: string | null
          id?: string
          institution_id?: string | null
          is_active?: boolean
          location_multipliers?: Json | null
          max_premium?: number | null
          min_premium?: number | null
          updated_at?: string
          vehicle_age_multipliers?: Json | null
        }
        Update: {
          age_multipliers?: Json | null
          base_premium_rate?: number
          coverage_type?: string
          created_at?: string
          effective_from?: string
          effective_until?: string | null
          id?: string
          institution_id?: string | null
          is_active?: boolean
          location_multipliers?: Json | null
          max_premium?: number | null
          min_premium?: number | null
          updated_at?: string
          vehicle_age_multipliers?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_rates_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "financial_institutions"
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
          owner_id: string
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
          owner_id: string
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
          owner_id?: string
          price?: number
          region?: string | null
          seller_type?: string | null
          title?: string
          township?: string | null
          transmission?: string | null
          year?: number | null
        }
        Relationships: []
      }
      loan_rates: {
        Row: {
          created_at: string
          effective_from: string
          effective_until: string | null
          id: string
          institution_id: string | null
          is_active: boolean
          max_amount: number | null
          max_rate: number
          max_term_months: number
          min_amount: number | null
          min_down_payment_percent: number | null
          min_rate: number
          min_term_months: number
          product_name: string
          special_conditions: string | null
          updated_at: string
          vehicle_types: string[] | null
        }
        Insert: {
          created_at?: string
          effective_from?: string
          effective_until?: string | null
          id?: string
          institution_id?: string | null
          is_active?: boolean
          max_amount?: number | null
          max_rate: number
          max_term_months: number
          min_amount?: number | null
          min_down_payment_percent?: number | null
          min_rate: number
          min_term_months: number
          product_name: string
          special_conditions?: string | null
          updated_at?: string
          vehicle_types?: string[] | null
        }
        Update: {
          created_at?: string
          effective_from?: string
          effective_until?: string | null
          id?: string
          institution_id?: string | null
          is_active?: boolean
          max_amount?: number | null
          max_rate?: number
          max_term_months?: number
          min_amount?: number | null
          min_down_payment_percent?: number | null
          min_rate?: number
          min_term_months?: number
          product_name?: string
          special_conditions?: string | null
          updated_at?: string
          vehicle_types?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_rates_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "financial_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          id: number
          listing_id: number | null
          reason: string | null
          reported_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          reason?: string | null
          reported_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          listing_id?: number | null
          reason?: string | null
          reported_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
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
