import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../service/supabase";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { data, error } = await supabase
    .from('checklists')
    .insert([
      {
        title: body.title || 'Untitled',
      },
    ])
    .select();

    return NextResponse.json({data, error})
}