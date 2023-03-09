import recipes from "@/data/recipe.json";
import type { NextApiRequest, NextApiResponse } from "next";

export interface RecipeListType {
    count: number;
    results: typeof recipes["results"];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecipeListType>
) {
    const start = parseInt(`${req.query.start}`) || 0;
    const end = parseInt(req.query.end as string) || recipes.count;
    const results = recipes.results.filter((elem) => {
        if (req.query.tags) {
            if (
                elem.tags.find((tag) => tag.id === parseInt(req.query.tags as string))
            ) {
                return true;
            }
            return false;
        }
        return true;
    });

    res
        .status(200)
        .json({ count: results.length, results: results.slice(start, end) });
}
