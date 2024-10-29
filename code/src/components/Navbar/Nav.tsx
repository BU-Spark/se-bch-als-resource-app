import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Popover } from "@mantine/core";
import styles from "./Nav.module.css";

const Nav = () => {
 const router = useRouter();
 // Added state for sidebar expansion control
 const [isExpanded, setIsExpanded] = useState(true);
 // Added state for settings popover control
 const [isSettingsOpen, setIsSettingsOpen] = useState(false);
 
 // Added toggle function for sidebar expansion
 const toggleSidebar = () => {
   setIsExpanded(!isExpanded);
 };

 return (
   // Added collapsed class based on expansion state
   <nav className={`${styles.sidebar} ${isExpanded ? '' : styles.collapsed}`}>
     <div className={styles.sidebarInner}>
       {/* Added hamburger menu button at top */}
       <div className={styles.topSection}>
         <button 
           className={styles.toggleButton}
           onClick={toggleSidebar}
           aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
         >
           <div className={styles.hamburger}>
             <span></span>
             <span></span>
             <span></span>
           </div>
         </button>
       </div>
       
       {/* Spacer to push nav links to bottom */}
       <div className={styles.spacer} />
       
       {/* Only show nav links when sidebar is expanded */}
       {isExpanded && (
         <div className={styles.navLinks}>
           <Link 
             href="/"
             className={`${styles.navLink} ${router.pathname === "/" ? styles.active : ''}`}
           >
             Home
           </Link>
           <Link 
             href="/bookmarks"
             className={`${styles.navLink} ${router.pathname === "/bookmarks" ? styles.active : ''}`}
           >
             Bookmarks
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
                 Settings
               </div>
             </Popover.Target>

             <Popover.Dropdown>
               {/* Settings content to be implemented */}
               <div style={{ color: '#FF69B4' }}>Never Gonna Give You Up</div>
             </Popover.Dropdown>
           </Popover>
         </div>
       )}
     </div>
   </nav>
 );
};

export default Nav;
