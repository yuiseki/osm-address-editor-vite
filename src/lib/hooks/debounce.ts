// https://zenn.dev/luvmini511/articles/4924cc4cf19bc9

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T | undefined, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
