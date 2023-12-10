import { useRef } from "react";

const useScrollToBottom = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  return { scrollContainerRef, scrollToBottom };
};

export default useScrollToBottom;
