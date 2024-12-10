import React from "react";
import { useState } from "react";
import { Header, Container, Group, Burger, rem } from "@mantine/core";
import {useRouter} from "next/router";
import NavList from "../NavList/NavList";
import styles from "./SideBar.module.css";

const HEADER_HEIGHT = "100vh";

/**
 *  Nav component for the navigation bar
 */
const SideBar = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setOpened(!opened);
  };

  const links = [
    { title: "Home", path: "/", onClick: toggleMenu },
    { title: "Bookmarks", path: "/bookmarks", onClick: toggleMenu },
  ];

  return (
    <Header height={HEADER_HEIGHT} className={styles.header}>
      <Container className={styles.inner} fluid>

        <Burger
          size="lg"
          color="#fff"
          opened={opened}
          onClick={toggleMenu}
        />
        {opened && <NavList links={links} />}
        <div className={styles.bottomIcons}>
          <Group align="center" spacing="md">
            <div className={styles.iconContainer} onClick={() => router.push("/")}>
              <img src="/Home.svg" alt="Home" className={styles.icon} />
              <span>Home</span>
            </div>
            <div className={styles.iconContainer} onClick={() => router.push("/bookmarks")}>
              <img src="Bookmark.svg" alt="Bookmark" className={styles.icon} />
              <span>Bookmark</span>
            </div>
            <div className={styles.iconContainer}>
              <img src="Settings.svg" alt="Settings" className={styles.icon} />
              <span>Settings</span>
            </div>
            <div className={styles.iconContainer}>
              <img src="Expand.svg" alt="ExpandIcon" className={styles.icon} />
              <span></span>
            </div>
          </Group>
        </div>
      </Container>
    </Header>
  );
};

export default SideBar;
