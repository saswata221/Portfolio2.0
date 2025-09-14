import React from "react";
import {
  FaHtml5,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
} from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress } from "react-icons/si";
import figma from "../assets/figma.png";

const baseTile =
  "link group inline-flex justify-center items-center " +
  "w-[68px] h-[68px] md:w-[110px] md:h-[80px] " +
  "rounded-lg relative z-[1] overflow-hidden origin-left " +
  "transition-[width] duration-200 ease-in";

const iconWrap =
  "link-icon absolute left-1/2 -translate-x-1/2 md:left-[18px] md:translate-x-0 " +
  "top-2 md:top-1/2 md:-translate-y-1/2 " +
  "grid place-items-center w-10 h-10 md:w-20 md:h-20 shrink-0";

const mobileLabelBase =
  "md:hidden absolute left-1/2 -translate-x-1/2 bottom-1 " +
  "opacity-0 text-[12px] font-semibold transition-all duration-200 ease-in " +
  "group-hover:opacity-100 group-focus:opacity-100";

const desktopLabelBase =
  "hidden md:block w-full text-left font-semibold md:text-xl pr-3 " +
  "opacity-0 translate-x-full transition-all duration-200 ease-in origin-right " +
  "group-hover:translate-x-0 group-hover:opacity-100 " +
  "group-hover:pl-[110px]";

const Radio = () => {
  return (
    <div
      className="
        bg-white relative w-fit flex justify-center
        rounded-[15px] shadow-[0_10px_25px_0_rgba(0,0,0,0.075)]
        p-3 md:p-2
        m-4 sm:m-6 md:m-0
      "
    >
      {/* grid for small, flex for md+ */}
      <div
        className="
          menu 
          grid grid-cols-5 gap-3
          sm:grid-cols-5
          md:flex md:flex-wrap md:gap-2
        "
      >
        {/* HTML */}
        <div
          tabIndex={0}
          role="button"
          aria-label="HTML"
          className={baseTile + " md:hover:w-[190px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaHtml5 className="text-orange-500 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-orange-500"}>HTML</span>
          <span className={mobileLabelBase + " text-orange-500"}>HTML</span>
          <span className="absolute inset-0 rounded-lg bg-orange-500/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* CSS */}
        <div
          tabIndex={0}
          role="button"
          aria-label="CSS"
          className={baseTile + " md:hover:w-[170px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaCss3Alt className="text-blue-700 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-blue-700"}>CSS</span>
          <span className={mobileLabelBase + " text-blue-700"}>CSS</span>
          <span className="absolute inset-0 rounded-lg bg-blue-700/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* JavaScript */}
        <div
          tabIndex={0}
          role="button"
          aria-label="JavaScript"
          className={baseTile + " md:hover:w-[220px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaJs className="text-yellow-400 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-yellow-400"}>
            JavaScript
          </span>
          <span className={mobileLabelBase + " text-yellow-400"}>
            JavaScript
          </span>
          <span className="absolute inset-0 rounded-lg bg-yellow-400/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* React */}
        <div
          tabIndex={0}
          role="button"
          aria-label="React"
          className={baseTile + " md:hover:w-[190px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaReact className="text-sky-400 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-sky-400"}>React</span>
          <span className={mobileLabelBase + " text-sky-400"}>React</span>
          <span className="absolute inset-0 rounded-lg bg-sky-400/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* Node.js */}
        <div
          tabIndex={0}
          role="button"
          aria-label="Node.js"
          className={baseTile + " md:hover:w-[210px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaNodeJs className="text-green-600 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-green-600"}>Node.js</span>
          <span className={mobileLabelBase + " text-green-600"}>Node.js</span>
          <span className="absolute inset-0 rounded-lg bg-green-600/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* Tailwind */}
        <div
          tabIndex={0}
          role="button"
          aria-label="Tailwind CSS"
          className={baseTile + " md:hover:w-[220px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <RiTailwindCssFill className="text-sky-400 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-sky-400"}>Tailwind</span>
          <span className={mobileLabelBase + " text-sky-400"}>Tailwind</span>
          <span className="absolute inset-0 rounded-lg bg-sky-400/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* Express */}
        <div
          tabIndex={0}
          role="button"
          aria-label="Express"
          className={baseTile + " md:hover:w-[210px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <SiExpress className="text-green-600 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-green-600"}>Express</span>
          <span className={mobileLabelBase + " text-green-600"}>Express</span>
          <span className="absolute inset-0 rounded-lg bg-green-600/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* GitHub */}
        <div
          tabIndex={0}
          role="button"
          aria-label="GitHub"
          className={baseTile + " md:hover:w-[210px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaGithub className="text-black w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-black"}>GitHub</span>
          <span className={mobileLabelBase + " text-black"}>GitHub</span>
          <span className="absolute inset-0 rounded-lg bg-black/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* Git */}
        <div
          tabIndex={0}
          role="button"
          aria-label="Git"
          className={baseTile + " md:hover:w-[170px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <FaGitAlt className="text-orange-500 w-10 h-10 md:w-20 md:h-20" />
          </span>
          <span className={desktopLabelBase + " text-orange-500"}>Git</span>
          <span className={mobileLabelBase + " text-orange-500"}>Git</span>
          <span className="absolute inset-0 rounded-lg bg-orange-500/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>

        {/* Figma */}
        <div
          tabIndex={0}
          role="button"
          aria-label="Figma"
          className={baseTile + " md:hover:w-[200px] md:focus:w-[190px]"}
        >
          <span className={iconWrap}>
            <img
              src={figma}
              alt="Figma"
              className="w-10 h-10 md:w-20 md:h-20 object-contain"
            />
          </span>
          <span className={desktopLabelBase + " text-purple-900"}>Figma</span>
          <span className={mobileLabelBase + " text-purple-900"}>Figma</span>
          <span className="absolute inset-0 rounded-lg bg-purple-900/20 translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 group-focus:translate-x-0 -z-[1]" />
        </div>
      </div>
    </div>
  );
};

export default Radio;
