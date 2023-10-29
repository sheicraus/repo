import React, { ButtonHTMLAttributes } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  isLoading?: boolean;
}

export default function Button({
  type,
  className,
  primary,
  secondary,
  isLoading,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  // Define CSS classes based on the props
  const buttonClasses = `
    ${primary ? "bg-primary-100 text-white" : ""}
    ${secondary ? "bg-white text-primary-100" : ""}
    ${isLoading ? "cursor-not-allowed" : ""}
  `;
  const hoverButtonClasses = `
    ${primary ? "#F8A675" : ""}
    ${secondary ? "#6C8999" : ""}
  `;

  // console.log('isloading?', isLoading)

  return (
    <ChakraButton
      type={type || "button"}
      className={`m-1 px-5 py-2 rounded-lg ${buttonClasses} ${className || ""}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      isLoading={isLoading}
      _hover={{
        bg: hoverButtonClasses
      }}
    >
      {children}
    </ChakraButton>
  );
}
