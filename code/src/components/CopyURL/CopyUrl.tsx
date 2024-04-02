
import React, { useState, useRef } from 'react';
import { TextInput, Button, Group, Tooltip } from '@mantine/core';

interface CopyableUrlProps {
    url: string;
}

const CopyableUrl: React.FC<CopyableUrlProps> = ({ url }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand('copy');
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
                style={{ flex: 1 }}
            />
            <Tooltip
                label={copied ? "Link Copied!" : "Save Link to Clipboard"}
                withArrow
            >
                <Button
                    onClick={copyToClipboard}
                    disabled={copied}
                    style={{ backgroundColor: copied ? undefined : "#003087", fontWeight: "bold" }}
                >
                    {copied ? "Copied!" : "Copy Link"}
                </Button>
            </Tooltip>
        </Group>
    );
};

export default CopyableUrl;
