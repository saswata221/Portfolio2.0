import TiltedCard from "../components/TiltedCard";
import webdev from "../assets/webdev.png";
import backend from "../assets/backend.png";
import frontend from "../assets/frontend.png";
import creator from "../assets/creator.png";

function About() {
  const roles = [
    { title: "Web Developer", imageSrc: webdev, caption: "Web Developer" },
    {
      title: "Frontend Developer",
      imageSrc: frontend,
      caption: "Frontend Developer",
    },
    {
      title: "Backend Developer",
      imageSrc: backend,
      caption: "Backend Developer",
    },
    { title: "Content Creator", imageSrc: creator, caption: "Photographer" },
  ];

  return (
    <section id="about" className="relative bg-[#060918]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Top heading */}
        <p className="tracking-[0.25em] text-xl md:text-base text-white/50">
          INTRODUCTION
        </p>

        <h2 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-white">
          Overview<span className="text-white">.</span>
        </h2>

        <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-white/75">
          Hi, I’m Saswata — a software developer who loves building clean and
          user-friendly web applications. I work with tools like React, Node.js,
          Express, PostgreSQL, and Tailwind CSS to create websites that are
          fast, reliable, and easy to use. I enjoy learning new things quickly
          and turning ideas into real projects. Outside of coding, I’ve also
          built teamwork and leadership skills through sports and other
          activities. Let’s work together to bring your ideas to life!
        </p>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, idx) => (
            <div key={idx} className="flex justify-center">
              <TiltedCard
                imageSrc={role.imageSrc}
                altText={role.title}
                captionText={role.caption}
                containerHeight="280px"
                containerWidth="250px"
                imageHeight="280px"
                imageWidth="250px"
                rotateAmplitude={10}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-white h-fit text-3xl px-3 py-1 rounded-xl font-medium font-brand text-center">
                    {role.caption}
                  </p>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
