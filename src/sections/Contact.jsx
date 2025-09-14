// src/sections/Contact.jsx
import React, { useRef, useState, lazy, Suspense, useMemo } from "react";
import { motion, useInView } from "motion/react";
import Particles from "../components/Particles";
import contactAnim from "../assets/contactAnimation.json";

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

  return (
    <section id="contact" ref={sectionRef} className="relative bg-[#060918]">
      {/* Background particles (only when visible & motion allowed) */}
      {!reduceMotion && inView && (
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={320} // reduced from 700
            particleSpread={15}
            speed={0.25} // slightly slower
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

        {/* NOTE: grid is 1 column on mobile, 2 on lg+. We flip order with responsive `order-*` utilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* RIGHT (on desktop): Lottie — but ordered FIRST on small screens */}
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
            className="order-1 lg:order-2 relative rounded-2xl overflow-hidden flex items-center justify-center"
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
          </motion.div>

          {/* LEFT (on desktop): Form — but ordered SECOND on small screens */}
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
