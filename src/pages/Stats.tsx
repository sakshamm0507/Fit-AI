import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Calendar, Activity, Weight, Flame } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';

// Mock data
const progressData = [
  { name: 'Jan', weight: 72, bodyfat: 18 },
  { name: 'Feb', weight: 71, bodyfat: 17.5 },
  { name: 'Mar', weight: 70.5, bodyfat: 17 },
  { name: 'Apr', weight: 70, bodyfat: 16.5 },
  { name: 'May', weight: 69, bodyfat: 16 },
  { name: 'Jun', weight: 68.5, bodyfat: 15.5 },
];

const workoutData = [
  { name: 'Mon', workouts: 1 },
  { name: 'Tue', workouts: 0 },
  { name: 'Wed', workouts: 1 },
  { name: 'Thu', workouts: 1 },
  { name: 'Fri', workouts: 0 },
  { name: 'Sat', workouts: 1 },
  { name: 'Sun', workouts: 0 },
];

const Stats = () => {
  const [selectedTab, setSelectedTab] = useState('progress');
  
  return (
    <PageTransition>
      <div className="py-12 md:py-16">
        <SectionHeading
          title="Your Fitness Stats"
          subtitle="Track your progress and visualize your fitness journey"
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* BMI Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="relative h-full">
              <div className="absolute top-4 right-4 text-primary-500">
                <Weight size={20} />
              </div>
              <div className="mb-1">
                <span className="text-gray-400 text-sm flex items-center">
                  Current BMI <span className="inline-block ml-1 text-primary-500">ⓘ</span>
                </span>
                <h3 className="text-4xl font-semibold text-white">22.9</h3>
                <p className="text-sm text-primary-500">Healthy Weight</p>
              </div>
              <div className="mt-6 pt-6 border-t border-dark-500">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">Healthy Weight</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Normal Range</span>
                  <span className="text-white">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Recommendation</span>
                  <span className="text-white">Maintain current weight with regular exercise</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Workouts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="relative h-full">
              <div className="absolute top-4 right-4 text-primary-500">
                <Activity size={20} />
              </div>
              <div className="mb-1">
                <span className="text-gray-400 text-sm flex items-center">
                  Workouts (30 days) <span className="inline-block ml-1 text-primary-500">ⓘ</span>
                </span>
                <h3 className="text-4xl font-semibold text-white">17</h3>
                <p className="text-sm text-gray-400">57% consistency</p>
              </div>
              <div className="mt-6 pt-6 border-t border-dark-500">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Avg. Duration</span>
                  <span className="text-white">52 min</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Total Workouts</span>
                  <span className="text-white">17</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Most Recent</span>
                  <span className="text-white">14/4/2025</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="relative h-full">
              <div className="absolute top-4 right-4 text-primary-500">
                <Calendar size={20} />
              </div>
              <div className="mb-1">
                <span className="text-gray-400 text-sm flex items-center">
                  Current Streak <span className="inline-block ml-1 text-primary-500">ⓘ</span>
                </span>
                <h3 className="text-4xl font-semibold text-white">0 days</h3>
                <p className="text-sm text-gray-400">Keep the momentum going!</p>
              </div>
              <div className="mt-6 pt-6 border-t border-dark-500">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">This Week</span>
                  <span className="text-white">0 workouts</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="text-white">12 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-error-500">Inactive</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Workout Type Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="relative h-full">
              <div className="absolute top-4 right-4 text-primary-500">
                <Flame size={20} />
              </div>
              <div className="mb-1">
                <span className="text-gray-400 text-sm flex items-center">
                  Most Common <span className="inline-block ml-1 text-primary-500">ⓘ</span>
                </span>
                <h3 className="text-4xl font-semibold text-white">Yoga</h3>
                <p className="text-sm text-gray-400">Your preferred workout type</p>
              </div>
              <div className="mt-6 pt-6 border-t border-dark-500">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Total Types</span>
                  <span className="text-white">5</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Frequency</span>
                  <span className="text-white">41%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Calories Burned</span>
                  <span className="text-white">4177 kcal</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        >
          <Card className="relative">
            <div className="absolute top-4 right-4">
              <button className="text-gray-400 hover:text-primary-500 transition-colors">
                <Edit size={18} />
              </button>
            </div>
            <h3 className="text-xl font-semibold mb-6">Your Profile</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Age</p>
                <p className="text-lg">30 years</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Weight</p>
                <p className="text-lg flex items-center">
                  70 kg <span className="text-success-500 text-sm ml-2">↓ 2.1 kg</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Height</p>
                <p className="text-lg">175 cm</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Goal</p>
                <p className="text-lg">Weight loss & muscle gain</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Activity Level</p>
                <p className="text-lg">Moderate</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6">Fitness Progress Visualization</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progressData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#9ca3af' }} 
                    tickLine={{ stroke: '#374151' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    tick={{ fill: '#9ca3af' }} 
                    tickLine={{ stroke: '#374151' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#374151',
                      color: '#fff' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#weightGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Stats;