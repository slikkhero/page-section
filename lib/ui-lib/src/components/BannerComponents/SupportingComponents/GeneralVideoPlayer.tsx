"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { VscMute, VscUnmute } from "react-icons/vsc";

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  aspectRatio: number;
  radius?: number;
  autoPlay?: boolean;
  canUnmute?: boolean; // <-- New prop
}

const GeneralVideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  thumbnail,
  aspectRatio,
  radius,
  autoPlay = true,
  canUnmute = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [aspectRatioVal, setAspectRatio] = useState(1);
  const [isMuted, setIsMuted] = useState(true); // <-- Mute state

  const handleMetadataLoad = (e: any) => {
    const { videoWidth, videoHeight } = e.target;
    const newRatio = videoHeight ? videoWidth / videoHeight : 1;
    setAspectRatio(newRatio);
  };

  useEffect(() => {
    setAspectRatio(aspectRatio);
  }, [aspectRatio]);

  // IntersectionObserver to pause/play when in/out of view
  useEffect(() => {
    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          try {
            if (!entry.isIntersecting && videoRef.current) {
              videoRef.current.pause();
            }
            if (entry.isIntersecting && videoRef.current && autoPlay) {
              videoRef.current.play();
            }
          } catch (error: any) {
            console.error("Error handling video playback:", error);
          }
        },
        { threshold: 0.5 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        try {
          observer.disconnect();
        } catch (error) {
          console.error("Error disconnecting observer:", error);
        }
      };
    } catch (error) {
      console.error("Error setting up IntersectionObserver:", error);
    }
  }, [autoPlay]);

  // HLS loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const loadAndPlayVideo = () => {
      if (!url) return;

      const isHls = url.endsWith(".m3u8");

      if (isHls && video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else if (isHls && Hls.isSupported()) {
        hls = new Hls({ enableWorker: false });
        hls.loadSource(url);
        hls.attachMedia(video);
      } else {
        video.src = url;
      }

      if (autoPlay) {
        setTimeout(() => {
          video
            .play()
            .then()
            .catch((error) => {
              console.error("Autoplay was prevented:", error);
            });
        }, 100);
      }
    };

    loadAndPlayVideo();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url, autoPlay]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: aspectRatioVal,
        borderRadius: radius || 0,
      }}
    >
      <div className="absolute inset-0">
        {!isVideoLoaded && thumbnail && (
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onCanPlayThrough={handleVideoLoaded}
          onLoadedMetadata={handleMetadataLoad}
          muted={isMuted}
          loop
          preload="auto"
          playsInline
        />

        {canUnmute && (
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute bottom-2 right-2 z-10 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded"
          >
            {isMuted ? <VscMute size={15} /> : <VscUnmute size={15} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneralVideoPlayer;
