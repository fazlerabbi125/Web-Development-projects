import { BiCopyright } from "react-icons/bi";
import { createStyles, Group, ActionIcon } from "@mantine/core";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import styles from "../styles/modules/Footer.module.scss"

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      gap: theme.spacing.md,
    },
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginLeft: "-5px",
    },
    "&>*": {
      color: "inherit !important",
    }
  }
}));

export default function Footer() {
  const { classes } = useStyles();
  return (
    <footer className={[styles["sticky-footer"], classes.inner].join(" ")}>
      <div className={styles["sticky-footer__content"]}>
        Fazle Rabbi Faiyaz. All rights reserved{" "}
        <BiCopyright className="inline-block" />
      </div>
      <Group spacing={10} className={classes.links} position="right" noWrap>
        <ActionIcon variant="transparent">
          <AiFillTwitterCircle size={25} />
        </ActionIcon>
        <ActionIcon variant="transparent">
          <AiFillInstagram size={25} />
        </ActionIcon>
        <ActionIcon variant="transparent">
          <AiFillYoutube size={25} />
        </ActionIcon>
      </Group>
    </footer>
  );
}
