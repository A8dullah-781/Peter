import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pinRef = useRef(null);
  const leftLine = useRef(null);
  const rightLine = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: "+=2000",
      pin: true,
      pinSpacing: false,

      onUpdate: (self) => {
        if (self.progress > 0.8) {
          const p = (self.progress - 0.8) / 0.2;
          const scale = 1 - p;

          gsap.to([leftLine.current, rightLine.current], {
            width: `${46.5 * (1 - p)}vw`,
            duration: 0.2,
            overwrite: true,
          });

          gsap.to(circleRef.current, {
            scale: scale,
            opacity: scale,
            duration: 0.2,
            overwrite: true,
          });
        } else {
          gsap.set([leftLine.current, rightLine.current], {
            width: "46.5vw",
          });

          gsap.set(circleRef.current, {
            scale: 1,
            opacity: 1,
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="sky-bg w-screen">

      {/* HEADER */}
      <div className="h-[15vh] bg-white flex items-center p-[1.5vw] w-full">
        <img className="w-[8vw] invert" src="/images/360logo.png" alt="logo" />
      </div>

      {/* PIN SECTION */}
      <div
        ref={pinRef}
        className="h-[30vh] bg-white flex justify-center items-center w-full relative"
      >
        <div
          ref={leftLine}
          className="h-[1px] w-[46.5vw] absolute left-0 bottom-0 bg-black"
        />

        <div
          ref={circleRef}
          className="h-[7vw] w-[7vw] flex sky-ball justify-center absolute -bottom-[3.5vw] items-center rounded-full border border-black"
        >
         
        </div>
         <div className="h-[3vh] absolute -bottom-[1.2vh] w-[3vh] bg-black rounded-full"></div>

        <div
          ref={rightLine}
          className="h-[1px] w-[46.5vw] absolute right-0 bottom-0 bg-black"
        />
      </div>

      {/* TEXT SECTION */}
      <div className="flex flex-col sky-text w-full pt-[15vh]">

        <div className="font-semibold text-[3vw] mb-[50vh] text-center tracking-tight">
          タブレットやパソコンで外国人の先生<br />
          とオンライン小学生英会話指導
        </div>

        <div className="font-semibold text-[3vw] text-center mt-[8vh]">
          週に２回一回目はマンツマン３０分<br />
          ２回目はグループ３０分
        </div>

        <div className="font-semibold text-[3vw] text-center mt-[8vh]">
          大事な絵本を読んだりフォニックスを使ったり
        </div>

        <div className="font-semibold text-[3vw] text-center mt-[8vh]">
          歌や韻文を聞いたり
        </div>

        <div className="font-semibold text-[3vw] text-center mt-[8vh]">
          楽しいパズルと記憶術
        </div>

        <div className="font-semibold text-[3vw] text-center mt-[8vh]">
          モチベーションを高めたり
        </div>

        <div className="font-semibold text-[3vw] text-center mt-[8vh] pb-[60vh]">
          小学校一年生から６年生まで
        </div>

      </div>

      <div className="bg-sky-300 h-screen w-screen"></div>
    </div>
  );
};

export default Home;