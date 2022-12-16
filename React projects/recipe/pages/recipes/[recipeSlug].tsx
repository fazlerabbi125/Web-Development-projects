import React from "react";
import { axInstance } from "../../hooks/useAxios";
import { Skeleton } from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import { AxiosError, AxiosResponse } from "axios";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const res: AxiosResponse = await axInstance(`/recipes/${context.params?.recipeSlug}`);
    const recipe: RecipeDetailsType = res.data;

    if (!recipe) {
        return {
            notFound: true,
        }
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
    return <div>RecipeDetails</div>;
}
