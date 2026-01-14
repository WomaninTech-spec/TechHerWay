import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-6">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/8369a51c-cd7e-4e66-8f47-68a135643347.png"
            alt="TechHerWay Logo"
            className="w-32 h-32 mx-auto"
          />
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            TechHerWay
          </h1>
          
          <p className="text-xl text-gray-700 font-medium">
            Build your tech career, your way.
          </p>
        </div>

        <Button
          onClick={() => navigate('/onboarding/1')}
          className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Commencer
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}