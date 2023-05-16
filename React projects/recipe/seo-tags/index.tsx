import React from "react";
import Head from "next/head";
import DefaultMeta from "./metadata/DefaultMeta";
import RecipeDetailsMeta from "./metadata/RecipeDetailsMeta";

/*
OGP and its use in SEO:
https://ogp.me/
https://www.brightedge.com/blog/capturing-the-eye-of-social-media-the-power-of-the-open-graph-protocol
https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/
https://developers.facebook.com/docs/sharing/webmasters/
https://neilpatel.com/blog/open-graph-meta-tags/
*/

export interface SEOTagsProps<T = any> {
    pageProps: T;
    pathname: string;
}

export default function SEOTags({ pageProps, pathname }: SEOTagsProps) {
    return (
        <Head>
            {pathname === "/recipes/[recipeSlug]" ? (
                <RecipeDetailsMeta recipe={pageProps.recipe} />
            ) : (
                <DefaultMeta />
            )}
        </Head>
    );
}
