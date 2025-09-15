// src/sections/Contact.jsx
import React, { useRef, useState, lazy, Suspense, useMemo } from "react";
import { motion, useInView } from "motion/react";
import Particles from "../components/Particles";
import contactAnim from "../assets/contactAnimation.json";

// ICONS
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Lottie = lazy(() => import("lottie-react"));

function usePrefersReducedMotion() {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

const leftVariant = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};
const rightVariant = {
  hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 20, delay: 0.1 },
  },
};

/* ICON ANIMATION — simple reveal (no bounce) */
const iconsParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};
const iconItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduceMotion = usePrefersReducedMotion();

  const formRef = useRef(null);
  const lottieRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    const { default: emailjs } = await import("@emailjs/browser");
    const data = {
      from_name: e.target.name.value,
      reply_to: e.target.email.value,
      message: e.target.message.value,
    };
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("ok");
      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      setStatus("err");
    } finally {
      setSending(false);
    }
  }

  const SOCIALS = [
    {
      href: "https://github.com/saswata221",
      label: "GitHub",
      Icon: FaGithub,
      color: "#000000",
      glow: "hover:shadow-[0_0_20px_rgba(51,51,51,0.5)]",
    },
    {
      href: "https://www.linkedin.com/in/saswata-mahato-2218a7250/",
      label: "LinkedIn",
      Icon: FaLinkedin,
      color: "#0A66C2",
      glow: "hover:shadow-[0_0_20px_rgba(10,102,194,0.55)]",
    },
    {
      href: "https://leetcode.com/u/Sam221bs/",
      label: "LeetCode",
      Icon: SiLeetcode,
      color: "#FFA116",
      glow: "hover:shadow-[0_0_20px_rgba(255,161,22,0.55)]",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative bg-[#060918]">
      {/* Background particles */}
      {!reduceMotion && inView && (
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={320}
            particleSpread={15}
            speed={0.25}
            particleBaseSize={120}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-10"
        >
          <span className="text-fuchsia-400">Get</span> in Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* RIGHT (Lottie + Icons) */}
          <motion.div
            variants={rightVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            onViewportEnter={() => {
              try {
                lottieRef.current?.goToAndPlay(0, true);
              } catch {}
            }}
            onViewportLeave={() => {
              try {
                lottieRef.current?.stop();
                lottieRef.current?.goToAndStop(0, true);
              } catch {}
            }}
            className="order-1 lg:order-2 relative rounded-2xl overflow-hidden flex flex-col items-center justify-center"
          >
            {!reduceMotion && inView ? (
              <Suspense
                fallback={
                  <div className="w-full h-72 sm:h-96 md:h-[420px] lg:h-[460px]" />
                }
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={contactAnim}
                  autoplay={false}
                  loop
                  style={{ background: "transparent" }}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid meet",
                    progressiveLoad: true,
                    clearCanvas: true,
                    hideOnTransparent: true,
                  }}
                  className="w-full h-72 sm:h-96 md:h-[420px] lg:h-[460px] scale-110"
                />
              </Suspense>
            ) : (
              <div className="w-full h-72 sm:h-96 md:h-[420px] lg:h-[460px]" />
            )}

            {/* SOCIAL ICONS */}
            <motion.div
              variants={iconsParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-3 sm:mt-4 flex items-center justify-center gap-5 sm:gap-6"
              style={{ willChange: "transform" }}
            >
              {SOCIALS.map(({ href, label, Icon, color, glow }) => (
                <motion.a
                  key={label}
                  variants={iconItem}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={[
                    "group inline-flex items-center justify-center size-12 sm:size-14 rounded-full",
                    "bg-white border border-gray-200/70 shadow-sm transition",
                    "hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md active:translate-y-0.5",
                    glow,
                  ].join(" ")}
                  style={{ willChange: "transform" }}
                >
                  <Icon className="text-2xl sm:text-3xl" style={{ color }} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* LEFT (Form) */}
          <motion.div
            variants={leftVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="order-2 lg:order-1 bg-[#141129]/80 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl"
          >
            <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 mb-2">Your Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="What's your good name?"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2">Your Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="What's your email address?"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder="What do you want to say?"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-fuchsia-500 resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors px-6 py-3 text-white font-semibold disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send"}
              </button>

              {status === "ok" && (
                <p className="text-emerald-400">
                  Thanks! Your message has been sent.
                </p>
              )}
              {status === "err" && (
                <p className="text-rose-400">
                  Oops, something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
