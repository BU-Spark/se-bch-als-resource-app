import Image from "next/image";
import Link from "next/link";

import { Container } from "@mantine/core";

import best_childrens_hospital_us_news from "public/best_childrens_hospital_us_news.png";
import { footerLinkData } from "@/constants/footerLinkData";
import { useStyles } from "@/utils/FooterStyle";

/**
 * Footer component that displays a list of links and a logo.
 */
export function Footer() {
  const { classes } = useStyles();
  const links = footerLinkData.map((link, index) => (
    <Link href={link.link} className={classes.link} key={index} target="_blank">
      {link.label}
    </Link>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image
            alt="Best hospitals logo"
            src={best_childrens_hospital_us_news}
            width={69.5}
            height={80}
          />
        </div>
        <div className={classes.groups}>
          <div key={0} className={classes.wrapper}>
            {links}
          </div>
        </div>
      </Container>
    </footer>
  );
}
