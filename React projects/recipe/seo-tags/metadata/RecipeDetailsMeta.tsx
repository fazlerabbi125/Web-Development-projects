import { RecipeDetailsType } from "@/pages/api/recipes/[recipeSlug]";
import cultery from "@/public/assets/images/cutlery.svg";

interface RecipeDetailsMetaProps {
    recipe: RecipeDetailsType;
}

export default function RecipeDetailsMeta({ recipe }: RecipeDetailsMetaProps) {
    return (
        <>
            <title>{recipe.name}</title>
            <meta property="og:title" content={recipe.name} />
            <meta property="og:type" content="article" />
            <meta
                property="og:url"
                content={(process.env.NEXT_PUBLIC_HOST || "") + "/recipe/" + recipe.slug}
            />
            <meta property="og:image" content={recipe.thumbnail_url} />
            <meta name="description" content={recipe.description || ""} />
            <meta property="og:site_name" content="Faiyaz's Recipes" />
        </>
    );
}
