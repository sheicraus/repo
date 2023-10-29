"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "../service/supabase";

export const getChecklist = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("checklists")
      .select("*, checklist_items(*)")
      .eq("id", id)
      .filter("is_deleted", "eq", false)
      .filter("checklist_items.is_deleted", "eq", false);

    return { data };
  } catch (error) {
    return { error };
  }
};

export const addChecklist = async (formData: FormData) => {
  const title = formData.get("title");

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

    // revalidateTag("checklist");
    revalidatePath('/checklist/[id]', 'page')

    return {data}
    
  } catch (error) {
    return {error}
  }
}
