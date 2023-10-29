"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "../service/supabase";
import { ChecklistItem } from "../types/types";

export const getChecklist = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("checklists")
      .select("*, checklist_items(*)")
      .eq("id", id)
      .order('id', { foreignTable: 'checklist_items', ascending: false })

    return { data };
  } catch (error) {
    return { error };
  }
};

export const addChecklist = async (title: string) => {
  try {
    const { data, error } = await supabase
      .from("checklists")
      .insert([
        {
          title: title || "Untitled",
        },
      ])
      .select();

    console.log("addChecklist data", data);
    return { data };
  } catch (error) {
    console.log("addChecklist err", error);
    return { error };
  }
};

export async function addItem(checklistId: string, content: string) {
  try {
    const { data, error } = await supabase
      .from("checklist_items")
      .insert([
        {
          checklist_id: checklistId,
          content,
        },
      ])
      .select();

    revalidatePath('/checklist/[id]', 'page')

    return {data} 
  } catch (error) {
    return {error}
  }
}

export async function updateItem(item: ChecklistItem) {
  try {
    const { data, error } = await supabase
    .from('checklist_items')
    .update(item)
    .eq('id', item.id)
    .select()

    revalidatePath('/checklist/[id]', 'page')

    return {data} 
  } catch (error) {
    return {error}
  }
}

export async function deleteItem(itemId: string) {
  try {
    const { error } = await supabase
    .from('checklist_items')
    .delete()
    .eq('id', itemId)

    revalidatePath('/checklist/[id]', 'page')
  } catch (error) {
   
  }
}
