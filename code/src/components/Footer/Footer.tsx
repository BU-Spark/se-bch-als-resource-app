import { createStyles, Text, Container, rem } from '@mantine/core';
import Image from 'next/image'
import best_childrens_hospital_us_news from 'public/best_childrens_hospital_us_news.png'
import Link from 'next/link'
import { footerLinkData } from '@/constants/footerLinkData';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'absolute',
    height: '130px',
    display: 'flex',
    width: '100%',
    left: 0,
    bottom: 0,
    marginTop: "50px",
    marginBottom: rem(0),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: '#254885',
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    boxShadow: '0px 2px 30px rgba(180, 180, 180, 0.25)',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically


  },

  logo: {
    display: 'flex',
    alignItems: 'center', // Center logo content vertically
    maxWidth: rem(200),
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row', // Adjust if needed
      justifyContent: 'center', // Center the logo
      maxHeight: rem(80), // Adjust the height if needed]
      maxWidth: "50px",
    },
  },


  groups: {
    display: 'flex',
    alignItems: 'center', // Center group content vertically
    flexWrap: 'wrap',
    paddingLeft: rem(40),


  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: 'block',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '15px',
    paddingTop: rem(3),
    paddingBottom: rem(3),
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();
    const links = footerLinkData.map((link, index) => (
      <Link href={link.link} className={classes.link} key={index} target='_blank'>
        {link.label}
      </Link>
    ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image alt='Best hospitals logo' src={best_childrens_hospital_us_news} width={69.5} height={80}/>
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