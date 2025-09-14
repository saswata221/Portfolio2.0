import { motion } from "motion/react";

export default function CertificateThumb({ image, url, title = "", variants }) {
  return (
    <motion.li
      variants={variants}
      className="mb-6"
      style={{ breakInside: "avoid" }}
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={title ? `View ${title}` : "View certificate"}
        className="group relative block w-fit mx-auto rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
      >
        <div className="bg-black rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title || "Certificate"}
            className="block h-auto max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border-4 border-white"
        />

        {/* Hover overlay */}
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center bg-black/60 opacity-0 transition-opacity duration-200  group-hover:opacity-100"
        >
          <span className="inline-flex items-center rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-black shadow">
            View
          </span>
        </div>
      </a>
    </motion.li>
  );
}
