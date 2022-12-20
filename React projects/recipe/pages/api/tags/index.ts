import { NextApiRequest, NextApiResponse } from "next";
import tags from "../../../data/tags.json";

export interface TagDetailType {
    name: string;
    id: number;
    display_name: string;
    type: string;
}

export interface TagListType {
    count: number;
    results: Array<TagDetailType>;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TagListType>
) {
    tags.results.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name === b.name && a.type < b.type) return -1;
        return 1;
    });
    res.status(200).json(tags);
}
