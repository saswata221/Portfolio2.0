// src/App.jsx
import React, { Suspense, lazy } from "react";

const Hero = lazy(() => import("./sections/Hero.jsx"));
const About = lazy(() => import("./sections/About.jsx"));
const ExperienceTimeline = lazy(() =>
  import("./sections/ExperienceTimeline.jsx")
);
const Projects = lazy(() => import("./sections/Project.jsx"));
const Certificates = lazy(() => import("./sections/Certificates.jsx"));
const Contact = lazy(() => import("./sections/Contact.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060918]" />}>
      <Hero />
      <About />
      <ExperienceTimeline />
      <Projects />
      <Certificates />
      <Contact />
    </Suspense>
  );
}
