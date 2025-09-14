import { useRef } from "react";
import { motion, useSpring } from "motion/react";

export default function CertificateCard({
  title,
  issuer,
  image,
  verifyUrl,
  variants,
}) {
  const cardRef = useRef(null);

  const rotX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.6 });
  const rotY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.6 });
  const lift = useSpring(0, { stiffness: 200, damping: 22, mass: 0.6 });
  const mx = useSpring(50, { stiffness: 150, damping: 20 });
  const my = useSpring(50, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    rotX.set((0.5 - py) * 16);
    rotY.set((px - 0.5) * 22);
    lift.set(12);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
    lift.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.li variants={variants} className="relative [perspective:1200px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rotX, rotateY: rotY, translateZ: lift }}
        className="relative rounded-2xl border border-white/10 bg-[#2b2342]/80 backdrop-blur-sm transform-gpu [transform-style:preserve-3d] shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_36px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="p-4 [transform-style:preserve-3d]">
          {/* Image */}
          <motion.div style={{ translateZ: 18 }}>
            {/* Keep a consistent aspect box, but don't crop */}
            <div className="aspect-[16/11] w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-black">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-contain" /* <-- clarity */
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Moving shine */}
          <motion.div
            style={{ "--mx": mx, "--my": my }}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl [background:radial-gradient(520px_circle_at_calc(var(--mx)*1%)_calc(var(--my)*1%),rgba(255,255,255,0.18),transparent_55%)] mix-blend-screen"
          />

          {/* Meta */}
          <div style={{ translateZ: 8 }} className="mt-3">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">
              {issuer}
            </div>
            <h3 className="mt-1 text-lg font-bold text-white leading-tight">
              {title}
            </h3>

            {verifyUrl && (
              <div className="mt-3">
                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  View / Verify
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
