"use client";
import React, { useEffect } from "react";
import {
  faCopy,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { deleteChecklist, generateShortUrl } from "@/app/actions/serverActions";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface CheckListMoreProps {
  checklistId: string;
  shortUrl: string;
}

export default function CheckListMore({
  checklistId,
  shortUrl,
}: CheckListMoreProps) {
  const toast = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteChecklist = async () => {
    const res = await deleteChecklist(checklistId);
    if (res.data) {
      toast({
        title: "Successfully deleted checklist!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      onClose();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      toast({
        title: "Failed to delete checklist!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: "Copied!",
        status: "success",
        duration: 800,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Copy to clipboard failed.",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };


  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { 
          event: "DELETE", 
          schema: "public", 
          table: "checklists",
          filter: `id=eq.${checklistId}` // listen only to row-level changes
        },
        () => {
          console.log(`Checklist ID: ${checklistId} has been deleted!`)
          router.push('/');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <div>
      <Button onClick={onOpen} className="px-2">
        <FontAwesomeIcon color="white" icon={faEllipsisVertical} />
      </Button>
      <Modal
        size={`sm`}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More options</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mb-3">
            <p>Share to collaborate! 🔥</p>
            <Box className="flex items-center rounded-md bg-slate-50 p-1">
              <p className="text-gray-500 w-full px-2 text-sm">{shortUrl}</p>
              <Button primary onClick={handleCopy}>
                <FontAwesomeIcon icon={faCopy} className="mr-1" />
                Copy
              </Button>
            </Box>
            <p className="mt-4">Or save some space</p>
            <Button
              className="col-span-full text-red-600 bg-red-100 w-full mx-0 hover:bg-red-200"
              onClick={handleDeleteChecklist}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-600" />
              Delete checklist
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
