import React from "react";
import { List } from "@mantine/core";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { Inter } from "@next/font/google";
import VideoJS from "../../molecules/VideoJS";
import { RecipeInfoSectionProps } from "../RecipeBasicInfo";
import styles from "./RecipeInstructions.module.scss";

const inter = Inter({ subsets: ["latin"] });

function RecipeInstructions({ recipe }: RecipeInfoSectionProps) {
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
                // type: "video/mp4" for MP4 files, 'application/x-mpegURL' for HLS or m3u8 files
            },
        ],
    };

    const handlePlayerReady = (player: VideoJsPlayer) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        // player.ready(function () {
        //     this.playbackRate(1.5); //set default playRate
        // });

        //   const isPause = React.useRef<number>(0);
        // player.on('timeupdate', function (e) {
        //     if (isPause.current == 0 && (player.currentTime() >= 10)) {
        //         player.pause();
        //         isPause.current = 1;
        //     }
        // }); //Pause after 10s of play and then play normally on resume

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
                className={styles["recipe-instructions"]}
                classNames={{
                    item: [
                        styles["recipe-instructions__item"],
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
