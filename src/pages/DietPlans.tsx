import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

interface DietPlan {
  id: string;
  title: string;
  description: string;
  image: string;
}

const dietPlans: DietPlan[] = [
  {
    id: 'keto',
    title: 'Keto Diet',
    description: 'High-fat, adequate-protein, low-carbohydrate diet that forces the body to burn fats rather than carbohydrates.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'vegan',
    title: 'Vegan Diet',
    description: 'Plant-based diet that excludes all animal products, including meat, dairy, eggs, and honey.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean Diet',
    description: 'Based on the traditional foods that people used to eat in countries like Italy and Greece, rich in vegetables, fruits, whole grains, and olive oil.',
    image: 'https://images.pexels.com/photos/8110084/pexels-photo-8110084.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'paleo',
    title: 'Paleo Diet',
    description: 'Based on foods similar to what might have been eaten during the Paleolithic era, including lean meats, fish, fruits, vegetables, nuts, and seeds.',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'intermittent-fasting',
    title: 'Intermittent Fasting',
    description: 'An eating pattern that cycles between periods of fasting and eating, focusing on when you eat rather than what you eat.',
    image: 'https://images.pexels.com/photos/5946622/pexels-photo-5946622.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian Diet',
    description: 'Plant-based diet that may include eggs and dairy but excludes meat, poultry, and seafood.',
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const DietPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);
  
  return (
    <PageTransition>
      <div className="py-12 md:py-16">
        <SectionHeading
          title="Explore Diet Plans"
          subtitle="Discover nutrition plans designed to complement your fitness goals and lifestyle preferences."
          centered={true}
        />

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 bg-primary-600/10 border border-primary-500/20 rounded-xl p-6 text-center"
        >
          <h3 className="text-xl font-semibold text-primary-500 mb-2">
            Personalized Diet Plans Coming Soon!
          </h3>
          <p className="text-gray-400 mb-4">
            Get AI-powered diet recommendations tailored to your specific needs, goals, and preferences.
          </p>
          <Link to="/chat">
            <Button
              variant="primary"
              size="md"
              icon={<Bot size={18} />}
            >
              Chat with AI Assistant
            </Button>
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dietPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden h-full flex flex-col"
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <h3 className="text-xl font-semibold p-4">{plan.title}</h3>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-gray-400">{plan.description}</p>
                </div>
                <div className="p-4 border-t border-dark-500">
                  <button className="text-primary-500 hover:text-primary-400 font-medium flex items-center transition-colors">
                    View More <ArrowUpRight size={16} className="ml-1" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default DietPlans;