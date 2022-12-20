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
        if (req.query.tags && req.query.tags.length > 0) {
            if (elem.tags.find((tag) => tag.name === req.query.tags)) {
                return true;
            }
            return false;
        }
        return true;
    }).slice(parseInt(`${req.query.start}`), parseInt(req.query.end as string))

    res.status(200).json({ count: recipes.count, results })
}
