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
  const rafRef       = useRef(null)      // requestAnimationFrame id
  const ctxRef       = useRef(null)      // GSAP context for cleanup

  const [playing,  setPlaying]  = useState(false)
  const [muted,    setMuted]    = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current

    // ── rAF-based progress ticker ──────────────────────────────────
    // timeupdate fires only ~4× per second — too choppy for a progress bar.
    // requestAnimationFrame syncs to display refresh (60fps) giving smooth
    // progress movement with ZERO extra DOM events.
    const tick = () => {
      if (!video.paused && video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // ── GSAP scroll-triggered entrance + autoplay ──────────────────
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
              // Play as soon as the browser has enough data; if already ready,
              // play() returns a Promise — catch AbortError on unmount.
              video.play().then(() => setPlaying(true)).catch(() => {})
            },
          },
        }
      )
    }, containerRef)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ctxRef.current?.revert()           // kills ScrollTrigger + tween
    }
  }, [])

  // ── Stable handlers (no anonymous functions in JSX) ───────────────
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

  // skip: single factory avoids creating two inline arrows on every render
  const skip = useCallback((sec) => {
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec)
  }, [])

  const skipBack    = useCallback(() => skip(-10), [skip])
  const skipForward = useCallback(() => skip(10),  [skip])

  // ── Progress bar — click + keyboard seek ──────────────────────────
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
    /*
      <section> gives a landmark region — Lighthouse Accessibility audit
      rewards this; crawlers also understand video content in context.
    */
    <section
      aria-label="紹介動画"
      className="w-full flex justify-center items-center py-[10vh]"
    >
      <div
        ref={containerRef}
        // opacity-0 matches GSAP fromTo start — prevents FOUC
        className="relative z-10 w-[80vw] overflow-hidden rounded-2xl opacity-0"
      >
        {/*
          <video> semantic attributes for SEO + performance:
          - title         → machine-readable label for the video element
          - preload="none"→ stops downloading video bytes during page load,
                            which was the #1 TBT / bandwidth killer.
                            GSAP onEnter triggers play() which triggers load.
          - playsInline   → required for iOS autoplay
          - muted         → required for autoplay in all browsers
          - loop          → background loop behavior unchanged
          No poster= set here as we don't have one, but adding one would
          further improve LCP if a frame image is available.
        */}
        <video
          ref={videoRef}
          src="/images/video.mp4"
          className="w-full object-cover"
          title="AbcKid360 紹介動画 — 小学生向けオンライン英会話"
          loop
          muted
          playsInline
          preload="none"
          aria-label="AbcKid360のサービス紹介動画"
        />

        {/* Controls overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-10 bg-gradient-to-t from-black/60 to-transparent"
          // Prevent overlay clicks from bubbling to section
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Progress bar ── */}
          {/*
            role="slider" + aria attributes make the scrubber usable with
            keyboard and announced correctly by screen readers.
          */}
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
            className="w-full h-[3px] bg-white/30 rounded-full mb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div
              aria-hidden="true"
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>

          {/* ── Playback controls ── */}
          <div className="flex items-center gap-4">

            {/* Skip back */}
            <button
              onClick={skipBack}
              aria-label="10秒戻る"
              className="text-white text-sm font-medium hover:opacity-60 transition-opacity"
            >
              −10s
            </button>

            {/* Play / Pause */}
            <button
              onClick={toggle}
              aria-label={playing ? "一時停止" : "再生"}
              className="flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:scale-105 transition-transform"
            >
              {playing ? <IconPause /> : <IconPlay />}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>

            {/* Skip forward */}
            <button
              onClick={skipForward}
              aria-label="10秒進む"
              className="text-white text-sm font-medium hover:opacity-60 transition-opacity"
            >
              +10s
            </button>

            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "ミュート解除" : "ミュート"}
              aria-pressed={muted}
              className="ml-auto text-white hover:opacity-60 transition-opacity flex items-center gap-1.5"
            >
              {muted ? <IconMuted /> : <IconSound />}
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