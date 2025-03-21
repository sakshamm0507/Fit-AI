
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider } from "@/context/ChatContext";
import { StatsProvider } from "@/context/StatsContext";
import { Button } from "@progress/kendo-react-buttons";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import DietPlans from "./pages/DietPlans";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";

// Import Kendo default theme
import "@progress/kendo-theme-default/dist/all.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ChatProvider>
        <StatsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/diet-plans" element={<DietPlans />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
            <div className="hidden">
              <Button>Kendo Button (Hidden)</Button>
            </div>
          </TooltipProvider>
        </StatsProvider>
      </ChatProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
