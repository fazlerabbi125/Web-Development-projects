import React from "react";
import Head from "next/head";
import styles from "../../styles/modules/RecipeDetails.module.scss";
import { fetchData } from "../../hooks/useAxios";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Card } from "@mantine/core";
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
    // console.log(recipe);
    return (
        <React.Fragment>
            <Head>
                <title>Recipe Details</title>
            </Head>
            <Card p="md" mb={"5em"} className={styles.recipe_details__card}>
                <RecipeBasicInfo
                    styles={styles}
                    recipe={recipe}
                />
                <RecipeInstructions
                    styles={styles}
                    recipe={recipe}
                />
            </Card>
        </React.Fragment>
    );
}
