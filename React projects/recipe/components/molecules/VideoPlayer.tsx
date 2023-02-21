import React from "react";
import videojs, {
    VideoJsPlayer,
    VideoJsPlayerOptions,
} from "video.js";

type VideoPlayerProps = {
    options: VideoJsPlayerOptions;
    onReady?(player: VideoJsPlayer): void;
    onChange?(player: VideoJsPlayer): void;
    width?: string;
    videoPlayerClassName?: string;
};

export default function VideoPlayer({ options, onReady, width, onChange, videoPlayerClassName }: VideoPlayerProps) {
    const videoRef = React.useRef<HTMLDivElement | null>(null);
    const playerRef = React.useRef<VideoJsPlayer | null>(null);

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement('video-js'); //added with video-js class
            videoElement.classList.add('vjs-custom-theme');
            videoElement.classList.add('vjs-big-play-centered');
            videoElement.style.width = width || '';
            videoPlayerClassName && videoElement.classList.add(videoPlayerClassName);
            videoRef.current?.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            }));

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay || false);
            player.src(options.sources || '');
            onChange && onChange(player);
        }
    }, [width, onReady, options, videoRef, onChange, videoPlayerClassName]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} ></div>
        </div>
    );
};