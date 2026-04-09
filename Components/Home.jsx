import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Home = () => {
  const pinRef = useRef(null);
  const leftLine = useRef(null);
  const rightLine = useRef(null);
  const circleRef = useRef(null);
  const ballRef = useRef(null); // now points to <circle> inside SVG
  const pathRef = useRef(null);

  useEffect(() => {
    const pinTrigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: "+=1600",
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
          gsap.set([leftLine.current, rightLine.current], { width: "46.5vw" });
          gsap.set(circleRef.current, { scale: 1, opacity: 1 });
        }
      },
    });

    // Ball is a <circle> inside the SVG — same coordinate space as the path
    gsap.to(ballRef.current, {
      ease: "power1.inOut", // smooth but with slight resistance
      scrollTrigger: {
        trigger: pathRef.current,
        start: "top 30%",
        end: "bottom center",
        scrub: 3, // higher = more lag/scrubby drag behind scroll
      },
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.2, 0.5],
        autoRotate: false,
      },
    });

    // Hide ball initially
    gsap.set(ballRef.current, { opacity: 0 });

    gsap.to(ballRef.current, {
      scrollTrigger: {
        trigger: pathRef.current,
        start: "top 30%",
        end: "bottom center",
        scrub: 4,
        onEnter: () => {
          gsap.to(ballRef.current, { opacity: 1, duration: 0.6 });
        },
        onLeaveBack: () => {
          gsap.to(ballRef.current, { opacity: 0, duration: 0.3 });
        },
      },
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.2, 0.5],
        autoRotate: false,
      },
    });

    gsap.to(".load", {
      opacity: 0,
      duration: 0.8,
      display: "none",
    });

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="sky-bg overflow-x-hidden w-screen">
    <div className="lg:block hidden">
        <img
        className="absolute w-[30vw] top-15  z-50 left-12"
        src="/images/onlyc.svg"
        alt="cloud"
      />
      <img
        className="absolute w-[30vw] top-1/2 z-50  -left-14"
        src="/images/leftc.svg"
        alt="cloud"
      />
      <img
        className="absolute w-[40vw] top-1/2 z-50  -right-44"
        src="/images/rightc.svg"
        alt="cloud"
      />
    </div>

      <div className="h-screen load w-screen absolute top-0 left-0 z-50 bg-sky-300"></div>

      {/* HEADER */}
      <div className="h-[15vh] bg-white flex items-center p-[1.3vw] -mt-[3vh] lg:-mt-[1vw] w-full">
        <img className="w-[20vw] md:w-[12vw] lg:w-[6vw] invert" src="/images/360logo.png" alt="logo" />
      </div>

      {/* PIN SECTION */}
      <div
        ref={pinRef}
        className="h-[30vh] z-40 bg-white flex justify-center items-center w-full relative"
      >
        <div
          ref={leftLine}
          z-50
          className="h-[2px] w-[40vw] md:w-[46.5vw] absolute left-0 bottom-0 bg-black"
        />
        <div
          ref={circleRef}
          className="lg:h-[7vw] lg:w-[7vw] md:h-[14vw] md:w-[14vw] z-50 h-[20vw] w-[20vw] flex sky-ball justify-center absolute -bottom-[5vh] lg:-bottom-[3.5vw] items-center rounded-full border border-black"
        >
          <div className="h-[3vh] ourball z-10 w-[3vh] bg-black rounded-full" />
        </div>
        <div
          ref={rightLine}
          z-50
          className="h-[2px] w-[40vw] md:w-[46.5vw] absolute right-0 bottom-0 bg-black"
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col px-[7.5vw] sky-text bg-[#7DD3FC] w-full pt-[15vh]">
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] mb-[30vh] md:mb-[50vh] text-center tracking-tight">
          タブレットやパソコンで外国人の先生
          <br />
          とオンライン小学生英会話指導
        </div>
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] text-center mt-[3vh]">
          週に２回一回目はマンツマン３０分
          <br />
          ２回目はグループ３０分
        </div>
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] text-center mt-[3vh]">
          大事な絵本を読んだりフォニックスを使ったり
        </div>
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] text-center mt-[3vh]">
          歌や韻文を聞いたり
        </div>
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] text-center mt-[3vh]">
          楽しいパズルと記憶術
        </div>
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] text-center mt-[3vh]">
          モチベーションを高めたり
        </div>
        <div className="font-semibold text-[8vw] md:text-[5vw] lg:text-[3vw] text-center mt-[3vh] pb-[10vh]">
          小学校一年生から６年生まで
        </div>
      </div>

      {/* PATH SECTION */}
      <div className="bg-[#7DD3FC] relative h-[320vh] w-screen">
        <svg
          className="w-[155vw] absolute left-1/3 pointer-events-none z-30"
          viewBox="0 0 1156 3973"
          preserveAspectRatio="xMidYMin meet"
        >
          <path
            ref={pathRef}
            d="M119.548 1.00006C118.782 8.70502 117.227 76.1927 131.859 122.387C137.156 139.111 158.165 145.63 172.484 152.209C186.076 158.454 195.297 171.901 207.307 184.677C218.87 196.977 222.404 212.885 234.379 234.155C242.831 249.168 245.611 262.411 243.36 286.755C241.198 310.137 206.251 287.243 134.145 286.836C104.622 286.67 84.7824 300.332 72.03 309.232C52.257 323.032 49.1819 338.996 41.0592 351.771C31.6778 366.527 26.7402 380.027 23.2592 386.583C21.5298 389.84 22.0757 393.905 24.7561 395.877C38.7991 406.212 69.8369 395.529 102.003 393.603C151.904 390.615 173.575 397.061 192.976 398.616C206.907 399.732 221.568 407.876 235.922 415.998C252.656 425.468 266.498 442.641 275.769 458.12C290.364 482.487 291.284 508.318 293.593 527.372C294.025 530.935 295.136 533.939 292.467 534.752C273.265 540.596 257.308 523.218 224.504 512.38C201.956 504.93 187.685 504.605 171.08 502.679C135.295 498.528 113.467 509.989 84.8404 522.347C66.3471 530.331 53.0809 540.902 38.3789 553.677C23.6866 566.445 15.1596 581.097 4.32177 602.773C1.97783 607.461 0.446161 610.525 1.18879 612.486C5.55368 624.012 40.456 624.449 65.3229 627.988C82.5449 630.439 100.889 636.099 119.478 639.58C139.339 643.3 158.908 651.556 177.114 655.048C196.658 658.798 205.369 677.827 216.973 687.91C228.209 697.674 237.86 706.465 247.537 718.069C258.25 730.913 264.966 740.51 265.372 747.461C266.941 774.315 199.289 759.842 183.426 767.211C165.591 775.496 157.469 803.148 148.986 820.53C133.797 851.658 136.582 876.623 133.484 894.423C131.874 903.672 131.151 945.944 131.534 1005.1C131.917 1026.73 132.683 1031.32 133.077 1044.41C133.472 1057.5 133.472 1078.95 133.472 1101.04"
            stroke="none"
            strokeWidth="4"
            fill="none"
          />

          {/* Ball lives inside SVG — shares the same coordinate system as the path */}
          <circle ref={ballRef} cx="119.548" cy="3" r="6" fill="black" />
        </svg>

        <img
          className="absolute w-[50vw] mt-[20vh] bottom-0 -left-20"
          src="/images/left.png"
          alt="leftsvgs"
        />
        <img
          className="absolute w-[50vw] mt-[20vh] bottom-0 -right-20"
          src="/images/right.png"
          alt="rightsvgs"
        />
      </div>
    </div>
  );
};

export default Home;
