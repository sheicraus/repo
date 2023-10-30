"use client";
import { deleteItem, updateItem } from "@/app/actions/serverActions";
// import { supabase } from "@/app/service/supabase";
import { formatDate } from "@/app/service/utils";
import { CheckListItemsProps, ChecklistItem } from "@/app/types/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, ListItem, Tooltip, UnorderedList } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Real-time checklist items
 */
export default function CheckListItems({ checklistId, items }: CheckListItemsProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { 
          event: "*", 
          schema: "public", 
          table: "checklist_items", 
          filter: `checklist_id=eq.${checklistId}`, // listen only to row-level changes
        },
        () => {
          router.refresh();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const handleToggleCheck = async (item: ChecklistItem) => {
    const res = await updateItem({
      ...item,
      is_completed: !item.is_completed,
      completed_on: !item.is_completed ? new Date() : null,
      updated_on: new Date(),
    });
  };
  const handleDeleteItem = async (itemId: any) => {
    await deleteItem(itemId);
  };

  return (
    <UnorderedList styleType="none" className="mt-3">
      {items.map((item) => (
        <ListItem
          key={item.id}
          className="mr-4 p-2 px-3 rounded-md flex flex-row m-1 bg-slate-300"
        >
          <Checkbox
            className="align-top col-span-10 w-full"
            isChecked={item.is_completed}
            onChange={() => handleToggleCheck(item)}
            variant="circular"
          >
            <div
              className={`ml-2 flex-wrap ${
                item.is_completed ? "line-through" : ""
              }`}
            >
              {item.content}
            </div>
            <div className="ml-2">
              {item.completed_on && (
                <small className="text-slate-500 text-xs">
                  Completed on:{" "}
                  {formatDate(item.completed_on?.toLocaleString())}
                </small>
              )}
            </div>
          </Checkbox>

          <Tooltip
            label="Remove"
            className=" col-span-2 rounded-md"
            fontSize={10}
          >
            <DeleteIcon
              className="text-gray-400 cursor-pointer mt-1"
              onClick={() => handleDeleteItem(item.id)}
              fontSize={18}
            />
          </Tooltip>
        </ListItem>
      ))}
    </UnorderedList>
  );
}
