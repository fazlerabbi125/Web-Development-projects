import React from "react";
import { useAxios, CustomAxiosResponse } from "../hooks/useAxios";
import { Flex, Card, Image as MImage, Skeleton } from "@mantine/core";
import { usePagination } from "@mantine/hooks";

interface RecipeListProps {
    tags?: string;
}

interface RecipeListType {
    count: number;
    results: Record<string, any>[];
}

type RecipeListResponse = CustomAxiosResponse<RecipeListType>;

const RecipeList = (props: RecipeListProps) => {
    const itemsPerPage = 20;
    const [page, setPage] = React.useState<number>(1);
    const {
        data: recipeList,
        error,
        isLoading,
    }: RecipeListResponse = useAxios("/recipes/list", {
        from: page - 1,
        size: itemsPerPage,
        tags: props.tags || "",
    });
    const total = React.useMemo(
        () => recipeList?.count || 0,
        [recipeList?.count]
    );
    const pagination = usePagination({ total, initialPage: 1 });
    console.log(recipeList?.results);

    if (isLoading) {
        return (
            <div className="flex justify-between gap-3 flex-wrap">
                {Array.from({ length: 6 }, (elem, idx) => (
                    <Skeleton width={300} height={275} radius="lg" key={`rlsk-${idx}`} />
                ))}
            </div>
        );
    }

    if (error)
        return (
            <div className="text-xl font-semibold text-center">{error.message}</div>
        );

    return (
        <React.Fragment>
            <Flex
                gap="xl"
                justify="space-between"
                direction="row"
                align="center"
                wrap="wrap"
            >
                {recipeList &&
                    recipeList.results.map((recipe: any) => (
                        <Card shadow="sm" p="sm" radius="md" className="w-3/12">
                            <Card.Section>
                                <MImage
                                    src={recipe.thumbnail_url}
                                    height={160}
                                    alt={recipe.thumbnail_alt_text}
                                />
                            </Card.Section>
                        </Card>
                    ))}
            </Flex>
        </React.Fragment>
    );
};

export default RecipeList;
