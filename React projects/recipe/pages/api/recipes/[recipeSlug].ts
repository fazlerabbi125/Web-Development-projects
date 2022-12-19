import type { NextApiRequest, NextApiResponse } from 'next'
import recipes from "../../../data/recipe.json";

export interface RecipeDetailsType {
    [key:string]: any;
    id: number;
    slug: string;
    description?: string;
    thumbnail_url?:string;
    thumbnail_alt_text?:string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecipeDetailsType | null>
) {
    const result = recipes.results.find((elem: any) => {
        return req.query.recipeSlug === elem.slug;
    })

    res.status(200).json(result || null)
}
