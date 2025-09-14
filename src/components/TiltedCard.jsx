import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const springValues = { damping: 15, stiffness: 100, mass: 1 };

// Hook: true on screens < 768px (Tailwind’s md breakpoint)
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : true
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsSmall(e.matches);
    mq.addEventListener?.("change", handler);
    mq.addListener?.(handler); // Safari fallback
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);
  return isSmall;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.2,
  rotateAmplitude = 100,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const isSmall = useIsSmallScreen();
  const ref = useRef(null);

  // swap sizes on small screens (mobile portrait shape)
  const effContainerH = isSmall ? containerWidth : containerHeight;
  const effContainerW = isSmall ? containerHeight : containerWidth;
  const effImageH = isSmall ? imageWidth : imageHeight;
  const effImageW = isSmall ? imageHeight : imageWidth;

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 10,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const amp = isSmall ? Math.min(20, rotateAmplitude) : rotateAmplitude; // gentler on mobile
    const rotationX = (offsetY / (rect.height / 2)) * -amp;
    const rotationY = (offsetX / (rect.width / 2)) * amp;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure rounded-3xl bg-[#470a77]/30"
      style={{ height: effContainerH, width: effContainerW }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && isSmall && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: effImageW,
          height: effImageH,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{ width: effImageW, height: effImageH }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
