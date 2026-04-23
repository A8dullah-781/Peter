import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const videoRef     = useRef(null);
  const containerRef = useRef(null);
  const progressRef  = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(true);
  const [progress, setProgress] = useState(0);
  const [ready,    setReady]    = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const onCanPlay = () => setReady(true);
    video.addEventListener("canplay", onCanPlay);

    const updateProgress = () => {
      const { currentTime, duration } = video;
      setProgress((currentTime / duration) * 100 || 0);
    };
    video.addEventListener("timeupdate", updateProgress);

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => {
            if (ready) {
              video.play();
              setPlaying(true);
            } else {
              video.addEventListener("canplay", () => {
                video.play();
                setPlaying(true);
              }, { once: true });
            }
          },
        },
      }
    );

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const toggle = () => {
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else         { videoRef.current.play();  setPlaying(true);  }
  };

  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const skip = (sec) => { videoRef.current.currentTime += sec; };

  const seek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  return (
    <div className="w-full h-full flex justify-center items-center py-[10vh]">
      <div
        ref={containerRef}
        className="relative z-10 w-[80vw] overflow-hidden rounded-2xl opacity-0"
      >
        <video
          ref={videoRef}
          src="/images/video.mp4"
          className="w-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-10 bg-gradient-to-t from-black/60 to-transparent">
          <div
            ref={progressRef}
            onClick={seek}
            className="w-full h-[3px] bg-white/30 rounded-full mb-4 cursor-pointer"
          >
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => skip(-10)} className="text-white text-sm font-medium hover:opacity-60 transition-opacity">
              -10s
            </button>

            <button onClick={toggle} className="flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:scale-105 transition-transform">
              {playing ? (
                <>
                  <span className="flex gap-[3px]">
                    <span className="w-[3px] h-4 bg-black rounded-full" />
                    <span className="w-[3px] h-4 bg-black rounded-full" />
                  </span>
                  Pause
                </>
              ) : (
                <>
                  <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black" />
                  Play
                </>
              )}
            </button>

            <button onClick={() => skip(10)} className="text-white text-sm font-medium hover:opacity-60 transition-opacity">
              +10s
            </button>

            <button onClick={toggleMute} className="ml-auto text-white text-sm font-medium hover:opacity-60 transition-opacity">
              {muted ? "🔇 Mute" : "🔊 Sound"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;