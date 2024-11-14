import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Footer} from "@/components/Footer/Footer";
import { Header, Container, Group, Burger, rem } from "@mantine/core";
import NavList from "../NavList/NavList";
import styles from "./Nav.module.css";

interface NavProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Nav: React.FC<NavProps> = ({ isExpanded, onToggle }) => {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Header height={HEADER_HEIGHT} className={styles.header}>
      <Container className={styles.inner} fluid>
        <Group>
          <Link href="/">
            <Image
              src="/Boston_Children's_Hospital_logo.png"
              alt="BCH Logo"
              width={110}
              height={50}
              className={styles.logoContainer}
            />
          </Link>
        </Group>
        {opened && <NavList links={links} />}
      </Container>
    </Header>
  );
};

export default Nav;
