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
    const start = parseInt(`${req.query.start}`) || 0;
    const end = parseInt(req.query.end as string) || recipes.count;
    const results = recipes.results.filter((elem: RecipeDetailsType) => {
        if (req.query.tags && req.query.tags.length > 0) {
            if (elem.tags.find((tag) => tag.name === req.query.tags)) {
                return true;
            }
            return false;
        }
        return true;
    }).slice(start, end);

    res.status(200).json({ count: recipes.count, results })
}
