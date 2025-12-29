import { useEffect, useRef } from "react";

const useScrollToBottom = (dependency) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [dependency]);

  return containerRef;
};

export default useScrollToBottom;
