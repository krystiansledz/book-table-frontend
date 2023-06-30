import { useToast, UseToastOptions } from "@chakra-ui/react";
import { AxiosError } from "axios";

const useToasts = () => {
  const toast = useToast();

  const fireSuccessToast = (title: string) =>
    toast({
      title,
      status: "success",
      ...sharedOptions,
    });

  const fireErrorToast = (title: string) =>
    toast({
      title,
      status: "error",
      ...sharedOptions,
    });

  const fireRequestErrorToast = (error: AxiosError) => {
    const title = error.response?.data
      ? Object.values(error.response.data).join("\n")
      : error.message;

    return toast({
      title,
      status: "error",
      ...sharedOptions,
    });
  };

  const fireInfoToast = (title: string) =>
    toast({
      title,
      status: "info",
      ...sharedOptions,
    });

  return {
    fireSuccessToast,
    fireErrorToast,
    fireRequestErrorToast,
    fireInfoToast,
  };
};

const sharedOptions: Omit<UseToastOptions, "title" | "status"> = {
  isClosable: false,
  duration: 3000,
  position: "top-right",
};

export default useToasts;
