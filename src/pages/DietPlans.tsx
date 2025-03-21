
import React from "react";
import { motion } from "framer-motion";
import DietPlanCard from "@/components/DietPlanCard";

const dietPlans = [
  {
    title: "Keto Diet",
    description: "High-fat, adequate-protein, low-carbohydrate diet that forces the body to burn fats rather than carbohydrates.",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    externalUrl: "https://www.healthline.com/nutrition/ketogenic-diet-101",
  },
  {
    title: "Vegan Diet",
    description: "Plant-based diet that excludes all animal products, including meat, dairy, eggs, and honey.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    externalUrl: "https://www.healthline.com/nutrition/vegan-diet-guide",
  },
  {
    title: "Mediterranean Diet",
    description: "Based on the traditional foods that people used to eat in countries like Italy and Greece, rich in vegetables, fruits, whole grains, and olive oil.",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    externalUrl: "https://www.healthline.com/nutrition/mediterranean-diet-meal-plan",
  },
  {
    title: "Paleo Diet",
    description: "Based on foods similar to what might have been eaten during the Paleolithic era, consisting mainly of lean meats, fish, fruits, vegetables, nuts, and seeds.",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1040&q=80",
    externalUrl: "https://www.healthline.com/nutrition/paleo-diet-meal-plan-and-menu",
  },
  {
    title: "Intermittent Fasting",
    description: "An eating pattern that cycles between periods of fasting and eating, focusing on when you eat rather than what you eat.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    externalUrl: "https://www.healthline.com/nutrition/intermittent-fasting-guide",
  },
  {
    title: "High-Protein Diet",
    description: "Emphasizes consuming more protein-rich foods while reducing carbohydrates and fats, ideal for muscle building and recovery.",
    imageUrl: "https://images.unsplash.com/photo-1594221708779-94832f4320d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    externalUrl: "https://www.healthline.com/nutrition/high-protein-diet-plan",
  },
];

const DietPlans = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold mb-3"
          >
            Explore Diet Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover nutrition plans designed to complement your fitness goals and lifestyle preferences.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dietPlans.map((plan, index) => (
            <DietPlanCard
              key={index}
              title={plan.title}
              description={plan.description}
              imageUrl={plan.imageUrl}
              externalUrl={plan.externalUrl}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center p-6 rounded-xl bg-secondary/50 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <p className="text-lg font-medium mb-2">Coming Soon</p>
          <p className="text-muted-foreground">
            Personalized diet plans tailored to your specific goals, preferences, and dietary restrictions will be available soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DietPlans;
