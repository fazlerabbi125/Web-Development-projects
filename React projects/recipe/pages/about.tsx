import { Card, Text, createStyles } from "@mantine/core";
import Head from "next/head";
import { NextPage } from "next";

const useStyles = createStyles((theme) => ({
  heading: {
    color: theme.fn.darken(theme.colors.red[8], 0.05),
    fontWeight: 600,
    fontSize: "2.25rem",
    marginBottom: "0.75rem",
    borderBottom: "1px solid gainsboro",
    paddingLeft: "1rem",
  }
}));

const About: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Card>
        <Card.Section>
          <Text className={classes.heading}>About Faiyaz's Recipes</Text>
        </Card.Section>
        <Text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            faucibus nisi ac varius condimentum. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla vitae leo vel est faucibus
            tincidunt. Nulla at nulla tincidunt, imperdiet ante in, mollis
            turpis. Donec ornare, lacus vel lacinia suscipit, felis quam
            lobortis arcu, nec convallis nibh dui quis libero. In et lectus ac
            justo mollis posuere. Vivamus dolor eros, molestie id risus ut,
            commodo maximus diam. Etiam ac diam sollicitudin, facilisis orci in,
            interdum nibh. Sed ligula lacus, tempor id nisi et, tempus dapibus
            tortor. Vestibulum vitae nisl quis ipsum placerat tempus et eget
            lacus. Ut faucibus, neque id imperdiet pellentesque, est diam
            hendrerit quam, ac pretium erat tortor ut tortor. Aenean vitae
            ligula laoreet, luctus diam vel, lacinia nisl. Aliquam sodales
            cursus augue, in sodales nulla molestie eu. Donec dignissim lorem
            vel vestibulum vestibulum. Pellentesque dapibus porttitor
            ullamcorper.
          </p>
          <p>
            Phasellus libero augue, ullamcorper at mi nec, laoreet dictum
            mauris. Fusce imperdiet sollicitudin justo. Aliquam sagittis
            dignissim nunc a molestie. In libero nulla, volutpat vel imperdiet
            id, dapibus sit amet lacus. Aenean nec massa ut quam egestas lacinia
            sit amet nec nisl. Cras laoreet dictum ligula eget pharetra. Sed
            ullamcorper nunc in neque auctor, ac lobortis libero fringilla.
            Curabitur eu porttitor nisi, quis pharetra arcu. Donec condimentum
            turpis id efficitur vestibulum.
          </p>
          <p>
            Mauris vel placerat ante. Curabitur pellentesque felis turpis, id
            scelerisque mi pharetra vitae. Donec in tincidunt nisi. In commodo
            metus ac enim porttitor ullamcorper. Praesent ultrices maximus justo
            et rutrum. Nulla vitae est porttitor, feugiat lectus sed, porta
            mauris. Suspendisse vestibulum mi eget vulputate vulputate. Etiam
            ultrices ante libero, non lobortis tellus mattis non. Integer mauris
            erat, fringilla id laoreet nec, dignissim ac urna. Suspendisse vel
            congue dolor. Integer id lorem eleifend eros luctus maximus quis sed
            neque. Suspendisse orci eros, eleifend id nisl quis, finibus finibus
            turpis. Suspendisse et diam lorem. Sed ornare convallis sem eget
            porttitor. Aenean aliquam ante arcu, sed sodales urna finibus ut.
            Pellentesque finibus, augue et cursus pharetra, dolor eros auctor
            purus, sed venenatis felis nulla nec turpis.
          </p>
        </Text>
      </Card>
    </>
  );
};

export default About;
