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
          created_at: string | null
          id: number
          is_completed: boolean | null
          updated_at: string | null
        }
        Insert: {
          checklist_id?: string | null
          completed_on?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          is_completed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          checklist_id?: string | null
          completed_on?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          is_completed?: boolean | null
          updated_at?: string | null
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
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
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
