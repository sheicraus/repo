"use client";
import Button from "@/components/buttons/Button";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  HStack,
  Input,
  ListItem,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface ChecklistItem {
  text: string;
  checked: boolean;
  createdAt: Date;
  checkedOn: Date | null;
}

export default function Checklist() {
  const [title, setTitle] = useState("Untitled checklist");
  const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setChecklists([
        ...checklists,
        {
          text: newItem,
          checked: false,
          createdAt: new Date(),
          checkedOn: null,
        },
      ]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedChecklists = [...checklists];
    updatedChecklists.splice(index, 1);
    setChecklists(updatedChecklists);
  };

  const handleToggleCheck = (index: number) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].checked = !updatedChecklists[index].checked;
    updatedChecklists[index].checkedOn = updatedChecklists[index].checked
      ? new Date()
      : null;
    setChecklists(updatedChecklists);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  useEffect(() => {
    document.title = title === "" ? "Untitled checklist" : title
  }, [title]);

  return (
    <div className="min-h-screen w-screen bg-primaryBg">
      <div className="p-3 bg-secondary-50 text-white flex flex-row items-center justify-center">
        <EditIcon fontSize={24} className="mr-4" />
        <Input
          className="font-bold text-2xl line-clamp-1"
          variant="unstyled"
          size="lg"
          placeholder="Checklist title..."
          value={title}
          onChange={handleTitleChange}
        />
        
      </div>
      <HStack className="flex flex-row justify-center align-middle p-2">
        <Input
          className="border-secondary-50 rounded-lg"
          placeholder="What to do..."
          value={newItem}
          onChange={handleItemChange}
          onKeyDown={handleKeyDown}
          _focus={{borderColor: "#4D7B93", borderInlineColor: "#4D7B93"}}
        />
        <Button primary onClick={handleAddItem}>
          <span className="pr-2">
            <AddIcon fontSize={12} />
          </span>
          Add
        </Button>
      </HStack>
      <UnorderedList styleType="none" className="mt-3">
        {checklists.map((item, index) => (
          <ListItem
            key={index}
            className="mr-4 p-2 px-3 rounded-md flex flex-row m-1 bg-slate-300"
          >
              <Checkbox
                className="align-top col-span-10 w-full"
                checked={item.checked}
                onChange={() => handleToggleCheck(index)}
                ringColor="gray.900"
              >
                <div
                  className={`ml-2 flex-wrap ${
                    item.checked ? "line-through" : "first-letter:"
                  }`}
                >
                  {item.text}
                </div>
                <div className="ml-2">
                  {item.checkedOn && (
                    <small className="text-slate-500 text-xs">
                      Completed on: {item.checkedOn?.toLocaleString()}
                    </small>
                  )}
                </div>
              </Checkbox>
              
              <Tooltip label='Remove' className=" col-span-2 rounded-md" fontSize={10}>
                <DeleteIcon
                  className="text-gray-400 cursor-pointer mt-1"
                  onClick={() => handleDeleteItem(index)}
                  fontSize={12}
                />
              </Tooltip>
            
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
}
