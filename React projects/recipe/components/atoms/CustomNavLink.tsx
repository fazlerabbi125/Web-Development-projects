import Link from "next/link";
import { useRouter } from "next/router";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  navItem__link: {
    color: "#333",
    backgroundColor: "inherit",
    cursor: "pointer",
    flex: "1 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    "&:hover": {
      color: "#fdba74",
    },
  },
  "navItem__link--active": {
    color: "#ef4444 !important",
  },
}));

interface CustomNavLinkProps {
  href: string;
  children: string;
}

function CustomNavLink(props: CustomNavLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === props.href;
  const { classes } = useStyles();

  return (
    <Link
      href={props.href}
      className={[
        classes.navItem__link,
        isActive ? classes["navItem__link--active"] : "",
      ].join(" ")}
    >
      {props.children}
    </Link>
  );
}

export default CustomNavLink;
