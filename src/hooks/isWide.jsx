import { useState, useCallback, useEffect } from "react";

function isWideHelper(width) {
  return width > 820;
}

export function useIsWide() {
  const [status, setStatus] = useState(isWideHelper(window.innerWidth));

  const resizeHandler = useCallback((e) => {
    const width = e.currentTarget.innerWidth;
    setStatus(isWideHelper(width));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return status;
}
