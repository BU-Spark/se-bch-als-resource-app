import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { Popover } from "@mantine/core";
import { Globe, BookmarkIcon, Settings as SettingsIcon, Menu as MenuIcon } from 'lucide-react';
import styles from "./Nav.module.css";
import {useState} from "react";

interface NavProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Nav: React.FC<NavProps> = ({ isExpanded, onToggle }) => {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className={`${styles.sidebar} ${isExpanded ? '' : styles.collapsed}`}>
      <div className={styles.sidebarInner}>
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
            width={200}
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
              <div className={styles.easteregg}>Never Gonna Give You Up</div>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

