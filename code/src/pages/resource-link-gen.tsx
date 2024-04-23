import { useState } from "react";
import { Button, TextInput, Box, Group } from "@mantine/core";
import CopyableLink from "../components/CopyURL/CopyUrl";
import styles from "../styles/ResourceLinkGen.module.css";

type InputField = {
  title: string;
  url: string;
};

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
    <div className={styles.resourceLinkGeneratorContainer}>
      <Box sx={{ maxWidth: 800, margin: "auto" }}>
        {inputFields.map((field, index) => (
          <Group key={index} position="apart" className={styles.inputGroup}>
            <div style={{ width: "80%" }}>
              <TextInput
                placeholder="Title"
                value={field.title}
                onChange={(event) =>
                  handleInputChange(index, "title", event.currentTarget.value)
                }
                className={styles.inputField}
              />
              <TextInput
                placeholder="URL"
                value={field.url}
                onChange={(event) =>
                  handleInputChange(index, "url", event.currentTarget.value)
                }
                style={{ width: "100%", paddingTop: "10px", fontSize: "18px" }}
              />
            </div>
            <Button color="red" onClick={() => handleRemoveField(index)}>
              Remove
            </Button>
          </Group>
        ))}
        <div style={{ gap: "20px" }}>
          <Button
            variant="outline"
            onClick={handleAddField}
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginRight: "20px",
              marginLeft: "auto",
            }}
          >
            Add Element
          </Button>

          <Button
            style={{ fontSize: "18px", marginTop: "10px", marginLeft: "auto" }}
            variant="outline"
            onClick={handleGenerateJSON}
          >
            Generate URL
          </Button>
        </div>

        {generatedJson && (
          <div style={{ marginTop: "50px" }}>
            <CopyableLink url={generatedJson} />
          </div>
        )}
      </Box>
    </div>
  );
}
