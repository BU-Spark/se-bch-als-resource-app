import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import './GlobalStyles.css'; // Assuming you have a global CSS file for the .bold-text class

const DEFAULT_FONT_SIZE = 16;
const DEFAULT_BOLD_TEXT = false;

const Settings = () => {
    const [fontSize, setFontSize] = useState(() => {
        const savedFontSize = localStorage.getItem('fontSize');
        return savedFontSize ? parseInt(savedFontSize) : DEFAULT_FONT_SIZE;
    });

    const [boldText, setBoldText] = useState(() => {
        const savedBoldText = localStorage.getItem('boldText');
        return savedBoldText === 'true';
    });

    useEffect(() => {
        // Persist fontSize to localStorage
        localStorage.setItem('fontSize', fontSize.toString());
        // Update document's font size
        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    useEffect(() => {
        // Persist boldText to localStorage
        localStorage.setItem('boldText', boldText.toString());
        // Add or remove bold-text class to the document body
        if (boldText) {
            document.body.classList.add('bold-text');
        } else {
            document.body.classList.remove('bold-text');
        }
    }, [boldText]);

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(parseInt(event.target.value));
    };

    const handleBoldTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoldText(event.target.checked);
    };

    const handleReset = () => {
        // Reset to default values
        setFontSize(DEFAULT_FONT_SIZE);
        setBoldText(DEFAULT_BOLD_TEXT);
        localStorage.removeItem('fontSize');
        localStorage.removeItem('boldText');
    };

    return (
        <div className={styles.container} style={{ fontSize: `${fontSize}px` }}>
            <div className={styles.header}>
                <h2>Settings</h2>
                {/* Reset to Default Button */}
                <button
                    onClick={handleReset}
                    style={{
                        color: 'orange',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        position: 'absolute',
                        right: '20px',
                        top: '10px',
                    }}
                >
                    Reset to Default
                </button>
            </div>

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
