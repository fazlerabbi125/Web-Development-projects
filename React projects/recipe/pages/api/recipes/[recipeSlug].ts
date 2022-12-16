import type { NextApiRequest, NextApiResponse } from 'next'
import recipes from "../../../data/recipe.json";

export type RecipeDetailsType = Record<string, any>|null;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecipeDetailsType>
) {
    console.log(req.query)
    const result = recipes.results.find((elem: any) => {
        return req.query.recipeSlug === elem.slug;
    })

    res.status(200).json(result||null)
}
