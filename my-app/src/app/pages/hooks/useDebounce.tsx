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

export default function useDebounce<T>(
  value: T,
  debounceTime: number = 500
): T {
  const [ debounceValue, setDebounceValue ] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), debounceTime);

    return () => {
      clearTimeout(timer);
    }

  }, [debounceValue, setDebounceValue, debounceTime, value])

  return debounceValue;
}
