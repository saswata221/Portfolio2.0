import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "motion/react";
import ProjectCard from "../components/ProjectCard";
import travel from "../assets/travel.png";
import eventu from "../assets/eventu.png";

const PROJECTS = [
  {
    title: "🎟️ EventU – Booking Platform",
    image: eventu,
    description:
      "A web app to browse, book, and manage events with ease. It features customer and organizer dashboards, seat booking, secure login, and a responsive design for a smooth user experience.",
    tags: ["#React", "#Node", "#Express", "#PostgreSQL", "#TailwindCSS"],
    liveUrl: "#",
    codeUrl: "https://github.com/saswata221/EventU",
  },
  {
    title: "⚡ PMSM Speed Control with TD3",
    image: travel, // replace with your project thumbnail
    description:
      "An ML project that applies reinforcement learning to motor control. Using MATLAB/Simulink for PMSM modeling and a TD3 agent for learning stable and efficient speed control policies.",
    tags: [
      "#ML",
      "#MATLAB",
      "#TD3 Agent",
      "#ReinforcementLearning",
      "#Simulink",
    ],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "🌍 Travel Finder – Recommendation",
    image: travel,
    description:
      "A platform to discover travel destinations with smart filters, tags, and personalized suggestions. It offers a modern UI, secure APIs, and an optimized database for fast and reliable results.",
    tags: ["#React", "#Node", "#Express", "#PostgreSQL", "#TailwindCSS"],
    liveUrl: "https://travel-finder-theta.vercel.app/",
    codeUrl: "https://github.com/saswata221/travel-finder",
  },
];

const headingVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

export default function Projects() {
  const sectionRef = useRef(null);
  const inViewOnce = useInView(sectionRef, {
    amount: 0.2,
    margin: "-5% 0px -5% 0px",
    once: true,
  });

  const controls = useAnimationControls();

  useEffect(() => {
    if (inViewOnce) controls.start("show");
  }, [inViewOnce, controls]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-[#060918] py-16 sm:py-24 md:py-32 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          variants={headingVariant}
          initial="hidden"
          animate={controls}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white"
        >
          Projects<span className="text-white/60">.</span>
        </motion.h2>

        <motion.p
          variants={headingVariant}
          initial="hidden"
          animate={controls}
          className="mt-4 max-w-3xl text-sm sm:text-base md:text-lg text-white/70"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories.
        </motion.p>

        <motion.ul
          variants={containerVariant}
          initial="hidden"
          animate={controls}
          className="mt-10 sm:mt-12 md:mt-14 grid gap-8 sm:gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} variants={itemVariant} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
