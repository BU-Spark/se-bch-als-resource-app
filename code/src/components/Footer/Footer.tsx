import Image from "next/image";
import Link from "next/link";
import { Container } from "@mantine/core";
import best_childrens_hospital_us_news from "public/best_childrens_hospital_us_news.png";
import { footerLinkData } from "@/constants/footerLinkData";
import { useStyles } from "@/components/Footer/FooterStyle";

interface FooterProps {
  isNavExpanded?: boolean;
}

export function Footer({ isNavExpanded = true }: FooterProps) {
  const { classes, cx } = useStyles();
  const links = footerLinkData.map((link, index) => (
    <Link href={link.link} className={classes.link} key={index} target="_blank">
      {link.label}
    </Link>
  ));

  return (
    <footer className={cx(classes.footer, { [classes.footerCollapsed]: !isNavExpanded })}>
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