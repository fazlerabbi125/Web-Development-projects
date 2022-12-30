import React from "react";
import { useAxios, CustomAxiosResponse } from "../../hooks/useAxios";
import {
    Flex,
    Card,
    Image as MImage,
    Loader,
    Text,
    Stack,
} from "@mantine/core";
import ListPagination from "../molecules/ListPagination";
import CustomRating from "../atoms/CustomRating";
import { RecipeListType } from "../../pages/api/recipes";
import { RecipeDetailsType } from "../../pages/api/recipes/[recipeSlug]";
import Link from "next/link";
import styles from "../../styles/modules/RecipeList.module.scss";

interface RecipeListProps {
    tags?: number;
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
            <div className={styles.recipe_list__loading}>
                <Loader color="dark" />
            </div>
        );
    }

    if (error) {
        return <div className="response-error">{error.message}</div>;
    }

    return (
        <div className="mt-12 mb-10">
            {recipeList && recipeList.results.length > 0 ? (
                <React.Fragment>
                    <Flex className="gap-20" justify="center" direction="row" wrap="wrap">
                        {recipeList.results.map((recipe: RecipeDetailsType) => (
                            <Card
                                shadow="sm"
                                p="sm"
                                radius="md"
                                className={styles.recipe_list__card}
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
                                <Stack justify="flex-start" spacing={6}>
                                    <Text weight={500}>{recipe.name}</Text>
                                    <CustomRating value={recipe.user_ratings.score} />
                                    <Text size="sm" color="dimmed" className="truncate">
                                        {recipe.description || "No description"}
                                    </Text>
                                </Stack>
                                <div className={styles.recipe_list__card__footer}>
                                    <Link
                                        className="btn btn--danger w-8/12"
                                        href={{
                                            pathname: "/recipes/[recipeSlug]",
                                            query: { recipeSlug: recipe.slug },
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </Flex>
                    <ListPagination
                        page={page}
                        onPageChange={setPage}
                        totalPages={Math.ceil(total / itemsPerPage)}
                        className="my-5"
                        itemClassName="pagination_items"
                    />
                </React.Fragment>
            ) : (
                <Text align="center" weight={600} className="text-3xl">
                    No recipes found
                </Text>
            )}
        </div>
    );
};

export default RecipeList;
