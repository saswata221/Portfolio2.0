import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import Tech from "../components/Techs";

// Import logos
import mathLogo from "../assets/math_logo.png";
import nitLogo from "../assets/dgp.png";

const EXPERIENCES = [
  {
    title: "Content Developer Intern",
    org: "MathonGo Technologies Pvt. Ltd.",
    period: "January 2023 – March 2023",
    points: [
      "Documented and organized educational content to improve consistency and accessibility.",
      "Analyzed 30+ JEE Main and WBJEE mock papers, identifying key topics for preparation.",
      "Audited 500+ questions for accuracy and provided step-by-step solutions.",
      "Tagged and categorized 1,500+ JEE Main questions in Physics, Chemistry, and Math for efficient retrieval.",
    ],
    logo: mathLogo,
  },
  {
    title: "Website Design Intern",
    org: "Career Development Center, NIT Durgapur",
    period: "December 2024 – January 2025",
    points: [
      "Designed and prototyped a new website using Figma, enhancing UI/UX for 5,000+ students and faculty.",
      "Developed a responsive front-end with React, Tailwind CSS, HTML, CSS, and JavaScript.",
      "Optimized performance and load times by 30%, improving overall accessibility.",
      "Applied performance engineering practices to ensure cross-platform compatibility.",
    ],
    logo: nitLogo,
  },
  {
    title: "Speed Control of PMSM using TD3 Agent",
    org: "Research Project",
    period: "August 2025 – Ongoing",
    points: [
      "Working on an ML project combining motor control and reinforcement learning.",
      "Using MATLAB/Simulink to model PMSM speed control and test control strategies.",
      "Applying TD3 agent to learn stable and efficient control policies.",
      "Exploring how AI can improve automation and modern electrical systems.",
    ],
    logo: nitLogo,
  },
];

const leftVariant = {
  hidden: { opacity: 0, x: -80, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const rightVariant = {
  hidden: { opacity: 0, x: 80, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const headingVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function ExperienceTimeline() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#060918] py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={headingVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          Work Experience
        </motion.h2>

        <p className="mt-3 text-center text-white/60">
          What I have done so far
        </p>

        {/* Timeline container */}
        <div className="relative mt-16 md:mt-24">
          {/* Static vertical line */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute top-0 h-full w-1 bg-white
              left-[10%] md:left-1/2 md:-translate-x-1/2
            "
          />

          {/* Scroll progress line */}
          <motion.div
            aria-hidden
            className="
              pointer-events-none absolute top-0 w-[3px] origin-top rounded-full 
              bg-gradient-to-b from-fuchsia-500 via-purple-500 to-indigo-500
              left-[10%] md:left-1/2 md:-translate-x-1/2
            "
            style={{ scaleY: scrollYProgress }}
          />

          <ol className="space-y-24 relative">
            {EXPERIENCES.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li key={idx} className="relative">
                  {/* Node with logo */}
                  <div
                    className="
                      absolute top-0 z-20
                      left-[10%] md:left-1/2 -translate-x-1/2
                    "
                  >
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white ring-4 ring-white grid place-items-center shadow-lg overflow-hidden">
                      <img
                        src={item.logo}
                        alt={`${item.org} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Period (DESKTOP/TABLET only) */}
                  <div
                    className={`hidden md:block absolute top-3 ${
                      !isLeft
                        ? "left-[calc(60%+5rem)] md:left-1/2 md:-translate-x-full md:-ml-6"
                        : "right-[calc(60%+5rem)] md:right-1/2 md:translate-x-full md:-mr-6"
                    } text-[#c77dff] font-Tagesschrift text-2xl px-6 py-3 whitespace-nowrap`}
                  >
                    {item.period}
                  </div>

                  {/* Card */}
                  <motion.div
                    variants={isLeft ? leftVariant : rightVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.35 }}
                    className="relative mt-28 sm:mt-32 md:mt-0 md:grid md:grid-cols-2"
                  >
                    <div
                      className={`
                        ${
                          isLeft
                            ? "md:col-start-1 md:pr-10 mr-2"
                            : "md:col-start-2 md:pl-10 ml-2"
                        }
                        md:static relative
                        flex justify-start md:block
                      `}
                    >
                      <div
                        className="
                          relative rounded-t-lg bg-[#361b4e]
                          border-b-4 border-white
                          p-6 md:p-7 text-white
                          ml-[20%] md:ml-0  /* mobile → shift right of line */
                        "
                      >
                        {/* Period (MOBILE only) */}
                        <div className="md:hidden absolute right-4 top-2 mb-6 text-xs xs:text-sm sm:text-base text-[#c77dff]">
                          {item.period}
                        </div>

                        <div className="uppercase tracking-widest font-story text-[#ffd6ff]/60">
                          {item.org}
                        </div>
                        <h3 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-brand font-medium leading-tight">
                          {item.title}
                        </h3>

                        <ul className="mt-4 space-y-2 font-Ubuntu text-sm sm:text-base text-white/80">
                          {item.points.map((p, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-2 inline-block h-1 w-2 rounded-full bg-white" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Spacer column (desktop only) */}
                    <div
                      className={`${
                        isLeft ? "md:col-start-2" : "md:col-start-1"
                      } hidden md:block`}
                    />
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="mt-40 flex justify-center">
        <Tech />
      </div>
    </section>
  );
}
