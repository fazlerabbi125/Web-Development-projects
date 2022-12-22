import Head from "next/head";
import RecipeList from "../components/organisms/RecipeList";

export default function Home() {
  return (
    <section>
      <Head>
        <title>Faiyaz's Recipes</title>
      </Head>
      <header className="text-zinc-50	text-center	text-5xl mb-16">
        Welcome to Faiyaz's Recipes
      </header>
      <RecipeList />
    </section>
  );
}
