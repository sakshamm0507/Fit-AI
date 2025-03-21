
import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
      initial={false}
      animate={{ scale: [0.95, 1] }}
      whileTap={{ scale: 0.9 }}
      className="relative h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            y: isDark ? 0 : 30,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-yellow-400"
        >
          <Moon size={18} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            y: isDark ? -30 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-yellow-500"
        >
          <Sun size={18} />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
