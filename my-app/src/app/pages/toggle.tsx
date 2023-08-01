import React from "react";
import useToggleMessage from "./hooks/useToggleMessage";

export default function Toggle() {
    const defaultValue = "Default Value";
    const toggleValue = "Toggle Value";

    const { value, setToggleValue } = useToggleMessage<string>(defaultValue, toggleValue);

    return (
        <div>
            <p>Current Value: {value}</p>
            <button onClick={() => setToggleValue()}>Toggle</button>
        </div>
    );
}
