import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../service/supabase";
import { revalidateTag } from "next/cache";

// Create checklist
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from("checklists")
    .insert([
      {
        title: body.title || "Untitled",
      },
    ])
    .select();

  return NextResponse.json({ data, error });
}

// Get checklist with checklist items (dynamic route handler)
// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

//   const { data, error } = await supabase
//     .from("checklists")
//     .select("*, checklist_items(*)")
//     .eq("id", id);

//   // revalidateTag("checklist")

//   return NextResponse.json({ data, error });
// }