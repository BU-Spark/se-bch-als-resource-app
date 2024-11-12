import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { Popover, Slider, Switch, Group, Text } from "@mantine/core";
import { Globe, BookmarkIcon, Settings as SettingsIcon, Type, Contrast, EyeOff, Bold } from 'lucide-react';
import styles from "./Nav.module.css";

interface NavProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Nav: React.FC<NavProps> = ({ isExpanded, onToggle }) => {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [boldText, setBoldText] = useState(false);
  const [invertColors, setInvertColors] = useState(false); 

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

    // Define the handleSetInvertColors function
    const handleSetInvertColors = (checked: boolean) => {
      setInvertColors(checked);
      if (checked) {
        document.body.classList.add("invert-colors"); // Add class to invert colors
      } else {
        document.body.classList.remove("invert-colors"); // Remove class
      }
    };

  return (
    <nav className={`${styles.sidebar} ${isExpanded ? '' : styles.collapsed}`}>
      <div className={styles.sidebarInner}>
        {isExpanded && (
          <div className={styles.logoWrapper}>
            <Image
              src="/Boston_Children's_Hospital_logo.png" 
              alt="Logo"
              width={250}
              height={100}
              className={styles.logo}
            />
          </div>
        )}

        <div className={styles.topSection}>
          <button 
            className={styles.toggleButton}
            onClick={onToggle}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
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
        
        {isExpanded && (
          <div className={styles.navLinks}>
            <Link 
              href="/"
              className={`${styles.navLink} ${router.pathname === "/" ? styles.active : ''}`}
            >
              <Globe size={20} className={styles.icon} />
              <span>Home</span>
            </Link>
            <Link 
              href="/bookmarks"
              className={`${styles.navLink} ${router.pathname === "/bookmarks" ? styles.active : ''}`}
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
                  width: '50vw',
                  minHeight: '100vh',
                  left: '250px',
                  padding: '0',
                  backgroundColor: '#f1f3f5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Popover.Target>
                <div 
                  className={`${styles.navLink} ${isSettingsOpen ? styles.active : ''}`}
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  style={{ cursor: 'pointer' }}
                >
                  <SettingsIcon size={20} className={styles.icon} />
                  <span>Settings</span>
                </div>
              </Popover.Target>

              <Popover.Dropdown>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px 20px',
                  backgroundColor: '#1e3a8a',
                  color: '#fff',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}>
                  <SettingsIcon size={24} style={{ marginRight: '10px' }} />
                  <h3 style={{ margin: 0, fontSize: '1.5em' }}>Accessibility Settings</h3>
                </div>

                <div style={{ padding: '20px', display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
                  
                  {/* adjust text size */}
                  <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '150px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Type size={30} color="#333" style={{ marginRight: '8px' }} /> {/* Icon with space to the right */}
                      <Text size="sm" weight={500} style={{ color: '#333' }}>Text Size</Text> {/* Text next to the icon */}
                    </div>
                    
                    <Slider
                      min={12}
                      max={24}
                      value={fontSize}
                      onChange={handleFontSizeChange}
                      label={`${fontSize}px`}
                      styles={{
                        root: { marginTop: '10px', width: '100%' },
                        track: { height: 8, backgroundColor: '#ddd' },
                        thumb: { width: 20, height: 20, backgroundColor: '#007bff' },
                      }}
                    />
                    
                    <Text size="xs" style={{ marginTop: '10px', color: '#17202a' }}>
                      Use this slider to set the preferred reading size for the app
                    </Text>
                  </div>


                  {/* Bold Text */}
                  <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '150px' }}>
                  {/* Icon and title in a single row */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Bold size={30} color="#333" style={{ marginRight: '8px' }} /> {/* Icon with space to the right */}
                    <Text size="sm" weight={500} style={{ color: '#333' }}>Bold Text</Text> {/* Text right next to the icon */}
                    <Switch
                      checked={boldText}
                      onChange={(event) => handleBoldTextChange(event.currentTarget.checked)}
                      style={{ marginLeft: 'auto' }}
                    />
                  </div>
                  
                  <Text size="xs" style={{ marginTop: '10px', color: '#666' }}>
                    Toggle to make text bold for better visibility.
                  </Text>
                </div>



                  {/* invert color */}
                  <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '150px' }}>
                  {/* Icon and title in a single row */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Contrast size={30} color="#333" style={{ marginRight: '8px' }} /> {/* Icon */}
                    <Text size="sm" weight={500} style={{ color: '#333' }}>Invert Colors</Text> {/* Title */}
                    <Switch
                      checked={invertColors}
                      onChange={(event) => setInvertColors(event.currentTarget.checked)}
                      style={{ marginLeft: 'auto' }} // Align switch to the far right
                    />
                  </div>

                  <Text size="xs" style={{ marginTop: '10px', color: '#666' }}>
                    Toggle to invert colors for a different visual experience.
                  </Text>
                </div>


                  {/* Contrast */}
                  <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '150px' }}>
                  {/* Icon and title in a single row */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Contrast size={30} color="#333" style={{ marginRight: '8px' }} /> {/* Icon */}
                    <Text size="sm" weight={500} style={{ color: '#333' }}>Contrast</Text> {/* Title */}
                  </div>

                  <Slider
                    min={0}
                    max={100}
                    value={50}
                    onChange={() => {}}
                    styles={{
                      root: { marginTop: '10px', width: '100%' },
                      track: { height: 8, backgroundColor: '#ddd' },
                      thumb: { width: 20, height: 20, backgroundColor: '#007bff' },
                    }}
                  />

                  <Text size="xs" style={{ marginTop: '10px', color: '#666' }}>
                    Adjust contrast to improve readability in different lighting conditions.
                  </Text>
                </div>

                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
