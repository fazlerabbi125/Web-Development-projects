import React from "react";
import { fetchData } from "../../hooks/useAxios";
import { Card, Text, Button as MButton } from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import Head from "next/head";
import styles from "../../styles/modules/RecipeDetails.module.scss";
import VideoJS from "../../components/molecules/VideoJS";
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";

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
    const playerRef = React.useRef<null | VideoJsPlayer>(null);

    const videoJsOptions: VideoJsPlayerOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        // poster: recipe.thumbnail_url,
        playbackRates: Array.from({ length: 8 }, (elem, idx) => 0.25 * (idx + 1)),
        controlBar: {
            pictureInPictureToggle: false,
            currentTimeDisplay: true,
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
        },
        sources: [
            {
                src: recipe.original_video_url || "",
                type: "video/mp4",
            },
        ]
    };

    const handlePlayerReady = (player: VideoJsPlayer) => {
        // player.defaultPlaybackRate(1.5);
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        player.on("dispose", () => {
            videojs.log("player will dispose");
        });
    };
    return (
        <React.Fragment>
            <Head>
                <title>Recipe Details</title>
            </Head>
            <Card p="md" mb={"5em"} className={styles.recipe_details__card}>
                <Text className={styles.recipe_details__card__header}>
                    {recipe.name}
                </Text>
                {recipe.tags.length > 0 ? (
                    <>
                        <Text size={22} weight={600}>Tags:</Text>
                        <div className={styles.recipe_details__card__tags}>
                            {recipe.tags.map((tag) => (
                                <div className="btn btn-dark rounded-full" key={tag.id}>
                                    {tag.display_name}
                                </div>
                            ))}
                        </div>

                    </>
                )

                    : (<Text className="text-2xl" weight={600}>Tags: N/A</Text>)}

                {recipe.original_video_url && (
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                )}
            </Card>
        </React.Fragment>
    );
}
