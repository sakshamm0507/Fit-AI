import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundScene from '../3d/BackgroundScene';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        {mounted && <BackgroundScene />}
      </div>
      
      {/* Main Content */}
      <Navbar />
      <main className="flex-grow pt-16 pb-8 px-4 container mx-auto max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;