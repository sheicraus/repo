"use client";
import {
  faCopy,
  faEllipsisVertical,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Button from "../buttons/Button";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { deleteChecklist, generateShortUrl } from "@/app/actions/serverActions";
import { useRouter, usePathname } from "next/navigation";
// import { useRouter as useRouterNavigation } from "next/router";

interface CheckListMoreProps {
  checklistId: string;
}

export default function CheckListMore({ checklistId }: CheckListMoreProps) {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleGenerateShortUrl = async () => {
    setIsLoading(true);
    onOpen();
    const res = await generateShortUrl(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}`
    );

    if (res.data) {
      setShortUrl(res.data.data.shortUrl);
    } else {
      // Set the long url when api failed
      setShortUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}`);
    }
    setIsLoading(false);
  };

  const handleDeleteChecklist = async () => {
    const res = await deleteChecklist(checklistId);
    console.log("after delete checklist", res);
    if (res.data) {
      toast({
        title: "Successfully deleted checklist!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
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

  return (
    <div>
      <Button onClick={handleGenerateShortUrl} className="px-2">
        <FontAwesomeIcon color="white" icon={faEllipsisVertical} />
      </Button>
      <Modal
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
            {isLoading ? (
              <Box className="flex items-center justify-center rounded-md bg-slate-50 p-3">
                <Spinner color="gray" />
              </Box>
            ) : (
              <Box className="flex items-center rounded-md bg-slate-50 p-1">
                <p className="text-gray-500 w-full px-2 text-sm">{shortUrl}</p>
                <Button primary onClick={handleCopy}>
                  <FontAwesomeIcon icon={faCopy} className="mr-1" />
                  Copy
                </Button>
              </Box>
            )}
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
