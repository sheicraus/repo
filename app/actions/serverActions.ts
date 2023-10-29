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

    return { data, error };
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

    return { data };
  } catch (error) {
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
    .update({
      ...item
    })
    .eq('id', item.id)
    .select()

    revalidatePath('/checklist/[id]', 'page')

    return {data, error} 
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
export async function deleteChecklist(checklistId: string) {
  try {
    const { error } = await supabase
    .from('checklists')
    .delete()
    .eq('id', checklistId)

    return {data: "Deleted successfully!", error}
  } catch (error) {
    return {error: "Failed to delete checklist."}
   
  }
}

export async function generateShortUrl(url: string) {
  try {
    const res = await fetch('https://tini.fyi/api/v1/url/create', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TINI_TOKEN}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        destination: url,
      }),
    });

    if (!res.ok) {
      // You can handle non-successful HTTP responses here, if needed.
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return {data};
  } catch (error) {
    console.error(error);
    return {error};
  }
}



