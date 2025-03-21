
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface DietPlanCardProps {
  title: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
  index: number;
}

const DietPlanCard = ({ title, description, imageUrl, externalUrl, index }: DietPlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl group"
    >
      <div className="h-48 overflow-hidden relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-display font-bold">{title}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-foreground/80 mb-4">{description}</p>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg",
            "bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
            "dark:bg-primary/20 dark:hover:bg-primary/30"
          )}
        >
          View More
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default DietPlanCard;
