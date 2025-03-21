
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// Import the Kendo Animation component
import { Animation } from "@progress/kendo-react-animation";

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

const AnimatedTransition = ({ children, className = "" }: AnimatedTransitionProps) => {
  // Use Kendo Animation for fade effects with correct props
  return (
    <Animation transitionName="fade">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </Animation>
  );
};

export default AnimatedTransition;
