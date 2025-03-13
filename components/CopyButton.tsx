"use client";
import { useState } from "react";

const CopyButton = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((err) => console.error("Failed to copy URL:", err));
    }
  };

  return (
    <div className="card-actions justify-end">
      <button
        className="btn btn-primary border-black outline  border-solid rounded-md p-4 mt-2 "
        style={{ backgroundColor: "floralwhite" }}
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyButton;
