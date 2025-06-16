
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import VehicleDetail from "./pages/VehicleDetail";
import PostVehicle from "./pages/PostVehicle";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Cars from "./pages/Cars";
import Motorbikes from "./pages/Motorbikes";
import Dealers from "./pages/Dealers";
import Sell from "./pages/Sell";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/motorbikes" element={<Motorbikes />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/vehicle/:id" element={<VehicleDetail />} />
          <Route path="/sell" element={<PostVehicle />} />
          <Route path="/post-vehicle" element={<PostVehicle />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
