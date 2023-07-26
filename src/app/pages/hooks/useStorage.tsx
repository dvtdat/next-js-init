import { defaultMaxListeners } from "events";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { deflate } from "zlib";

// useCallback

type SetState<T> = Dispatch<SetStateAction<T>>;

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

export default function useStorage<T>(
  key: string,
  defaultValue?: T
): { value: T; setValue: SetState<T> } {
  const inputValue: T =
    JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue;
  const [storageValue, setStorageValue] = useState<T>(inputValue);

  useEffect(() => {
    const handleStorageEvent = () => {
      console.log("Handle Event");
      setStorageValue(JSON.parse(localStorage.getItem(key) ?? ""));
    };

    window.addEventListener("local-storage", handleStorageEvent);
    return () =>
      window.removeEventListener("local-storage", handleStorageEvent);
  }, [key]);

  const getValue = useCallback((): T => {
    return storageValue;
  }, [storageValue]);

  const setValue: SetState<T> = useCallback((value: T | ((prev: T) => T)) => {
    const newValue: T = value instanceof Function ? value(storageValue) : value;
    setStorageValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new Event("local-storage"));
  }, [key, storageValue]);

  return {
    value: getValue(),
    setValue,
  };
}
