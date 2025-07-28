import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Phone, MessageSquare, BarChart3, Shield, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: Phone,
      title: "AI Voice Calls",
      description: "Natural, human-like voice conversations with candidates"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Automation",
      description: "Personalized messages with delivery tracking"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time campaign performance and insights"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with IP monitoring"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process thousands of candidates in minutes"
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Advanced AI handles conversations automatically"
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Revolutionize College Admissions with 
              <span className="text-primary"> AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Automate voice calls and WhatsApp messages for college admission marketing. 
              Just upload candidate data and let AI handle the rest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={handleGetStarted}
            >
              {user ? 'Go to Dashboard' : 'Start Free Trial'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3"
            >
              Learn More
              <Brain className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            ✨ No credit card required • 50 free messages & calls
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="features">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              10,000+
            </div>
            <div className="text-muted-foreground">Messages Sent Daily</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              95%
            </div>
            <div className="text-muted-foreground">Delivery Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              500+
            </div>
            <div className="text-muted-foreground">Colleges Trust Us</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;