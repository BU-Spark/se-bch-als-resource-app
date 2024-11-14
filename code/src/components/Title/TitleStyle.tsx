import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles(
  (theme, { backgroundImageUrl }: { backgroundImageUrl: string }) => ({
    wrapper: {
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: rem(203),
      backgroundImage: `linear-gradient(0deg, rgba(0, 48, 135, 0.5), rgba(0, 48, 135, 0.5)), url(${backgroundImageUrl})`,
    },

    chevron: {
      transition: "transform 200ms ease",
      position: "absolute",
      left: rem(14),
      top: "15.36%",
      color: "#FFFFFF",
    },

    inner: {
      position: "absolute",
      left: rem(24),
      bottom: rem(24),
      zIndex: 1,
      width: "auto",
      height: "auto",
    },

    title: {
      fontWeight: 600,
      fontSize: rem(35),
      fontStyle: "normal",
      letterSpacing: rem(-1),
      paddingRight: theme.spacing.xs,
      color: theme.white,
      marginBottom: rem(8),
      textAlign: "left",
      fontFamily: `Montserrat, ${theme.fontFamily}`,
      lineHeight: rem(51),
      paddingLeft: rem(10),

      [theme.fn.smallerThan("xs")]: {
        fontSize: rem(35),
        textAlign: "left",
        paddingLeft: rem(10),
      },
    },

    subtitleWrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      padding: "8px 16px",
      borderRadius: "4px",
      display: "inline-block",
      marginTop: rem(4),
    },

    subtitle: {
      color: theme.white,
      fontSize: rem(16),
      fontWeight: 400,
      lineHeight: 1.4,
    },

    printButton: {
      position: "absolute",
      right: rem(20),
      top: rem(16),
      color: theme.white,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s, transform 0.2s",
      padding: "16px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      justifyContent: "center",

      "&:hover": {
        background: "rgba(255, 255, 255, 0.2)",
        transform: "scale(1.05)",
      },
    },

    printIcon: {
      color: "white",
      minWidth: "32px",
      height: "32px",
      flexShrink: 0,
    },

    modalContent: {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      transition: "all 0.3s ease",

      "@media print": {
        display: "none",
      },

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        padding: "16px",
      },
    },

    modalTopSection: {
      display: "flex",
      gap: "24px",
      alignItems: "flex-start",
      justifyContent: "space-between",

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      },
    },

    qrCodeContainer: {
      flex: "0 0 auto",
      padding: "20px",
      backgroundColor: "transparent",
      border: "1px solid #eaeaea",
      borderRadius: theme.radius.md,
      marginRight: "24px",

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginRight: 0,
      },
    },

    shareLinkSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "16px",

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        width: "100%",
        alignItems: "center",
        textAlign: "center",
      },
    },

    modalTitle: {
      color: "#254885",
      fontWeight: "bold",
      fontSize: "1.7em",
      marginBottom: "8px",
    },

    shareText: {
      color: "#68759c",
      fontSize: "14px",
      marginBottom: "8px",
    },

    collectionSection: {
      marginTop: "20px",
    },

    collectionTitle: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#254885",
      marginBottom: "16px",
    },

    bookmarksList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        width: "100%",
      },
    },

    bookmarkItem: {
      padding: "16px",
      backgroundColor: theme.colors.gray[0],
      borderRadius: "4px",

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        padding: "12px",
      },
    },

    bookmarkDescription: {
      color: "#68759c",
      fontSize: "14px",
      marginTop: "4px",
    },

    doneButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#1E4279",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "16px",

      "&:hover": {
        backgroundColor: "#15325d",
      },
    },

    printPreviewButton: {
      backgroundColor: "#1E4279",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      padding: "12px 24px",
      fontSize: "16px",
      height: "auto",
      minHeight: "44px",
      lineHeight: "1.5",

      "&:hover": {
        backgroundColor: "#15325d",
      },
    },

    printOnlyContent: {
      display: "none",
      "@media print": {
        display: "block",
        padding: "40px",
        position: "static",
        width: "auto",
        height: "auto",
      },
    },

    printQrSection: {
      marginBottom: "30px",
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      width: "fit-content",
      margin: "0 auto 30px auto",
      backgroundColor: "white",
    },

    printUrlSection: {
      marginBottom: "30px",
      wordBreak: "break-all",
      textAlign: "center",
      fontSize: "14px",
    },

    printTitleSection: {
      fontSize: "24px",
      fontWeight: 600,
      textAlign: "center",
      marginBottom: "30px",
    },

    printBookmarksList: {
      display: "block",
      gap: "16px",
    },

    printBookmarkItem: {
      padding: "12px 0",
      borderBottom: "1px solid #eaeaea",
      display: "block",
    },

    [theme.fn.smallerThan("xs")]: {
      printButton: {
        right: rem(12),
        top: rem(12),
        padding: "8px 12px",
      },
    },
  })
);