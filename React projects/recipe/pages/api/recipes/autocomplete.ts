import { NextApiRequest, NextApiResponse } from "next";
import recipes from "../../../data/recipe.json";
import { RecipeListType } from ".";
import { RecipeDetailsType } from "./[recipeSlug]";

export type RecipeAutoCompleteType = RecipeListType["results"];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecipeAutoCompleteType>
) {
    const results = recipes.results.filter((elem: RecipeDetailsType) => {
        if (req.query.search && req.query.search.length > 0) {
            const regex = new RegExp(`${req.query.search}`, "gi");
            return regex.test(elem.name);
        }
        return false;
    });

    res.status(200).json(results)
}
