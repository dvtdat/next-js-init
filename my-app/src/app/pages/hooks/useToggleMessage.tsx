import { useCallback, useState } from "react";

type SetState<T> = () => void;

export default function useToggleMessage<T>(
    defaultValue: T,
    toggleValue?: T,
): { value: T; setToggleValue: SetState<T> } {
    const [currentValue, setCurrentValue] = useState<T>(defaultValue);

    const getValue = useCallback((): T => {
        return currentValue;
    }, [currentValue]);

    const setToggleValue: SetState<T> = useCallback(() => {
        setCurrentValue((prevValue) =>
            prevValue === defaultValue ? (toggleValue !== undefined ? toggleValue : defaultValue) : defaultValue
        );
    }, [defaultValue, toggleValue]);

    return {
        value: getValue(),
        setToggleValue,
    };
}
