import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabase } from "@/app/service/supabase";

// Get checklist and its items
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const checklistId = params.id;

  const { data, error } = await supabase
    .from("checklists")
    .select("*, checklist_items(*)")
    .eq("id", checklistId)
    .filter('is_deleted', 'eq', false)
    .filter('checklist_items.is_deleted', 'eq', false);

  return NextResponse.json({ data, error });
}