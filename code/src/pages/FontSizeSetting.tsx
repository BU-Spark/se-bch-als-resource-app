import React, { useState } from "react";
import { Slider } from "@mantine/core";
import styles from "./Settings.module.css"; 

const FontSizeSetting: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}px`;
  };

  return (
    <div className={styles.fontSizeContainer}>
      <h4 className={styles.title}>调整字体大小</h4>
      <div className={styles.sliderContainer}>
        <span className={styles.label}>小</span>
        <Slider
          value={fontSize}
          onChange={handleFontSizeChange}
          min={12}
          max={24}
          step={1}
          styles={{
            track: { height: '8px', backgroundColor: '#e0e0e0' },
            thumb: { width: '20px', height: '20px', backgroundColor: '#007bff' },
          }}
          label={`${fontSize}px`}
        />
        <span className={styles.label}>大</span>
      </div>
      <div className={styles.fontSizePreview} style={{ fontSize: `${fontSize}px` }}>
        {fontSize}px
      </div>
    </div>
  );
};

export default FontSizeSetting;
