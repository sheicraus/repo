"use client"
import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, ListItem, Tooltip, UnorderedList } from "@chakra-ui/react";
import React from "react";

interface ChecklistItem {
  id: string;
  checklis_idid: string;
  content: string;
  created_at: Date;
  updated_at: Date | null;
  completed_at: Date | null;
  is_completed: boolean;
  is_deleted: boolean;
}

interface CheckListItemsProps {
  items: ChecklistItem[];
}

export default function CheckListItems({ items }: CheckListItemsProps) {
  console.log('items', items)
  return (
    <UnorderedList styleType="none" className="mt-3">
    {items.map((item, index) => (
      <ListItem
        key={index}
        className="mr-4 p-2 px-3 rounded-md flex flex-row m-1 bg-slate-300"
      >
          <Checkbox
            className="align-top col-span-10 w-full"
            checked={item.is_completed}
            // onChange={() => handleToggleCheck(index)}
            ringColor="gray.900"
          >
            <div
              className={`ml-2 flex-wrap ${
                item.is_completed ? "line-through" : "first-letter:"
              }`}
            >
              {item.content}
            </div>
            <div className="ml-2">
              {item.completed_at && (
                <small className="text-slate-500 text-xs">
                  Completed on: {item.completed_at?.toLocaleString()}
                </small>
              )}
            </div>
          </Checkbox>
          
          <Tooltip label='Remove' className=" col-span-2 rounded-md" fontSize={10}>
            <DeleteIcon
              className="text-gray-400 cursor-pointer mt-1"
              // onClick={() => handleDeleteItem(index)}
              fontSize={12}
            />
          </Tooltip>
        
      </ListItem>
    ))}
  </UnorderedList>
  );
}
