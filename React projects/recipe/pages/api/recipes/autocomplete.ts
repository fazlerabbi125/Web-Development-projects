import { NextApiRequest, NextApiResponse } from "next";
import recipes from "@/data/recipe.json";
import { AutocompleteItem } from "@mantine/core";

export interface RecipeAutoCompleteTypeItem extends AutocompleteItem {
    slug: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<RecipeAutoCompleteTypeItem>>
) {
    const results = recipes.results
        .filter((elem) => {
            if (req.query.search && req.query.search.length > 0) {
                const regex = new RegExp(`${req.query.search}`, "gi");
                const ingredients = elem.sections.flatMap((section) => {
                    return section.components.map(
                        (component) => component.ingredient.name
                    );
                });
                return (
                    regex.test(elem.name) ||
                    ingredients.some((ingredient) => regex.test(ingredient))
                );
            }
            return false;
        }).map((elem) => ({
            slug: elem.slug,
            value: elem.name,
        }));

    res.status(200).json(results);
}
