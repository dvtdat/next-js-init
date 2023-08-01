import { defaultMaxListeners } from "events";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { deflate } from "zlib";

type SetState<T> = Dispatch<SetStateAction<T>>;

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

export default function useStorage<T>(
  key: string,
  defaultValue?: T
): { value: T; setValue: SetState<T> } { // Pre-define the output: an object of { T; SetState<T> }

  const inputValue: T = JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue;
  // If we can't get the item, default value should be used instead.

  const [storageValue, setStorageValue] = useState<T>(inputValue);
  // Maintaining the state of the output value.

  useEffect(() => { 
    const handleStorageEvent = () => {
      console.log("Handle Event");
      setStorageValue(JSON.parse(localStorage.getItem(key) ?? ""));
    };

    window.addEventListener("local-storage", handleStorageEvent);
    return () => window.removeEventListener("local-storage", handleStorageEvent);
  }, [key]);
  // Unclear about this.

  const getValue = useCallback((): T => {
    return storageValue;
  }, [storageValue]);
  // Return the value. Unclear on useCallback.

  const setValue: SetState<T> = useCallback((value: T | ((prev: T) => T)) => {
    const newValue: T = value instanceof Function ? value(storageValue) : value;
    // Checking whether the value is a variable or a function.

    setStorageValue(newValue);
    // Update the value with block's useState.

    localStorage.setItem(key, JSON.stringify(newValue));
    // Update the value server-wise.

    window.dispatchEvent(new Event("local-storage"));
    // Unclear.
  }, [key, storageValue]);

  return {
    value: getValue(),
    setValue,
  };
}
