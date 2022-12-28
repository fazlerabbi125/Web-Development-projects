import type { NextApiRequest, NextApiResponse } from 'next'
import recipes from "../../../data/recipe.json";
import { TagDetailType } from '../tags';
//https://tailwindui.com/components/application-ui/headings/card-headings

export interface RecipeDetailsType {
    [key: string]: any;
    id: number;
    slug: string;
    name: string;
    description: string;
    tags: Array<TagDetailType>;
    sections: Array<Record<string, any>>
    thumbnail_url: string;
    thumbnail_alt_text: string;
    created_at: number;
    user_ratings: {
        count_positive: number;
        score: number | null;
        count_negative: number;
    };
    total_time_minutes: number | null;
    total_time_tier: {
        tier: string;
        display_tier: string;
    };
    instructions: Array<{
        start_time: number;
        appliance: string | null;
        end_time: number;
        temperature: number | null;
        id: number;
        position: number;
        display_text: string;
    }>;
    language: string;
    original_video_url: string | null;
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
