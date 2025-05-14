import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark-100 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="mx-auto mb-6 text-primary-500"
        >
          <Activity size={48} />
        </motion.div>
        <h3 className="text-2xl font-semibold text-primary-500 mb-2">Loading FitAI</h3>
        <p className="text-gray-400">Preparing your fitness experience...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;