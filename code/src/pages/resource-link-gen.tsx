import { useState } from "react";

import { Button, TextInput, Box, Group } from "@mantine/core";

import CopyableLink from "../components/CopyURL/CopyUrl";
import styles from "../styles/ResourceLinkGen.module.css";

type InputField = {
  title: string;
  url: string;
};

/**
 * Enables automatic generation of
 * JSON objects to use on Typeform
 * portal for solution pages
 */
export default function ResourceLinkGenerator() {
  const [generatedJson, setGeneratedJson] = useState("");
  const [inputFields, setInputFields] = useState<InputField[]>([
    { title: "", url: "" },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof InputField,
    value: string
  ) => {
    const newInputFields = [...inputFields];
    newInputFields[index][field] = value;
    setInputFields(newInputFields);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { title: "", url: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const handleGenerateJSON = () => {
    const filteredInputFields = inputFields.filter(
      (field) => field.title.trim() !== "" || field.url.trim() !== ""
    );
    const jsonString = JSON.stringify(filteredInputFields);
    const modifiedJsonString = "[*resources*]" + jsonString + "[*resources*]";

    setGeneratedJson(modifiedJsonString);
  };

  return (
    <div className={styles.generatorContainer}>
      <Box className={styles.boxStyle}>
        {inputFields.map((field, index) => (
          <Group key={index} position="apart" className={styles.groupStyle}>
            <div className={styles.inputContainer}>
              <TextInput
                placeholder="Title"
                value={field.title}
                onChange={(event) =>
                  handleInputChange(index, "title", event.currentTarget.value)
                }
                className={styles.textInput}
              />
              <TextInput
                placeholder="URL"
                value={field.url}
                onChange={(event) =>
                  handleInputChange(index, "url", event.currentTarget.value)
                }
                className={styles.textInput}
              />
            </div>
            <Button color="red" onClick={() => handleRemoveField(index)}>
              Remove
            </Button>
          </Group>
        ))}
        <div className={styles.buttonContainer}>
          <Button
            variant="outline"
            onClick={handleAddField}
            className={styles.addButton}
          >
            Add Element
          </Button>

          <Button
            className={styles.generateButton}
            variant="outline"
            onClick={handleGenerateJSON}
          >
            Generate URL
          </Button>
        </div>

        {generatedJson && (
          <div className={styles.copyLinkContainer}>
            <CopyableLink url={generatedJson} />
          </div>
        )}
      </Box>
    </div>
  );
}
