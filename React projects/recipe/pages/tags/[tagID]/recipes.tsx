import { useState, useEffect } from "react";
import RecipeList from "../../../components/organisms/RecipeList";
import { useRouter } from "next/router";
import Header from "../../../components/organisms/Header";
import Head from "next/head";
import { Text } from "@mantine/core";
import { NextPage } from "next";

const TagRecipes: NextPage = () => {
    const router = useRouter();
    const [tagInfo, setTagInfo] = useState<Record<string, string>>({});
    useEffect(() => {
        /*  Next.js performs a server render before the client render and so both sessionStorage and localStorage 
            is not defined on the window object.Therefore, you'll not be able to access sessionStorage and localStorage 
            until the page has loaded on the client and the window object has been defined.
            To fix this issue, you'll need to wait until the page has been mounted on the client prior to 
            accessing sessionStorage/localStorage. Here's another way of doing this:

                if (typeof window !== 'undefined') {
                // Perform localStorage action
                const item = localStorage.getItem('key')
                }
        */
        setTagInfo(JSON.parse(localStorage.getItem("tagInfo") || "{}"));
    }, []); //useEffect will only run on the client side, so you can safely access sessionStorage/localStorage here.

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
