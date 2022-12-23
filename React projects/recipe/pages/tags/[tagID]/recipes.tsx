import RecipeList from "../../../components/organisms/RecipeList";
import { useRouter } from "next/router";
import Header from "../../../components/organisms/Header";
import Head from "next/head";

const TagRecipes = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Tag Recipes</title>
            </Head>
            <Header className="text-3xl mb-12">
                Recipes from {decodeURIComponent(router.query.tagName as string)}:
            </Header>
            <RecipeList tags={parseInt(router.query?.tagID as string)} />
        </>
    );
};

export default TagRecipes;
