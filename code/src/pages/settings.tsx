import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import './GlobalStyles.css'; // Assuming you have a global CSS file

const Settings = () => {
    const [fontSize, setFontSize] = useState(() => {
        const savedFontSize = localStorage.getItem('fontSize');
        return savedFontSize ? parseInt(savedFontSize) : 16;
    });

    const [boldText, setBoldText] = useState(() => {
        const savedBoldText = localStorage.getItem('boldText');
        return savedBoldText === 'true';
    });

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('boldText', boldText.toString());
    }, [boldText]);

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(parseInt(event.target.value));
    };

    const handleBoldTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoldText(event.target.checked);
    };

    return (
        <div
            className={`${styles.container} ${boldText ? 'bold-text' : ''}`}
            style={{ fontSize: `${fontSize}px` }}
        >
            <h2>Settings</h2>

            {/* Font Size Setting */}
            <div className={styles.option}>
                <label>Font Size:</label>
                <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                />
                <span>{fontSize}px</span>
            </div>

            {/* Bold Text Setting */}
            <div className={styles.option}>
                <label>Bold Text:</label>
                <input
                    type="checkbox"
                    checked={boldText}
                    onChange={handleBoldTextChange}
                />
                <span>{boldText ? 'Enabled' : 'Disabled'}</span>
            </div>
        </div>
    );
};

export default Settings;
