import type { NextApiRequest, NextApiResponse } from 'next'
import recipes from "../../../data/recipe.json";
import { RecipeDetailsType } from './[recipeSlug]';

export interface RecipeListType {
    count: number;
    results: Array<RecipeDetailsType>;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecipeListType>
) {
    const results = recipes.results.filter((elem: RecipeDetailsType) => {
        return true;
    }).slice(parseInt(`${req.query.start}`), parseInt(req.query.end as string))

    res.status(200).json({ count: recipes.count, results })
}
