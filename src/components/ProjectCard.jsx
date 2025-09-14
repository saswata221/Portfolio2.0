import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { BiBroadcast } from "react-icons/bi";

export default function ProjectCard({
  title,
  image,
  description,
  tags = [],
  liveUrl,
  codeUrl,
  variants,
}) {
  const cardRef = useRef(null);

  // springs = smooth, responsive motion
  const rotX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.6 });
  const rotY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.6 });
  const lift = useSpring(0, { stiffness: 200, damping: 22, mass: 0.6 });

  // for shine position (percentages so we can use CSS vars)
  const mx = useSpring(50, { stiffness: 150, damping: 20 });
  const my = useSpring(50, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    const maxX = 10; // tilt up/down
    const maxY = 14; // tilt left/right

    rotX.set((0.5 - py) * maxX * 2);
    rotY.set((px - 0.5) * maxY * 2);

    lift.set(16);
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
      {/* 3D card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          translateZ: lift, // subtle lift
        }}
        className={[
          "group relative rounded-2xl bg-[#2b2342]/80",
          "transition-shadow duration-300 hover:shadow-[0_0_150px_rgba(255,255,255,0.1)]",
          "ring-0 hover:ring-1 hover:ring-purple-500",
          "bg-[#10002b]",
        ].join(" ")}
      >
        {/* image (parallax layer) */}
        <motion.div
          style={{ translateZ: 24 }}
          className="[transform-style:preserve-3d]"
        >
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/10">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          {/* Shine overlay uses CSS variables for the mouse position */}
          <motion.div
            style={{
              "--mx": mx,
              "--my": my,
            }}
            aria-hidden
            className={[
              "pointer-events-none absolute inset-0 rounded-2xl",
              "[background:radial-gradient(600px_circle_at_calc(var(--mx)*1%)_calc(var(--my)*1%),rgba(76,201,240,0.1),transparent_55%)]",
              "before:content-[''] before:absolute before:inset-0 before:rounded-2xl",
              "before:[background:linear-gradient(120deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_35%,rgba(255,255,255,0.08)_70%,rgba(255,255,255,0))]",
              "mix-blend-screen",
            ].join(" ")}
          />

          {/* text/content (another 3D layer) */}
          <div style={{ translateZ: 10 }} className="mt-4 p-3 pt-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight text-white">
              {title}
            </h3>

            {description && (
              <p className="mt-2 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                {description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    style={{ translateZ: 8 }}
                    className="rounded-full font-semibold text-xs sm:text-sm md:text-base text-[#8bfa37]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {(liveUrl || codeUrl) && (
              <div className="flex justify-around">
                <div className="mt-5 flex gap-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm bg-green-600 px-2 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 text-xs sm:text-sm md:text-base text-white/90 hover:bg-white/10"
                    >
                      <BiBroadcast className="scale-125" /> Live
                    </a>
                  )}
                  {codeUrl && (
                    <a
                      href={codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-black px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base font-medium text-white/90 hover:bg-white/10"
                    >
                      <FaGithub className="scale-125" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}
