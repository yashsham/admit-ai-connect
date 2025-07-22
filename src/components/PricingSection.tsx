import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Rocket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small colleges and testing",
      icon: Star,
      features: [
        "500 voice calls/month",
        "1,000 WhatsApp messages",
        "Basic analytics dashboard",
        "Email support",
        "2 campaign templates",
        "CSV upload"
      ],
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For growing institutions",
      icon: Rocket,
      features: [
        "2,500 voice calls/month",
        "5,000 WhatsApp messages",
        "Advanced analytics & reports",
        "Priority support",
        "Unlimited campaign templates",
        "CSV & Excel upload",
        "Custom voice training",
        "A/B testing"
      ],
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/month",
      description: "For large institutions and universities",
      icon: Crown,
      features: [
        "10,000+ voice calls/month",
        "20,000+ WhatsApp messages",
        "Custom analytics dashboard",
        "24/7 phone support",
        "White-label solution",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Multi-language support"
      ],
      buttonVariant: "premium" as const,
      popular: false
    }
  ];

  return (
    <div className="py-20 bg-background" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with our free trial and upgrade when you're ready to scale your admission campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 ${
                plan.popular 
                  ? 'bg-ai-gradient-subtle border-primary shadow-glow scale-105' 
                  : 'bg-card border-border'
              } hover:shadow-card transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-ai-gradient text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.popular ? 'bg-primary' : 'bg-ai-gradient'
                    }`}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">{plan.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-card-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-card-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                  size="lg"
                  onClick={() => navigate("/auth?mode=signup")}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Free Trial Banner */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-ai-gradient-subtle border-border/50">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-card-foreground">
                Start with Free Trial
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Test our platform with 50 free voice calls and 100 WhatsApp messages. 
                No credit card required. Upgrade anytime.
              </p>
              <Button variant="hero" size="lg" onClick={() => navigate("/auth?mode=signup")}>
                Start Free Trial Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;