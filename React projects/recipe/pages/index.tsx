import Head from "next/head";
import styles from "../styles/modules/Home.module.scss";
import RecipeList from "../components/RecipeList";

export default function Home() {
  return (
    <section>
      <Head>
        <title>Faiyaz's Recipes</title>
      </Head>
      <header className={styles.home_header}>
        Welcome to Faiyaz's Recipes
      </header>
      <div className="mt-12 mb-10">
        <RecipeList />
      </div>
    </section>
  );
}
