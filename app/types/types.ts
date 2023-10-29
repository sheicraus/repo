export interface ChecklistItem {
  id: string;
  checklist_id: string;
  content: string;
  created_on: Date;
  updated_on: Date | null;
  completed_on: Date | null;
  is_completed: boolean;
}

export interface CheckListItemsProps {
  items: ChecklistItem[];
}