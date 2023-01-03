import Link from "next/link";
import { useRouter } from "next/router";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  navItem__link: {
    color: "#333",
    backgroundColor: "inherit",
    cursor: "pointer",

    "&:hover": {
      color: "#fdba74",
    },
  },
  "navItem__link--active": {
    color: "#ef4444",
    backgroundColor: "inherit",
    cursor: "pointer",

    "&:hover": {
      color: "#fdba74",
    }
  }
}))

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
      className={isActive ? classes["navItem__link--active"] : classes.navItem__link}
    >
      {props.children}
    </Link>
  );
}

export default CustomNavLink;
