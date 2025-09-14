import { motion } from "motion/react";
import CertificateThumb from "../components/CertificateThumb";
import udemyc from "../assets/udemyc++.jpg";
import grid from "../assets/grid.png";
import math from "../assets/mathongo.png";
import sarvanan from "../assets/sarvanan.png";
import dsp from "../assets/dsp.png";
import dev from "../assets/dev.jpg";
import dsa from "../assets/dsa.jpg";

const CERTIFICATES = [
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: grid,
    url: "https://drive.google.com/file/d/10kP2hIjDXexAWIzvIr8KtPHBDyja6Mrm/view?usp=sharing",
  },
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: udemyc,
    url: "https://drive.google.com/file/d/1N_jrO7ItuASIDHmJUDEHwHJmcD4Y-A2t/view?usp=sharing",
  },
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: math,
    url: "https://drive.google.com/file/d/1d28hTKDqCncdIJ9rFmT6AzaL-x92K76C/view?usp=sharing",
  },
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: sarvanan,
    url: "https://drive.google.com/file/d/1Er6gp7OADl4CmGGDXQnEFfXzx_RdGdwy/view?usp=sharing",
  },
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: dsp,
    url: "https://drive.google.com/file/d/1e6TRUHuCaVE0hPzf9j8nJiPkURhqjToM/view?usp=sharing",
  },
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: dev,
    url: "https://drive.google.com/file/d/1v4wbtqFid1ANNlayOICyNRV2H5M6yEgp/view?usp=sharing",
  },
  {
    title: "CodeRush Challenge — Certificate of Achievement",
    image: dsa,
    url: "https://drive.google.com/file/d/1iUaLdHx6nkInQdEcg2MnghaIWILjIpus/view?usp=sharing",
  },
  // add more items...
];

const heading = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

export default function Certificates() {
  return (
    <section id="trophies" className="relative bg-[#060918] py-24 md:py-32">
      <div className="max-w-7xl mx-auto bg-[#192561]/40  p-10">
        <motion.h2
          variants={heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          <span className="text-fuchsia-400">My</span> Trophy Cabinet
        </motion.h2>

        <motion.p
          variants={heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          className="mt-4 max-w-3xl text-white/70"
        >
          Hover any certificate to reveal the action; click to open it in a new
          tab.
        </motion.p>

        {/* Masonry columns keep variable heights tidy; no cropping */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]"
        >
          {CERTIFICATES.map((c) => (
            <CertificateThumb key={c.title} {...c} variants={item} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
