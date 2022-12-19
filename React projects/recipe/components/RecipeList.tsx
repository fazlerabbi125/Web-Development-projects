import React from "react";
import { useAxios, CustomAxiosResponse } from "../hooks/useAxios";
import {
    Flex,
    Card,
    Image as MImage,
    Loader,
    Text,
    Pagination,
} from "@mantine/core";
import { RecipeListType } from "../pages/api/recipes";
import Link from "next/link";

interface RecipeListProps {
    tags?: string;
}

type RecipeListResponse = CustomAxiosResponse<RecipeListType>;

const RecipeList = (props: RecipeListProps) => {
    const itemsPerPage = 9;
    const [page, setPage] = React.useState<number>(1);
    const start = (page - 1) * itemsPerPage;
    const end = (page - 1) * itemsPerPage + itemsPerPage;
    const {
        data: recipeList,
        error,
        isLoading,
    }: RecipeListResponse = useAxios("/recipes", {
        start,
        end,
        tags: props.tags || "",
    });
    const total = React.useMemo(
        () => recipeList?.count || 0,
        [recipeList?.count]
    );
    // console.log(recipeList);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center gap-3">
                <Text className="text-3xl font-semibold mb-1">Loading</Text>
                <Loader color="dark" size="sm" />
            </div>
        );
    }

    if (error)
        return (
            <div className="text-xl font-semibold text-center">{error.message}</div>
        );

    return (
        <React.Fragment>
            {recipeList && recipeList.results.length > 0 ? (
                <>
                    <Flex className="gap-20" justify="center" direction="row" wrap="wrap">
                        {recipeList.results.map((recipe: any) => (
                            <Card
                                shadow="sm"
                                p="sm"
                                radius="md"
                                className="w-3/12 relative"
                                key={recipe.id}
                            >
                                <Card.Section>
                                    <MImage
                                        src={recipe.thumbnail_url}
                                        height={200}
                                        alt={recipe.thumbnail_alt_text}
                                        width={"100%"}
                                    />
                                </Card.Section>
                                <Text weight={500}>{recipe.name}</Text>
                                <Text size="sm" color="dimmed" className="truncate">
                                    {recipe.description || "No description"}
                                </Text>
                                <div className="mt-4 flex justify-center sticky top-full">
                                    <Link
                                        className="btn btn-danger w-8/12"
                                        href={{
                                            pathname: '/recipes/[recipeSlug]',
                                            query: { recipeSlug: recipe.slug },
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </Flex>
                    <Pagination
                        page={page}
                        onChange={setPage}
                        total={Math.ceil(total / itemsPerPage)}
                        className="mt-5"
                        position="center"
                        withEdges
                        styles={(theme) => ({
                            item: {
                                backgroundColor: "#fff !important",
                                "&[data-active]": {
                                    backgroundColor: `#7c3aed !important`,
                                },
                            },
                        })}
                    />
                </>
            ) : (
                <Text align="center" weight={600} className="text-3xl">
                    No recipes found
                </Text>
            )}
        </React.Fragment>
    );
};

export default RecipeList;
