import React from "react";
import CheckListItems from "../../components/checklist/CheckListItems";
import AddItem from "../../components/checklist/AddItem";
import CheckListMore from "@/app/components/modals/CheckListMore";
import { getChecklist } from "@/app/actions/serverActions";
import { notFound } from "next/navigation";

export const revalidate = 0; // fresh data to be fetched on every single request,

export default async function Checklist({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getChecklist(id);

  if (res.data) {
    return (
      <div className="min-h-screen w-screen bg-primaryBg">
        <div className="px-3 bg-secondary-50 text-white flex flex-row items-center justify-between">
          <div className="col-span-8">
            <h1 className="font-bold text-2xl line-clamp-1 px-2 py-1">
              {res.data[0].title}
            </h1>
          </div>
          <CheckListMore checklistId={id} shortUrl={res.data[0].short_url}/>
        </div>
        <AddItem checklistId={id} />
        <CheckListItems items={res.data[0].checklist_items} />
      </div>
    );
  } else {
    return (
     notFound()
    );
  }
}
