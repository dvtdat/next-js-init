import { useCallback, useState } from "react";

type SetState<T> = () => void;

export default function useTheme<T>(
    defaultTheme: T,
    alternativeTheme?: T,
): { theme: T, toggleTheme: SetState<T>} {

    const [ theme, setTheme ] = useState<T>(defaultTheme);

    const getTheme = useCallback((): T => {
        return theme;
    }, [theme]);

    const toggleTheme: SetState<T> = useCallback(() => {
        setTheme((prevValue) =>
            prevValue === defaultTheme ? (alternativeTheme !== undefined ? alternativeTheme : defaultTheme) : defaultTheme
        );
    }, [defaultTheme, alternativeTheme]);

    return {
        theme: getTheme(),
        toggleTheme,
    };
};