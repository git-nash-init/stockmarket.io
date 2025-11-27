import LoginPage from "@/pages/Login";
import Market from "@/pages/Market";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Legal from "@/components/Legal";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StartLearning from "./pages/StartLearning";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes with Navigation */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />

            <Route
              path="/market"
              element={
                <PrivateRoute>
                  <Market />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />

            {/* 👇 Public Pages */}
            <Route path="/start-learning" element={<StartLearning />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal" element={<Legal />} />
          </Route>

          {/* Routes without Navigation */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
