"use client";
import {
  faCopy,
  faEllipsisVertical,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
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

export default function CheckListMore() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("copied");
      toast({
        title: "Copied!",
        status: 'success',
        duration: 800,
        isClosable: true,
        position: 'top',
      })
    } catch (err) {
      toast({
        title: "Copy to clipboard failed.",
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top',
      })
    }
};

  return (
    <div>
      <Button onClick={onOpen} className="px-2">
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
            <Box className="flex items-center rounded-md bg-slate-50 p-1">
              <p className="text-gray-500 w-full px-2">short URL here...</p>
              <Button primary onClick={handleCopy}>
                <FontAwesomeIcon icon={faCopy} className="mr-1" />
                Copy
              </Button>
            </Box>
            <p className="mt-4">Or save some space</p>
            <Button className="col-span-full text-red-600 bg-red-100 w-full mx-0">
              <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-600" />
              Delete checklist
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
