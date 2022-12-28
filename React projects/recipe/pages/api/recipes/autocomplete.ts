import { NextApiRequest, NextApiResponse } from "next";
import recipes from "../../../data/recipe.json";
import { RecipeListType } from ".";

export type RecipeAutoCompleteType = RecipeListType["results"];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecipeAutoCompleteType>
) {
    const results = recipes.results.filter((elem) => {
        if (req.query.search && req.query.search.length > 0) {
            const regex = new RegExp(`${req.query.search}`, "gi");
            const ingredients = elem.sections.flatMap((section) => {
                return section.components.map((component) => component.ingredient.name);
            });
            return (
                regex.test(elem.name) ||
                ingredients.some((ingredient) => regex.test(ingredient))
            );
        }
        return false;
    });
    res.status(200).json(results);
}
