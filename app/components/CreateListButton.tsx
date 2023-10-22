"use client";
import React, { ChangeEvent, useState } from "react";
import Button from "./buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function CreateListButton() {
  const toast = useToast();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateChecklist = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checklist', {
        method: 'POST',
        body: JSON.stringify({ title: title }),
      });

      const result = await response.json();

      if (result.data) {
        toast({
          title: "Successfully created a checklist!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
        router.push(`/checklist/${result.data[0].id}`);
      } else {
        toast({
          title: "Something went wrong",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
      } 
    } catch (error) {
      console.error('An error occurred:', error);
    }
    setIsLoading(false);
  }


  return (
    <Container className="flex flex-row items-center">
      <Input
        className="rounded-md border-2 border-slate-300 focus:border-primary-100 focus-visible:shadow-none focus-visible:border-primary-100 focus:border-2"
        placeholder="Checklist title..."
        value={title}
        onChange={handleTitleChange}
      />
      <Button primary onClick={handleCreateChecklist} isLoading={isLoading}>
        <FontAwesomeIcon className="mr-2" icon={faAdd} />
        Create
      </Button>
    </Container>
  );
}
