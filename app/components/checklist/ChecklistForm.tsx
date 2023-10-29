"use client";
import React, { useRef, useState } from "react";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import {
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { addChecklist } from "@/app/actions/serverActions";
import { useFormStatus } from "react-dom";

export default function CreatelistForm() {
  const toast = useToast();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleCreateChecklist = async (formData: FormData) => {
    setIsLoading(true);
    ref.current?.reset(); // reset form
    const res = await addChecklist(formData);
    if (res.data) {
      console.log(res.data)
      toast({
        title: "Successfully created a checklist!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
      router.push(`/checklist/${res.data[0].id}`);
    } else if (res.error) {
      console.log(res.error);
      toast({
        title: "Something went wrong",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
    setIsLoading(false);
  }

  // useEffect(() => {
  //   console.log('isloading?', isLoading)
  // }, [isLoading])


  return (
      <form action={handleCreateChecklist} className="flex flex-row items-center w-full">
        <Input
          name="title"
          className="rounded-md border-2 border-slate-300 focus:border-primary-100 focus-visible:shadow-none focus-visible:border-primary-100 focus:border-2"
          placeholder="Checklist title..."
          disabled={isLoading}
        />
        <Button type={"submit"} primary isLoading={isLoading}>
          <FontAwesomeIcon className="mr-2" icon={faAdd} />
          {isLoading ? `Creating...` : `Create`}
        </Button>
      </form>
  );
}
