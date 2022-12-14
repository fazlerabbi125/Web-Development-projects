import Head from "next/head";
import Image from "next/image";
import styles from "../styles/pages/Home.module.scss";
import RecipeList from "../components/RecipeList";
import { Container } from '@mantine/core';

export default function Home() {
  return (
    <section>
      <Head>
        <title>Faiyaz's Recipes</title>
      </Head>
      <Container size="lg" px="xl">
        <h1 className={styles.title}>Welcome to Faiyaz's Recipes</h1>
        <RecipeList />
      </Container>
    </section>
  );
}
