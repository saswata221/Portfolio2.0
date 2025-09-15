// src/sections/Hero.jsx
import React, {
  lazy,
  Suspense,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { useInView } from "motion/react";
import Navbar from "../components/Navbar.jsx";
import TypeAnimation from "../components/TypeAnimation.jsx";
import heroBg from "../assets/herobg.png";
import pp from "../assets/pp.png";

const LiquidEther = lazy(() => import("../components/LiquidEther.jsx"));

function usePrefersReducedMotion() {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : true
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsSmall(e.matches);
    mq.addEventListener?.("change", handler);
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);
  return isSmall;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.35,
    margin: "0px 0px -10% 0px",
  });
  const reduceMotion = usePrefersReducedMotion();
  const isSmall = useIsSmallScreen();

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* BG canvas: desktop only */}
      {!reduceMotion && inView && !isSmall && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              mouseForce={20}
              cursorSize={80}
              isViscous={false}
              viscous={30}
              iterationsViscous={28}
              iterationsPoisson={28}
              isBounce={false}
              autoDemo
              autoSpeed={0.7}
              autoIntensity={2.0}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </Suspense>
        </div>
      )}

      {/* Navbar  */}
      <div className="absolute w-full z-[90]">
        <nav className="flex gap-6 text-white text-xl font-medium">
          <Navbar />
        </nav>
      </div>

      {/* Vertical line */}
      <div className="pointer-events-none absolute z-50 left-[5%] md:left-[10%] top-[15%] flex flex-col items-center">
        <span className="h-6 w-6 rounded-full bg-[#8b5cf6]"></span>
        <span className="h-[28rem] md:h-96 w-1 bg-gradient-to-b from-[#8b5cf6] via-[#8b5cf6]/40 to-transparent"></span>
      </div>

      {/* Heading  */}
      <div
        className="
          absolute z-20
          top-36 left-[15%]
          sm:top-28 sm:left-[16%]
          md:top-[25%] md:left-[13%]
        "
      >
        <div
          className="
            flex gap-3 sm:gap-4 md:gap-6 text-white
            text-5xl sm:text-7xl md:text-9xl
            font-extrabold font-brand
          "
        >
          Hi, I&apos;m <TypeAnimation />
        </div>
      </div>

      {/* Subtitle */}
      <div
        className="
          absolute z-20
          top-56 left-[15%]
          sm:top-[13rem] sm:left-[16%]
          md:top-[45%] md:left-[13%]
        "
      >
        <div className="flex gap-4 text-white text-lg sm:text-2xl md:text-4xl font-normal">
          I design and build responsive <br className="hidden md:block" />
          web solutions with clean code and strong UI/UX.
        </div>
      </div>

      {/* MOBILE*/}
      <div
        className="
          md:hidden
          absolute left-1/2 -translate-x-1/2
          top-[45vh]
          z-30
          flex flex-col items-center
        "
      >
        <img
          src={pp}
          alt="Profile"
          className="h-64 w-64 sm:h-80 sm:w-80 object-cover rounded-full shadow-xl"
        />
        <a
          href="https://drive.google.com/file/d/1QUktRR2PrcHuDX4dl_A_5UmQg_CokAqO/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block px-6 py-3 rounded-xl bg-[#4730da] text-white text-base font-semibold"
        >
          Resume
        </a>
      </div>

      {/* DESKTOP image  */}
      <div className="hidden md:block absolute top-48 right-0 z-30 p-6">
        <img
          src={pp}
          alt="Profile"
          className="w-xl h-auto object-contain rounded-xl shadow-lg"
        />
      </div>

      {/* DESKTOP Resume  */}
      <div className="hidden md:block absolute top-[60%] left-[13%] z-50">
        <a
          href="https://drive.google.com/file/d/1QUktRR2PrcHuDX4dl_A_5UmQg_CokAqO/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-[#4730da] text-white text-base"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
