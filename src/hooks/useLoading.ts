import { useState } from "react";

type UseLoadingResult = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const useLoading = (): UseLoadingResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
