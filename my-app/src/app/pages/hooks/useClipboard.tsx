import { useState } from "react";

export default function useClipboard() {
    const [ copied, setCopied ] = useState(false);
    
    const copyText = async(data: string) => {
        try {
            await navigator.clipboard.writeText(data);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy data: ", err);
        }
    };

    return { 
        copied,
        copyText,
    }
}