import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
// Public pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Splash from './pages/Splash';
import NotFound from './pages/NotFound';
// Protected pages
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<Splash />} />

          {/* Protected — requires auth */}
          <Route path="/onboarding/1" element={<ProtectedRoute><Onboarding1 /></ProtectedRoute>} />
          <Route path="/onboarding/2" element={<ProtectedRoute><Onboarding2 /></ProtectedRoute>} />
          <Route path="/onboarding/3" element={<ProtectedRoute><Onboarding3 /></ProtectedRoute>} />
          <Route path="/onboarding/4" element={<ProtectedRoute><Onboarding4 /></ProtectedRoute>} />
          <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/career-path"  element={<ProtectedRoute><CareerPath /></ProtectedRoute>} />
          <Route path="/resource"     element={<ProtectedRoute><Resource /></ProtectedRoute>} />
          <Route path="/community"    element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/group-thread" element={<ProtectedRoute><GroupThread /></ProtectedRoute>} />
          <Route path="/mentors"      element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
          <Route path="/mentor/:id"   element={<ProtectedRoute><MentorProfile /></ProtectedRoute>} />
          <Route path="/jobs"         element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/job/:id"      element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
          <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/premium"      element={<ProtectedRoute><Premium /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
