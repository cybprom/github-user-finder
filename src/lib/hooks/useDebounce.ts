"use client";

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Only set a timeout if the value has actually changed
    const timeout = setTimeout(() => {
      console.log("setting new debounced value");
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if the value changes before the delay
    return () => {
      console.log("clearing the timeout");

      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
