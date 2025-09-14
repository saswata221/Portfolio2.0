// src/components/Navbar.jsx
import React, { useEffect, useState, useCallback } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open (mobile)
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  const closeAndGo = useCallback((hash) => {
    setOpen(false);
    // Small delay to ensure menu closes before scrolling
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = hash;
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-30 backdrop-blur-xl bg-black/10 border-b border-purple-600/20">
      <div className="flex justify-between w-full px-5 sm:px-8 md:px-20 py-3 items-center">
        <div>
          <a
            href="#home"
            className="text-white text-xl md:text-2xl font-bold hover:text-[#7364d2] transition"
          >
            Saswata | <span className="text-[#7364d2]"> Web Developer</span>
          </a>
        </div>

        {/* Desktop links (unchanged) */}
        <div className="hidden md:flex gap-5">
          <a
            href="#about"
            className="text-white text-xl hover:text-purple-400 transition"
          >
            About
          </a>
          <a
            href="#work"
            className="text-white text-xl hover:text-purple-400 transition"
          >
            Work
          </a>
          <a
            href="#projects"
            className="text-white text-xl hover:text-purple-400 transition"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white text-xl hover:text-purple-400 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger (only visible < md) */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/20 hover:border-white/40 transition"
        >
          {/* three horizontal lines */}
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-[2px] w-6 bg-white rounded" />
            <span className="block h-[2px] w-6 bg-white rounded" />
            <span className="block h-[2px] w-6 bg-white rounded" />
          </div>
        </button>
      </div>

      {/* Slide-in mobile menu panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-[#0b0b15]/95 backdrop-blur-xl border-l border-purple-600/20 z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white text-lg font-semibold">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/20 hover:border-white/40 transition"
          >
            <span className="sr-only">Close</span>
            {/* simple X */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 py-4 gap-2">
          <button
            onClick={() => closeAndGo("#about")}
            className="text-white/90 text-lg py-3 text-left rounded-lg hover:bg-white/5"
          >
            About
          </button>
          <button
            onClick={() => closeAndGo("#work")}
            className="text-white/90 text-lg py-3 text-left rounded-lg hover:bg-white/5"
          >
            Work
          </button>
          <button
            onClick={() => closeAndGo("#projects")}
            className="text-white/90 text-lg py-3 text-left rounded-lg hover:bg-white/5"
          >
            Projects
          </button>
          <button
            onClick={() => closeAndGo("#contact")}
            className="text-white/90 text-lg py-3 text-left rounded-lg hover:bg-white/5"
          >
            Contact
          </button>
        </nav>
      </div>

      {/* Click-catcher overlay when menu is open */}
      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}
    </div>
  );
}

export default Navbar;
