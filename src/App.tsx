import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Splash from './pages/Splash';
import Onboarding1 from './pages/Onboarding1';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import Onboarding4 from './pages/Onboarding4';
import Dashboard from './pages/Dashboard';
import CareerPath from './pages/CareerPath';
import Resource from './pages/Resource';
import Community from './pages/Community';
import GroupThread from './pages/GroupThread';
import Mentors from './pages/Mentors';
import MentorProfile from './pages/MentorProfile';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding/1" element={<Onboarding1 />} />
          <Route path="/onboarding/2" element={<Onboarding2 />} />
          <Route path="/onboarding/3" element={<Onboarding3 />} />
          <Route path="/onboarding/4" element={<Onboarding4 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/career-path" element={<CareerPath />} />
          <Route path="/resource" element={<Resource />} />
          <Route path="/community" element={<Community />} />
          <Route path="/group-thread" element={<GroupThread />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;