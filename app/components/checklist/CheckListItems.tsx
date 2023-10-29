"use client"
import { deleteItem, updateItem } from "@/app/actions/serverActions";
import { formatDate } from "@/app/service/utils";
import { CheckListItemsProps, ChecklistItem } from "@/app/types/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, ListItem, Tooltip, UnorderedList } from "@chakra-ui/react";
import React from "react";

export default function CheckListItems({ items }: CheckListItemsProps) {
  console.log('items', items)

  const handleToggleCheck =  async (item: ChecklistItem) => {
    const res = await updateItem({
      ...item, 
      is_completed: !item.is_completed,
      completed_on: !item.is_completed ? new Date() : null
    });
    console.log('after update', res)
  }
  const handleDeleteItem =  async (itemId: string) => {
    await deleteItem(itemId);
  }


  return (
    <UnorderedList styleType="none" className="mt-3">
    {items.map((item) => (
      <ListItem
        key={item.id}
        className="mr-4 p-2 px-3 rounded-md flex flex-row m-1 bg-slate-300"
      >
          <Checkbox
            className="align-top col-span-10 w-full"
            checked={item.is_completed}
            onChange={() => handleToggleCheck(item)}
            ringColor="gray.900"
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
                  Completed on: {formatDate(item.completed_on?.toLocaleString())}
                </small>
              )}
            </div>
          </Checkbox>
          
          <Tooltip label='Remove' className=" col-span-2 rounded-md" fontSize={10}>
            <DeleteIcon
              className="text-gray-400 cursor-pointer mt-1"
              onClick={() => handleDeleteItem(item.id)}
              fontSize={12}
            />
          </Tooltip>
        
      </ListItem>
    ))}
  </UnorderedList>
  );
}
