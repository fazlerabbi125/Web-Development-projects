import Head from "next/head";
import RecipeList from "../components/organisms/RecipeList";
import Header from "../components/organisms/Header";

export default function Home() {
  return (
    <section>
      <Head>
        <title>Faiyaz's Recipes</title>
      </Head>
      <Header className="text-center text-5xl mb-16">
        Welcome to Faiyaz's Recipes
      </Header>
      <RecipeList />
    </section>
  );
}
