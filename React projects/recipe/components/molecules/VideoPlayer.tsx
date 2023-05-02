import React from "react";
import videojs, {
    VideoJsPlayer,
    VideoJsPlayerOptions,
} from "video.js";
import 'videojs-contrib-hls';

type VideoPlayerProps = {
    options: VideoJsPlayerOptions;
    onReady?(player: VideoJsPlayer): void;// function should be in useCallback if some operation is implemented
    onChange?(player: VideoJsPlayer): void;// function should be in useCallback if some operation is implemented
    videoPlayerClassName?: string;
};

export default function VideoPlayer({ options, onReady, onChange, videoPlayerClassName }: VideoPlayerProps) {
    const videoRef = React.useRef<HTMLDivElement | null>(null);
    const playerRef = React.useRef<VideoJsPlayer | null>(null);

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement('video-js'); //added with video-js class
            videoElement.classList.add('vjs-custom-theme');
            videoElement.classList.add('vjs-big-play-centered');
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
        }
    }, [onReady, options, videoRef, videoPlayerClassName]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;
        player && onChange && onChange(player);

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef, onChange]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} ></div>
        </div>
    );
};