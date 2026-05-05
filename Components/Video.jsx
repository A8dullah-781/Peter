import React, { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// SVG icons extracted as constants — never re-created on render
const IconPlay = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="black" aria-hidden="true" focusable="false">
    <path d="M0 0l10 6-10 6V0z" />
  </svg>
)

const IconPause = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true" focusable="false">
    <rect x="0" y="0" width="3" height="12" fill="black" rx="1" />
    <rect x="7" y="0" width="3" height="12" fill="black" rx="1" />
  </svg>
)

const IconMuted = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M1 5.5h2.5L8 2v12l-4.5-3.5H1V5.5z" />
    <line x1="13" y1="4" x2="17" y2="12" />
    <line x1="17" y1="4" x2="13" y2="12" />
  </svg>
)

const IconSound = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M1 5.5h2.5L8 2v12l-4.5-3.5H1V5.5z" />
    <path d="M11 4a5 5 0 0 1 0 8" />
    <path d="M13.5 1.5a9 9 0 0 1 0 13" />
  </svg>
)

const Video = () => {
  const videoRef     = useRef(null)
  const containerRef = useRef(null)
  const progressRef  = useRef(null)
  const rafRef       = useRef(null)
  const ctxRef       = useRef(null)

  const [playing,  setPlaying]  = useState(false)
  const [muted,    setMuted]    = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current

    const tick = () => {
      if (!video.paused && video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    ctxRef.current = gsap.context(() => {
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
              video.play().then(() => setPlaying(true)).catch(() => {})
            },
          },
        }
      )
    }, containerRef)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ctxRef.current?.revert()
    }
  }, [])

  const toggle = useCallback(() => {
    const video = videoRef.current
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    videoRef.current.muted = !videoRef.current.muted
    setMuted(v => !v)
  }, [])

  const skip = useCallback((sec) => {
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec)
  }, [])

  const skipBack    = useCallback(() => skip(-10), [skip])
  const skipForward = useCallback(() => skip(10),  [skip])

  const seek = useCallback((e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pct  = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    videoRef.current.currentTime = pct * videoRef.current.duration
  }, [])

  const seekKey = useCallback((e) => {
    if (e.key === "ArrowRight") skip(5)
    if (e.key === "ArrowLeft")  skip(-5)
  }, [skip])

  return (
    <section
      aria-label="紹介動画"
      className="w-full flex justify-center items-center pb-[4vh] lg:py-[10vh]"
    >
      <div
        ref={containerRef}
        className="relative z-10 w-[80vw] overflow-hidden rounded-2xl opacity-0"
      >
        <video
          ref={videoRef}
          src="/images/video.mp4"
          className="w-full object-cover"
          title="AbcKid360 紹介動画 — 小学生向けオンライン英会話"
          loop
          muted
          playsInline
          preload="auto"
          aria-label="AbcKid360のサービス紹介動画"
        />

        {/* Controls overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 md:px-6 md:pb-5 md:pt-10 bg-gradient-to-t from-black/60 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Progress bar ── */}
          <div
            ref={progressRef}
            role="slider"
            aria-label="再生位置"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-valuetext={`${Math.round(progress)}%`}
            tabIndex={0}
            onClick={seek}
            onKeyDown={seekKey}
            className="w-full h-[2px] md:h-[3px] bg-white/30 rounded-full mb-2 md:mb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div
              aria-hidden="true"
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>

          {/* ── Playback controls ── */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Skip back */}
            <button
              onClick={skipBack}
              aria-label="10秒戻る"
              className="text-white text-[10px] md:text-sm font-medium hover:opacity-60 transition-opacity"
            >
              −10s
            </button>

            {/* Play / Pause */}
            <button
              onClick={toggle}
              aria-label={playing ? "一時停止" : "再生"}
              className="flex items-center gap-1.5 md:gap-2 bg-white text-black text-[10px] md:text-sm font-medium px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:scale-105 transition-transform"
            >
              {playing ? <IconPause /> : <IconPlay />}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>

            {/* Skip forward */}
            <button
              onClick={skipForward}
              aria-label="10秒進む"
              className="text-white text-[10px] md:text-sm font-medium hover:opacity-60 transition-opacity"
            >
              +10s
            </button>

            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "ミュート解除" : "ミュート"}
              aria-pressed={muted}
              className="ml-auto text-white hover:opacity-60 transition-opacity flex items-center gap-1"
            >
              {/* Scale down icon on mobile */}
              <span className="scale-75 md:scale-100 inline-flex">
                {muted ? <IconMuted /> : <IconSound />}
              </span>
              <span className="text-sm font-medium sr-only">
                {muted ? "Mute" : "Sound"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Video