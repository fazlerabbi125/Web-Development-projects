import Head from "next/head";
import styles from "../styles/pages/Home.module.scss";
import RecipeList from "../components/RecipeList";

export default function Home() {
  return (
    <section>
      <Head>
        <title>Faiyaz's Recipes</title>
      </Head>
      <h1 className={styles.title}>Welcome to Faiyaz's Recipes</h1>
      <div className="mt-12 mb-10">
        <RecipeList />
      </div>
    </section>
  );
}
