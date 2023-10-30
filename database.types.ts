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
      checklist_items: {
        Row: {
          checklist_id: string | null
          completed_on: string | null
          content: string | null
          created_on: string | null
          id: number
          is_completed: boolean | null
          updated_on: string | null
        }
        Insert: {
          checklist_id?: string | null
          completed_on?: string | null
          content?: string | null
          created_on?: string | null
          id?: number
          is_completed?: boolean | null
          updated_on?: string | null
        }
        Update: {
          checklist_id?: string | null
          completed_on?: string | null
          content?: string | null
          created_on?: string | null
          id?: number
          is_completed?: boolean | null
          updated_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          }
        ]
      }
      checklists: {
        Row: {
          created_on: string | null
          id: string
          short_url: string | null
          title: string | null
          updated_on: string | null
        }
        Insert: {
          created_on?: string | null
          id?: string
          short_url?: string | null
          title?: string | null
          updated_on?: string | null
        }
        Update: {
          created_on?: string | null
          id?: string
          short_url?: string | null
          title?: string | null
          updated_on?: string | null
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
