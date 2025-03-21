import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, Activity, Weight, Calendar, Dumbbell } from "lucide-react";
import { useStats } from "@/context/StatsContext";
import StatsCard from "@/components/StatsCard";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartLegend, ChartTitle } from "@progress/kendo-react-charts";
import { cn } from "@/lib/utils";

const Stats = () => {
  const { stats, updateStats } = useStats();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    age: stats.age,
    weight: stats.weight,
    height: stats.height,
  });

  // Prepare data for charts
  const last30Days = [...Array(30)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 29 + i);
    return date.toISOString().split("T")[0];
  });

  const workoutChartData = last30Days.map(date => {
    const workout = stats.workoutHistory.find(w => w.date === date);
    return {
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      duration: workout ? workout.duration : 0,
      type: workout ? workout.type : "None",
    };
  });

  // Workout types summary
  const workoutTypeData = stats.workoutHistory.reduce((acc, workout) => {
    if (!acc[workout.type]) {
      acc[workout.type] = 0;
    }
    acc[workout.type]++;
    return acc;
  }, {} as Record<string, number>);

  const workoutTypeChartData = Object.entries(workoutTypeData).map(([type, count]) => ({
    type,
    count,
  }));

  // Grid data for workout history
  const workoutGridData = stats.workoutHistory
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
    .map((workout, index) => ({
      id: index,
      date: new Date(workout.date).toLocaleDateString(),
      type: workout.type,
      duration: workout.duration,
      calories: workout.calories || 0,
    }));

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(formData);
    setIsEditing(false);
  };

  // Calculate workout frequency
  const workoutFrequency = stats.workoutHistory.filter(w => {
    const workoutDate = new Date(w.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return workoutDate >= thirtyDaysAgo;
  }).length;

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);
      
      const dateStr = checkDate.toISOString().split("T")[0];
      const hasWorkout = stats.workoutHistory.some(w => w.date === dateStr);
      
      if (hasWorkout) {
        streak++;
      } else if (i > 0) { // Skip today if no workout
        break;
      }
    }
    
    return streak;
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
            Your Fitness Stats
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Track your progress and visualize your fitness journey
          </motion.p>
        </div>
        
        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatsCard
            title="Current BMI"
            value={stats.bmi}
            description={(() => {
              if (stats.bmi < 18.5) return "Underweight";
              if (stats.bmi < 25) return "Healthy Weight";
              if (stats.bmi < 30) return "Overweight";
              return "Obese";
            })()}
            icon={<Weight size={20} />}
          />
          <StatsCard
            title="Workouts (30 days)"
            value={workoutFrequency}
            description={`${Math.round(workoutFrequency / 30 * 100)}% consistency`}
            icon={<Activity size={20} />}
          />
          <StatsCard
            title="Current Streak"
            value={`${calculateStreak()} days`}
            description="Keep the momentum going!"
            icon={<Calendar size={20} />}
          />
          <StatsCard
            title="Most Common"
            value={workoutTypeChartData.length > 0 
              ? workoutTypeChartData.sort((a, b) => b.count - a.count)[0].type 
              : "N/A"}
            description="Your preferred workout type"
            icon={<Dumbbell size={20} />}
          />
        </div>
        
        {/* User Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold">Your Profile</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-lg font-medium">{stats.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="text-lg font-medium">{stats.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="text-lg font-medium">{stats.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="text-lg font-medium">{stats.bmi}</p>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Workout Type Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-display font-bold mb-6">Workout Type Distribution</h3>
            <div className="h-64">
              <Chart style={{ height: "100%" }}>
                <ChartTitle text="Workout Types" />
                <ChartLegend position="bottom" />
                <ChartCategoryAxis>
                  <ChartCategoryAxisItem categories={workoutTypeChartData.map(item => item.type)} />
                </ChartCategoryAxis>
                <ChartSeries>
                  <ChartSeriesItem
                    type="column"
                    data={workoutTypeChartData.map(item => item.count)}
                    name="Frequency"
                    color="#3b82f6"
                  />
                </ChartSeries>
              </Chart>
            </div>
          </motion.div>
        </div>
        
        {/* Recent Workouts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-10"
        >
          <h3 className="text-xl font-display font-bold mb-6">Recent Workouts</h3>
          <Grid
            data={workoutGridData}
            style={{ height: "400px" }}
          >
            <GridColumn field="date" title="Date" width="120px" />
            <GridColumn field="type" title="Workout Type" />
            <GridColumn field="duration" title="Duration (min)" width="150px" />
            <GridColumn field="calories" title="Calories Burned" width="150px" />
          </Grid>
        </motion.div>
        
        {/* Workout Consistency Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-6"
        >
          <h3 className="text-xl font-display font-bold mb-6">Workout Consistency (Last 30 Days)</h3>
          <div className="h-80">
            <Chart style={{ height: "100%" }}>
              <ChartTitle text="Workout Duration" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={workoutChartData.map(item => item.date)} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="area"
                  data={workoutChartData.map(item => item.duration)}
                  name="Minutes"
                  color="#3b82f6"
                />
              </ChartSeries>
            </Chart>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
