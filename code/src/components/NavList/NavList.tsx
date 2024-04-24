import React from "react";
import Link from "next/link";

import styles from "./NavList.module.css";

interface NavLink {
  title: string;
  path: string;
  onClick?: () => void;
}

interface NavListProps {
  links: NavLink[];
}

/**
 * Displays navigation links.
 * @param {NavListProps} props - List of links
 */
const NavList: React.FC<NavListProps> = ({ links }) => {
  return (
    <div className={styles.navList}>
      <ul className={styles.navListUl}>
        {links.map((link, index) => (
          <li key={index} className={styles.navListItem}>
            <Link legacyBehavior href={link.path}>
              <a className={styles.navLink} onClick={link.onClick}>
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavList;
