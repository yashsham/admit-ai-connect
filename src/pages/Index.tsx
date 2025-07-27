import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import { ContactModal } from "@/components/ContactModal";
import { BackToTop } from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Index = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PricingSection />
      
      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 py-12" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="text-lg font-semibold bg-ai-gradient bg-clip-text text-transparent logo-colorful">
              AdmitConnect AI
            </div>
            <p className="text-muted-foreground">
              Revolutionizing college admissions with AI-powered automation
            </p>
            
            {/* Contact Us Button */}
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowContact(true)}
                className="hover-lift"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              ©2025 AdmitConnect AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      <ContactModal open={showContact} onOpenChange={setShowContact} />
      <BackToTop />
    </div>
  );
};

export default Index;
