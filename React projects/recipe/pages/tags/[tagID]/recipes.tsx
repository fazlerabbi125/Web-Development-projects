import RecipeList from "../../../components/organisms/RecipeList";
import { useRouter } from "next/router";
import Header from "../../../components/organisms/Header";

const TagRecipes = () => {
    const router = useRouter();
    return (
        <>
            <Header className="text-4xl mb-12">
                {`Recipes from ${decodeURIComponent(router.query.tagName as string)}:`}
            </Header>
            <RecipeList tags={parseInt(router.query?.tagID as string) || undefined} />
        </>
    );
};

export default TagRecipes;
