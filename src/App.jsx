import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Home from "../Components/Home";
import Navbar from "../Components/Navbar";

const App = () => {
//   const [showHome, setShowHome] = useState(false);
//   const ballRef = useRef(null);
//   const lineRef = useRef(null);
//   const containerRef = useRef(null);
//   const countRef = useRef(null);
//   const wordsRef = useRef([]);
//   const hRef = useRef(null);
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     gsap.to(hRef.current, { opacity: 0, duration: 0.5, delay: 3 });

//     const tl = gsap.timeline({ repeat: 4, onComplete: expandBall });

//     const counter = { val: 0 };
//     gsap.to(countRef.current, { opacity: 1, duration: 0.3 });
//     gsap.to(counter, {
//       val: 100,
//       duration: 3.65,
//       ease: "none",
//       onUpdate: () => {
//         countRef.current.innerText = Math.round(counter.val);
//       },
//       onComplete: () => {
//         gsap.to(countRef.current, { opacity: 0, duration: 0.3 });
//       },
//     });

//     tl.to(ballRef.current, {
//       y: "8vh",
//       duration: 0.35,
//       ease: "power2.in",
//     })
//       .to(ballRef.current, {
//         scaleY: 0.65,
//         scaleX: 1.3,
//         duration: 0.06,
//         ease: "power1.inOut",
//         onStart: () => {
//           gsap.to(lineRef.current, {
//             scaleX: 0.4,
//             duration: 0.06,
//             ease: "power1.in",
//           });
//         },
//       })
//       .to(ballRef.current, {
//         y: 0,
//         scaleY: 1,
//         scaleX: 1,
//         duration: 0.32,
//         ease: "power2.out",
//         onStart: () => {
//           gsap.to(lineRef.current, {
//             scaleX: 1,
//             duration: 0.2,
//             ease: "power2.out",
//           });
//         },
//       });

//     function expandBall() {
//       gsap.to(lineRef.current, { opacity: 0, duration: 0.1 });

//       gsap.to(ballRef.current, {
//         scale: 60,
//         duration: 2.5,
//         ease: "sine.in",
//         onStart: () => {
//           gsap.fromTo(
//             wordsRef.current[0],
//             { y: "100vh" },
//             { y: "-100vh", duration: 3, ease: "sine.in" },
//           );
//         },
//         onComplete: () => {
//           gsap.set(containerRef.current, { backgroundColor: "black" });
//           gsap.set(ballRef.current, { scale: 0, backgroundColor: "skyblue" });

//           gsap.to(ballRef.current, {
//             scale: 60,
//             duration: 2.8,
//             ease: "sine.in",
//             onStart: () => {
//               gsap.fromTo(
//                 wordsRef.current[1],
//                 { y: "100vh" },
//                 { y: "-100vh", duration: 3, ease: "sine.in" },
//               );
//             },
//             onComplete: () => {
//               gsap.set(containerRef.current, { backgroundColor: "skyblue" });
//               gsap.set(ballRef.current, { scale: 0, backgroundColor: "skyblue" });

//               gsap.to(ballRef.current, {
//                 scale: 60,
//                 duration: 0.2,
//                 ease: "power2.inOut",
//                 onComplete: () => {
//                   gsap.set(containerRef.current, { backgroundColor: "skyblue" });
//                   gsap.set(ballRef.current, {
//                     scale: 0,
//                     backgroundColor: "black",
//                   });

//                   gsap.to(ballRef.current, {
//                     scale: 60,
//                     duration: 1.5,
//                     ease: "sine.in",
//                     onStart: () => {
//                       gsap.fromTo(
//                         wordsRef.current[2],
//                         { y: "100vh" },
//                         {
//                           y: "-100vh",
//                           duration: 2,
//                           delay: 0.2,
//                           ease: "sine.in",
//                         },
//                       );
//                     },
//                     onComplete: () => {
//                       gsap.to(loaderRef.current, {
//                         opacity: 0,
//                         delay: 0.5,
//                         duration: 0.8,
//                         onComplete: () => setShowHome(true),
//                       });
//                     },
//                   });
//                 },
//               });
//             },
//           });
//         },
//       });
//     }
//   }, []);

//   if (showHome) return  (
//   <>
//     <Home />
{/* <Navbar/> */}
//   </>
// );
  return (
    // <div ref={loaderRef}>
    //   <div
    //     ref={containerRef}
    //     className="fixed inset-0 bg-sky-300 flex flex-col items-center justify-center"
    //   >
    //     <div ref={ballRef} className="w-8 h-8 bg-black rounded-full" />
    //     <div
    //       ref={lineRef}
    //       className="w-12 h-[2px] bg-black rounded-full mt-[8vh]"
    //     />
    //     <div
    //       ref={hRef}
    //       className="text-black pt-[5vh] lg:leading-13 whitespace-nowrap font-semibold text-center text-[5vw] md:text-[3vw]"
    //     >
    //       発達が気になるお子様に <br />
    //       最適な学び提供 <br />
    //       小学生英会話
    //     </div>
    //     <div
    //       ref={countRef}
    //       className="absolute bottom-16 text-black text-xl font-normal opacity-0"
    //     >
    //       0
    //     </div>
    //   </div>
    //   <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
    //     {["熱心", "情感", "共感"].map((word, i) => (
    //       <div
    //         key={i}
    //         ref={(el) => (wordsRef.current[i] = el)}
    //         style={{ transform: "translateY(100vh)" }}
    //         className={`absolute text-[16vw] font-semibold ${i === 1 ? "text-black" : "text-blue-300"}`}
    //       >
    //         {word}
    //       </div>
    //     ))}
    //   </div>
    // </div>
   <> <Navbar/>
    <Home /></>
  );
};

export default App;
