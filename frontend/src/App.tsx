import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './components/layout/AppLayout';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const DietPlans = lazy(() => import('./pages/DietPlans'));
const Stats = lazy(() => import('./pages/Stats'));

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/diet-plans" element={<DietPlans />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </AppLayout>
  );
}

export default App;