
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bot, BarChart3, Salad } from "lucide-react";
import { cn } from "@/lib/utils";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Chat with AI Assistant",
      description: "Get personalized workout recommendations and fitness advice",
      icon: <Bot size={24} />,
      color: "from-blue-500 to-indigo-600",
      path: "/chat",
    },
    {
      title: "Explore Diet Plans",
      description: "Discover nutrition plans tailored to your fitness goals",
      icon: <Salad size={24} />,
      color: "from-green-500 to-emerald-600",
      path: "/diet-plans",
    },
    {
      title: "View Your Stats",
      description: "Track your progress and visualize your fitness journey",
      icon: <BarChart3 size={24} />,
      color: "from-purple-500 to-indigo-600",
      path: "/stats",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-background">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/10 to-transparent opacity-40"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-block py-1 px-3 text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary rounded-full mb-4">
              Welcome to FitAI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
          >
            Your AI-Powered Fitness{" "}
            <span className="text-gradient">Companion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Personalized workout plans, nutrition guidance, and progress tracking – all powered by advanced AI to help you reach your fitness goals.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="relative group"
                whileHover={{ y: -5 }}
              >
                <div 
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 blur transition-opacity duration-500",
                    feature.color
                  )} 
                  style={{ filter: "blur(10px)" }}
                />
                <button
                  onClick={() => navigate(feature.path)}
                  className="relative h-full w-full bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col items-center text-center"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 text-white bg-gradient-to-br",
                    feature.color
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
