import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import FontSizeSetting from "./FontSizeSetting";

const Settings = () => {
    const [fontSize, setFontSize] = useState('16px');

    useEffect(() => {
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            setFontSize(savedFontSize);
            document.documentElement.style.fontSize = savedFontSize;
        }
    }, []);

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = event.target.value + 'px';
        setFontSize(newSize);
        document.documentElement.style.fontSize = newSize;
        localStorage.setItem('fontSize', newSize);
    };

    return (
        <div className={styles.container}>
            <h2>Settings</h2>
            <div className={styles.option}>
                <label>Font Size:</label>
                <input
                    type="range"
                    min="12"
                    max="24"
                    value={parseInt(fontSize)}
                    onChange={handleFontSizeChange}
                />
                <span>{fontSize}</span>
            </div>
            {/* 可以在这里添加更多功能按钮 */}
        </div>
    );
};

export default Settings;
