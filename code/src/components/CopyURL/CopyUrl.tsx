import React, { useState, useRef } from "react";

import { TextInput, Button, Group, Tooltip } from "@mantine/core";

import styles from "./CopyUrl.module.css";

interface CopyableUrlProps {
  url: string;
}

/**
 * Component to display a URL in a text input and provides a button to copy it to the clipboard.
 * @param {string} url - The URL
 */

const CopyableUrl: React.FC<CopyableUrlProps> = ({ url }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset tooltip state after 2 seconds
    }
  };

  return (
    <Group>
      <TextInput
        value={url}
        readOnly
        ref={inputRef}
        onClick={copyToClipboard}
        className={styles.textInput}
      />
      <Tooltip
        label={copied ? "Link Copied!" : "Save Link to Clipboard"}
        withArrow
      >
        <Button
          onClick={copyToClipboard}
          disabled={copied}
          className={styles.copyButton}
        >
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </Tooltip>
    </Group>
  );
};

export default CopyableUrl;
