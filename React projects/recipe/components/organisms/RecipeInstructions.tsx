import React from "react";
import { RecipeInfoSectionProps } from "./RecipeBasicInfo";
import { List } from "@mantine/core";
import videojs, { VideoJsPlayer } from "video.js";
import VideoJS, { VideoJSProps } from "../molecules/VideoJS";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function RecipeInstructions({ styles, recipe }: RecipeInfoSectionProps) {
    const playerRef = React.useRef<null | VideoJsPlayer>(null);

    const videoJsOptions: VideoJSProps["options"] = {
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
        ],
    };

    const handlePlayerReady = (player: VideoJsPlayer) => {
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
            {recipe.original_video_url && (
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            )}
            <List
                type="ordered"
                mt="xl"
                className={styles.recipe_details__card__instructions}
                classNames={{
                    item: [
                        styles.recipe_details__card__instructions__item,
                        inter.className,
                    ].join(" "),
                }}
            >
                {recipe.instructions.map((instruction) => (
                    <List.Item key={instruction.id}>{instruction.display_text}</List.Item>
                ))}
            </List>
        </React.Fragment>
    );
}

export default RecipeInstructions;
