import React, { useState } from "react";
import useClipboard from "./hooks/useClipboard";

export default function Clipboard() {
  const { copied, copyText } = useClipboard();
  const [pasteText, setPasteText] = useState("");

  const textToCopy = "Hello my name is Dat";

  const handleCopy = () => {
    copyText(textToCopy);
  };

  const handlePaste = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPasteText(event.target.value);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">{textToCopy}</h2>
      <button
        className="px-4 py-2 rounded bg-blue-500 text-white"
        onClick={handleCopy}
      >
        Copy to Clipboard
      </button>
      {copied && (
        <p className="text-green-600 mt-2">Text Copied!</p>
      )}

      <textarea
        className="border p-2 mt-2 w-full resize-none text-black"
        rows={4}
        value={pasteText}
        onChange={handlePaste}
        placeholder="Paste data here..."
      />
    </div>
  );
}
