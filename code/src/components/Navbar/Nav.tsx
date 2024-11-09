import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { Popover } from "@mantine/core";
import { Globe, BookmarkIcon, Settings as SettingsIcon, Menu as MenuIcon } from 'lucide-react';
import styles from "./Nav.module.css";
import { Slider } from "@mantine/core";


interface NavProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Nav: React.FC<NavProps> = ({ isExpanded, onToggle }) => {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [fontSize, setFontSize] = useState('16px');
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const newSize = event.target.value + 'px';
    setFontSize(newSize);
    document.documentElement.style.fontSize = newSize;
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
              width="50vw" // 设置弹窗宽度为半屏宽
              styles={{
                dropdown: {
                  width: '50vw', // 设置弹窗宽度
                  minHeight: '100vh', // 让弹窗和 Nav 栏同高
                  left: '250px', // 调整弹窗位置，使其与 Nav 栏对齐
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
                <div>
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
              </Popover.Dropdown>
            </Popover>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
