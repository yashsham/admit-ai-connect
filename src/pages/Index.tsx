import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PricingSection />
      
      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-lg font-semibold bg-ai-gradient bg-clip-text text-transparent">
              AdmitConnect AI
            </div>
            <p className="text-muted-foreground">
              Revolutionizing college admissions with AI-powered automation
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 AdmitConnect AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
