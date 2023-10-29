import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../service/supabase";
import { revalidateTag } from "next/cache";

// Create checklist item/task
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
  .from('checklist_items')
  .insert([
    { 
      checklist_id: body.checklistId, 
      content: body.content 
    },
  ])
  .select()

  revalidateTag("checklist");

  return NextResponse.json({ data, error });
}