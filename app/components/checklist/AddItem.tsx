"use client"
import { addItem } from '@/app/actions/serverActions';
import Button from '@/app/components/buttons/Button';
import { HStack, Input, useToast } from '@chakra-ui/react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useState } from 'react'

interface AddItemProps {
  checklistId: string
}

export default function AddItem({checklistId} : AddItemProps) {
  const [newItem, setNewItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleAddItem = async () => {
    setIsLoading(true);
    setNewItem("") // reset field
    const res = await addItem(checklistId, newItem);
    setIsLoading(false);
  }

  return (
    <HStack className="flex flex-row justify-center align-middle p-2">
        <Input
          className="rounded-md border-2 border-slate-300 focus:border-primary-100 focus-visible:shadow-none focus-visible:border-primary-100 focus:border-2"
          placeholder="What to do..."
          value={newItem}
          onChange={handleItemChange}
          onKeyDown={handleKeyDown}
          _focus={{borderColor: "#4D7B93", borderInlineColor: "#4D7B93"}}
        />
        <Button primary onClick={handleAddItem} isLoading={isLoading}>
          <FontAwesomeIcon icon={faAdd} className='mr-1'/>
          Add
        </Button>
      </HStack>
  )
}
