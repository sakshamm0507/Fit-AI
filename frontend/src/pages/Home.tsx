import { motion } from 'framer-motion';
import { ArrowRight, Bot, HeartPulse, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <PageTransition>
      <div className="py-12 md:py-20">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="text-center mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="bg-primary-600/20 text-primary-500 px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-6">
                WELCOME TO FITAI
              </span>
              <h1 className="mb-6">
                <span className="block text-white">Your AI-Powered Fitness</span>
                <span className="text-primary-500">Companion</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                Personalized workout plans, nutrition guidance, and progress tracking – all powered
                by advanced AI to help you reach your fitness goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/chat">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<Bot size={20} />}
                >
                  Start with AI Assistant
                </Button>
              </Link>
              <Link to="/stats">
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon={<BarChart3 size={20} />}
                >
                  View Your Stats
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Core Features
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Discover how FitAI can transform your fitness journey with our AI-powered tools
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/chat">
                <Card className="h-full flex flex-col items-center text-center p-8">
                  <div className="icon-circle bg-primary-600/20 mb-6">
                    <Bot className="text-primary-500" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Chat with AI Assistant</h3>
                  <p className="text-gray-400 mb-6">
                    Get personalized workout recommendations and fitness advice
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2" 
                      icon={<ArrowRight size={16} />} 
                      iconPosition="right"
                    >
                      Try it now
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/diet-plans">
                <Card className="h-full flex flex-col items-center text-center p-8">
                  <div className="icon-circle bg-secondary-600/20 mb-6">
                    <HeartPulse className="text-secondary-500" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Explore Diet Plans</h3>
                  <p className="text-gray-400 mb-6">
                    Discover nutrition plans tailored to your fitness goals
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2" 
                      icon={<ArrowRight size={16} />} 
                      iconPosition="right"
                    >
                      Browse plans
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/stats">
                <Card className="h-full flex flex-col items-center text-center p-8">
                  <div className="icon-circle bg-accent-600/20 mb-6">
                    <BarChart3 className="text-accent-500" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">View Your Stats</h3>
                  <p className="text-gray-400 mb-6">
                    Track your progress and visualize your fitness journey
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2" 
                      icon={<ArrowRight size={16} />} 
                      iconPosition="right"
                    >
                      See stats
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary-900/50 to-dark-400/50 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start using FitAI today and experience personalized fitness guidance powered by 
              cutting-edge artificial intelligence.
            </p>
            <Link to="/chat">
              <Button 
                variant="primary" 
                size="lg" 
                icon={<Bot size={20} />}
              >
                Get Started with AI Assistant
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;