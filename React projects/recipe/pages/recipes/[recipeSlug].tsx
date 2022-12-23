import React from "react";
import { fetchData } from "../../hooks/useAxios";
import { Card, Text } from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import Head from "next/head";
import styles from "../../styles/modules/RecipeDetails.module.scss";

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
    // console.log(recipe);
    return (
        <React.Fragment>
            <Head>
                <title>Recipe Details</title>
            </Head>
            <Card p="md" className={styles.recipe_details__card}>
                <Text>{recipe.name}</Text>
            </Card>
        </React.Fragment>
    );
}
