import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "./Nav.module.css";

const Nav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const links = [
    { title: "Home", path: "/" },
    { title: "Bookmarks", path: "/bookmarks" },
    { title: "Settings", path: "/settings" }
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`${styles.sidebar} ${isExpanded ? '' : styles.collapsed}`}>
      <div className={styles.sidebarInner}>
        <div className={styles.topSection}>
          <button 
            className={styles.toggleButton}
            onClick={toggleSidebar}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        
        <div className={styles.spacer} />
        
        <div className={styles.navLinks}>
          {links.map((link) => (
            <Link 
              key={link.path}
              href={link.path}
              className={`${styles.navLink} ${
                router.pathname === link.path ? styles.active : ''
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
