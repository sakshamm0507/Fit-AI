
import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface WorkoutData {
  date: string;
  duration: number;
  type: string;
  calories?: number;
}

export interface UserStats {
  age: number;
  weight: number;
  height: number;
  bmi: number;
  workoutHistory: WorkoutData[];
}

type StatsAction =
  | { type: "UPDATE_STATS"; payload: Partial<UserStats> }
  | { type: "ADD_WORKOUT"; payload: WorkoutData }
  | { type: "RESET_STATS" };

interface StatsContextType {
  stats: UserStats;
  updateStats: (newStats: Partial<UserStats>) => void;
  addWorkout: (workout: WorkoutData) => void;
  resetStats: () => void;
  calculateBMI: (weight: number, height: number) => number;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

// Mock data for initial state
const generateMockWorkouts = (): WorkoutData[] => {
  const workouts: WorkoutData[] = [];
  const workoutTypes = ["Cardio", "Strength", "Yoga", "HIIT", "Rest"];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Skip some days to make data more realistic
    if (Math.random() > 0.7) continue;
    
    workouts.push({
      date: date.toISOString().split('T')[0],
      duration: Math.floor(Math.random() * 60) + 20, // 20-80 min
      type: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
      calories: Math.floor(Math.random() * 300) + 100, // 100-400 calories
    });
  }
  
  return workouts;
};

const initialStats: UserStats = {
  age: 30,
  weight: 70,
  height: 175,
  bmi: 22.9,
  workoutHistory: generateMockWorkouts(),
};

function statsReducer(state: UserStats, action: StatsAction): UserStats {
  switch (action.type) {
    case "UPDATE_STATS":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_WORKOUT":
      return {
        ...state,
        workoutHistory: [...state.workoutHistory, action.payload],
      };
    case "RESET_STATS":
      return initialStats;
    default:
      return state;
  }
}

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, dispatch] = useReducer(statsReducer, initialStats);
  
  // Load stats from localStorage on initial load
  useEffect(() => {
    const savedStats = localStorage.getItem("userStats");
    if (savedStats) {
      dispatch({ type: "UPDATE_STATS", payload: JSON.parse(savedStats) });
    }
  }, []);
  
  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userStats", JSON.stringify(stats));
  }, [stats]);
  
  const calculateBMI = (weight: number, height: number): number => {
    // BMI = weight(kg) / (height(m) * height(m))
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };
  
  const updateStats = (newStats: Partial<UserStats>) => {
    // If weight or height is updated, recalculate BMI
    if (newStats.weight || newStats.height) {
      const weight = newStats.weight || stats.weight;
      const height = newStats.height || stats.height;
      newStats.bmi = calculateBMI(weight, height);
    }
    
    dispatch({ type: "UPDATE_STATS", payload: newStats });
  };
  
  const addWorkout = (workout: WorkoutData) => {
    dispatch({ type: "ADD_WORKOUT", payload: workout });
  };
  
  const resetStats = () => {
    dispatch({ type: "RESET_STATS" });
  };
  
  return (
    <StatsContext.Provider value={{ stats, updateStats, addWorkout, resetStats, calculateBMI }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};
