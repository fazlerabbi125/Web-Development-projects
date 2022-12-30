import React from "react";
import Head from "next/head";
import styles from "../../styles/modules/RecipeDetails.module.scss";
import { fetchData } from "../../hooks/useAxios";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {
    Card,
    Title,
    Button as MButton,
    Stack,
    Text,
    Tabs,
} from "@mantine/core";
import CustomRating from "../../components/atoms/CustomRating";
import RecipeBasicInfo from "../../components/organisms/RecipeBasicInfo";
import RecipeInstructions from "../../components/organisms/RecipeInstructions";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const recipe: RecipeDetailsType = await fetchData(
        `/recipes/${context.params?.recipeSlug}`
    );

    if (!recipe) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            recipe,
        },
    };
}

export default function RecipeDetails({
    recipe,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [activeTab, setActiveTab] = React.useState<string | null>('info');

    return (
        <React.Fragment>
            <Head>
                <title>Recipe Details</title>
            </Head>
            <Card p="md" mb={"5em"} className={styles.recipe_details__card}>
                <Stack justify="flex-start" spacing={6} mb="sm">
                    <Title className={styles.recipe_details__card__header}>
                        {recipe.name}
                    </Title>
                    <CustomRating value={recipe.user_ratings.score} />
                    <Text size="md" color="dimmed">
                        <strong>Published:</strong> {new Date(recipe.created_at).toLocaleDateString()}
                    </Text>
                </Stack>
                <Card.Section px="md" pt={3} pb="md" className="border border-solid border-gray-400 mb-8">
                    {recipe.tags.length > 0 ? (
                        <>
                            <Text size={21} weight={600}>
                                Tags:
                            </Text>
                            <div className={styles.recipe_details__card__tags}>
                                {recipe.tags.map((tag) => (
                                    <MButton color="dark" radius="xl" key={tag.id}>
                                        {tag.display_name}
                                    </MButton>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Text size={21} weight={600}>
                            Tags: N/A
                        </Text>
                    )}
                </Card.Section>
                <section className="mb-8">
                    <Tabs value={activeTab} variant="outline" onTabChange={setActiveTab}
                        classNames={
                            {
                                tabLabel: "text-[18px]"
                            }
                        }
                    >
                        <Card.Section>
                            <Tabs.List mb="xl">
                                <Tabs.Tab value="info">Basic Info</Tabs.Tab>
                                <Tabs.Tab value="instructions">Instructions</Tabs.Tab>
                            </Tabs.List>
                        </Card.Section>
                        <Tabs.Panel value="info">
                            <RecipeBasicInfo
                                styles={styles}
                                recipe={recipe}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="instructions">
                            <RecipeInstructions
                                styles={styles}
                                recipe={recipe}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </section>
            </Card>
        </React.Fragment>
    );
}
