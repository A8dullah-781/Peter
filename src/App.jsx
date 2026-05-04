

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Home from "../Components/Home";
import Navbar from "../Components/Navbar";
import Faq from "../Components/Faq";
import Video from "../Components/Video";
import Lenis from "lenis";
import Details from "../Components/Details";

const App = () => {
  const [showHome, setShowHome] = useState(false);

  const ballRef = useRef(null);
  const lineRef = useRef(null);
  const wordsRef = useRef([]);
  const finalTextRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    // ✅ LENIS (only addition, nothing modified)
    const lenis = new Lenis({
      duration: 1.6,
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          y: -40,
          scale: 0.98,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          onComplete: () => {
            setShowHome(true);
          },
        });
      },
    });

    gsap.set(wordsRef.current, { opacity: 0, y: 20 });
    gsap.set(finalTextRef.current, { opacity: 0, y: 20 });

    const bounce = () => {
      return gsap.timeline()
        .to(ballRef.current, {
          y: 60,
          duration: 0.35,
          ease: "power2.in",
        })
        .to(ballRef.current, {
          scaleY: 0.65,
          scaleX: 1.3,
          duration: 0.06,
          ease: "power1.inOut",
          onStart: () => {
            gsap.to(lineRef.current, {
              scaleX: 0.4,
              duration: 0.06,
              ease: "power1.in",
            });
          },
        })
        .to(ballRef.current, {
          y: 0,
          scaleY: 1,
          scaleX: 1,
          duration: 0.32,
          ease: "power2.out",
          onStart: () => {
            gsap.to(lineRef.current, {
              scaleX: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          },
        });
    };

    tl.add(bounce())
      .to(wordsRef.current[0], { opacity: 1, y: 0, duration: 0.4 });

    tl.add(bounce())
      .to(wordsRef.current[1], { opacity: 1, y: 0, duration: 0.4 });

    tl.add(bounce())
      .to(wordsRef.current[2], { opacity: 1, y: 0, duration: 0.4 });

    tl.add(bounce())
  .to(finalTextRef.current, {
    opacity: 1,
    y: 0,
    duration: 0.6,
  })
  .to({}, { duration: 1.5 }); 

    return () => {
      lenis.destroy();
    };
  }, []);

  if (showHome) {
    return (
      <>
        <Navbar />
        <Home />
        <Video />
        <Details/>
        <Faq />
      </>
    );
  }

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-sky-100 flex flex-col items-center justify-center"
    >
      <div ref={ballRef} className="w-8 h-8 bg-black rounded-full" />

      <div
        ref={lineRef}
        className="w-12 h-[2px] bg-black rounded-full mt-[8vh]"
      />

      <div className="flex lg:gap-10 gap-4 text-[10vw] md:text-[6vw] font-semibold mt-16">
        {["熱心", "情感", "共感"].map((word, i) => (
          <div
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className={`${i === 1 ? "text-black" : "text-blue-400"}`}
          >
            {word}
          </div>
        ))}
      </div>

      <div
        ref={finalTextRef}
        className="mt-16 text-center text-[4vw] lg:text-[2vw] font-semibold text-black leading-snug"
      >
        発達が気になるお子様に最適 <br />な学び提供小学生英会話
      </div>
    </div>
  );
};

export default App;