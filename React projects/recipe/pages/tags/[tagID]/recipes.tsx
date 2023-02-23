import RecipeList from "../../../components/organisms/RecipeList";
import { useRouter } from "next/router";
import Header from "../../../components/organisms/Header";
import Head from "next/head";
import { Text } from "@mantine/core";
import { NextPage } from "next";

const TagRecipes: NextPage = () => {
    const router = useRouter();
    const tagInfo: Record<string, string> = JSON.parse(localStorage.getItem("tagInfo") || '') || {};

    return (
        <>
            <Head>
                <title>Tag Recipes</title>
            </Head>
            <Header className="text-3xl mb-2">{tagInfo?.tagName} recipes</Header>
            <Text size={20} weight={600} mb="md" className="text-yellow-100">
                Type:{" "}
                {tagInfo?.tagType?.charAt(0).toUpperCase() +
                    tagInfo?.tagType?.slice(1, tagInfo?.tagType?.length)}
            </Text>
            <RecipeList tags={parseInt(router.query?.tagID as string)} />
        </>
    );
};

export default TagRecipes;
