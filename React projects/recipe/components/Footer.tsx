import { BiCopyright } from "react-icons/bi";
import { createStyles, Group, ActionIcon } from "@mantine/core";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
  socialIcons: {
    color: "inherit",
  },
}));

export default function Footer() {
  const { classes } = useStyles();
  return (
    <footer className={`sticky-footer ${classes.inner}`}>
      <div className="sticky-footer__content">
        Fazle Rabbi Faiyaz. All rights reserved{" "}
        <BiCopyright className="inline-block" />
      </div>
      <Group spacing={10} className={classes.links} position="right" noWrap>
        <ActionIcon variant="transparent" className={classes.socialIcons}>
          <AiFillTwitterCircle size={25} />
        </ActionIcon>
        <ActionIcon variant="transparent" className={classes.socialIcons}>
          <AiFillInstagram size={25} />
        </ActionIcon>
        <ActionIcon variant="transparent" className={classes.socialIcons}>
          <AiFillYoutube size={25} />
        </ActionIcon>
      </Group>
    </footer>
  );
}
