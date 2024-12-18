import React, { useState } from "react"; //use for manage the local condition
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Slider, Switch, Group, Text, Button } from "@mantine/core";//UI
import {
  Home,
  BookmarkIcon,
  Settings as SettingsIcon,
  Type,
  Contrast,
  Bold,
} from "lucide-react";
import styles from "./Nav.module.css";

interface NavProps { //check if the nav bar is expanded or not
  isExpanded: boolean;
  onToggle: () => void;
}

//Default values for settings
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_BOLD_TEXT = false;
const DEFAULT_INVERT_COLORS = false;

const Nav: React.FC<NavProps> = ({ isExpanded, onToggle }) => { //local condition
  const router = useRouter();//check which page is the current active page
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [boldText, setBoldText] = useState(DEFAULT_BOLD_TEXT);
  const [invertColors, setInvertColors] = useState(DEFAULT_INVERT_COLORS);
  const [contrast, setContrast] = useState(100);

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}px`;
  };

  const handleBoldTextChange = (checked: boolean) => {
    setBoldText(checked);
    if (checked) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  };

  const handleSetInvertColors = (checked: boolean) => {
    setInvertColors(checked);
    if (checked) {
      document.body.classList.add("invert-colors");
    } else {
      document.body.classList.remove("invert-colors");
    }
  };

  const handleContrastChange = (value: number) => {
    setContrast(value);
    document.documentElement.style.filter = `contrast(${value}%)`;
  };

  const handleReset = () => {
    setFontSize(DEFAULT_FONT_SIZE);
    setBoldText(DEFAULT_BOLD_TEXT);
    setInvertColors(DEFAULT_INVERT_COLORS);
    setContrast(100);

    document.documentElement.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
    document.body.classList.remove("bold-text");
    document.body.classList.remove("invert-colors");
    document.documentElement.style.filter = `contrast(100%)`;
  };

  return (
    <nav className={`${styles.sidebar} ${isExpanded ? "" : styles.collapsed}`}>
      <div className={styles.sidebarInner}>
        <div className={styles.topSection}>
          <button
            className={styles.toggleButton}
            onClick={onToggle}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"} //for accessibility
          >
            <div className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          {isExpanded && <span className={styles.menuText}>Menu</span>}
        </div>

        <div className={styles.spacer} />

        <div className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              router.pathname === "/" ? styles.active : ""
            }`}
          >
            <Home size={20} className={styles.icon} />
            <span>Home</span>
          </Link>
          <Link
            href="/bookmarks"
            className={`${styles.navLink} ${
              router.pathname === "/bookmarks" ? styles.active : ""
            }`}
          >
            <BookmarkIcon size={20} className={styles.icon} />
            <span>Bookmarks</span>
          </Link>
          <Popover
            opened={isSettingsOpen}
            onChange={setIsSettingsOpen}
            position="right"
            width="50vw"
            styles={{
              dropdown: {
                width: "50vw",
                minHeight: "100vh",
                left: "250px",
                padding: "0",
                backgroundColor: "#f1f3f5",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                [`@media (max-width: 768px)`]: {
                  maxWidth:"80%",
                  minWidth: "80%",
                  height: "500px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(25%, 0)",
                  position: "absolute",
                  overflowY: "auto",
      },

              },
            }}
          >
            <Popover.Target>
              <div
                className={`${styles.navLink} ${
                  isSettingsOpen ? styles.active : ""
                }`}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                style={{ cursor: "pointer" }}
              >
                <SettingsIcon size={20} className={styles.icon} />
                <span>Settings</span>
              </div>
            </Popover.Target>

            <Popover.Dropdown>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px 20px",
                  backgroundColor: "#1e3a8a",
                  color: "#fff",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  justifyContent: "space-between",

                }}
              >
                <SettingsIcon size={24} style={{ marginRight: "10px" }} />
                <h3 style={{ margin: 0, fontSize: "1.5em" }}>
                  Accessibility Settings
                </h3>
                <Button
                  onClick={handleReset}
                  variant="subtle"
                  color="orange"
                  style={{
                    color: "orange",
                    fontSize: "0.9em",
                    padding: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reset to Default
                </Button>
              </div>

              <div
                style={{
                  padding: "20px",
                  display: "grid",
                  gap: "20px",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    minHeight: "150px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Type size={30} color="#333" style={{ marginRight: "8px" }} />
                    <Text size="sm" weight={500} style={{ color: "#333" }}>
                      Text Size
                    </Text>
                  </div>
                  <Slider
                    min={12}
                    max={24}
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    label={`${fontSize}px`}
                    styles={{
                      root: { marginTop: "10px", width: "100%" },
                      track: { height: 8, backgroundColor: "#ddd" },
                      thumb: { width: 20, height: 20, backgroundColor: "#007bff" },
                    }}
                  />
                  <Text
                    size="xs"
                    style={{ marginTop: "10px", color: "#17202a" }}
                  >
                    Use this slider to set the preferred reading size for the app
                  </Text>
                </div>

                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    minHeight: "150px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Bold size={30} color="#333" style={{ marginRight: "8px" }} />
                    <Text size="sm" weight={500} style={{ color: "#333" }}>
                      Bold Text
                    </Text>
                    <Switch
                      checked={boldText}
                      onChange={(event) =>
                        handleBoldTextChange(event.currentTarget.checked)
                      }
                      style={{ marginLeft: "auto" }}
                    />
                  </div>
                  <Text
                    size="xs"
                    style={{ marginTop: "10px", color: "#666" }}
                  >
                    Toggle to make text bold for better visibility.
                  </Text>
                </div>

                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    minHeight: "150px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Contrast
                      size={30}
                      color="#333"
                      style={{ marginRight: "8px" }}
                    />
                    <Text size="sm" weight={500} style={{ color: "#333" }}>
                      Invert Colors
                    </Text>
                    <Switch
                      checked={invertColors}
                      onChange={(event) =>
                        handleSetInvertColors(event.currentTarget.checked)
                      }
                      style={{ marginLeft: "auto" }}
                    />
                  </div>
                  <Text
                    size="xs"
                    style={{ marginTop: "10px", color: "#666" }}
                  >
                    Toggle to invert colors for a different visual experience.
                  </Text>
                </div>

                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    minHeight: "150px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Contrast
                      size={30}
                      color="#333"
                      style={{ marginRight: "8px" }}
                    />
                    <Text size="sm" weight={500} style={{ color: "#333" }}>
                      Contrast
                    </Text>
                  </div>
                  <Slider
                    min={50}
                    max={150}
                    value={contrast}
                    onChange={handleContrastChange}
                    label={`${contrast}%`}
                    styles={{
                      root: { marginTop: "10px", width: "100%" },
                      track: { height: 8, backgroundColor: "#ddd" },
                      thumb: { width: 20, height: 20, backgroundColor: "#007bff" },
                    }}
                  />
                  <Text
                    size="xs"
                    style={{ marginTop: "10px", color: "#666" }}
                  >
                    Adjust contrast to improve readability in different lighting
                    conditions.
                  </Text>
                </div>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

