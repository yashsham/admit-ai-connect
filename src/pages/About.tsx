import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Zap, Target, Mail, Phone, Globe } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import { ScheduleModal } from "@/components/ScheduleModal";
import { BackToTop } from "@/components/BackToTop";

const About = () => {
  const [showContact, setShowContact] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const scrollToFeatures = () => {
    window.location.href = '/#features';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-ai-gradient bg-clip-text text-transparent">
              About AdmitConnect AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing college admissions through AI-powered automation, 
            personalized outreach, and intelligent campaign management.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We empower educational institutions to connect with prospective students 
              through intelligent automation, personalized messaging, and data-driven insights.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform combines cutting-edge AI technology with proven marketing strategies 
              to streamline admissions outreach and improve enrollment outcomes.
            </p>
          </div>
          <Card className="p-8 hover-lift">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">1000+</h3>
                <p className="text-sm text-muted-foreground">Students Reached</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">95%</h3>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">50+</h3>
                <p className="text-sm text-muted-foreground">Institutions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">24/7</h3>
                <p className="text-sm text-muted-foreground">Automation</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Features</h2>
          <p className="text-lg text-muted-foreground">
            Advanced technology that makes admissions outreach effortless and effective
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">LLM-Powered Content</h3>
            <p className="text-muted-foreground">
              Generate personalized messages, scripts, and responses using advanced 
              language models trained for educational outreach.
            </p>
          </Card>
          
          <Card className="p-6 hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Channel Outreach</h3>
            <p className="text-muted-foreground">
              Reach students through WhatsApp, voice calls, and email with 
              automated campaigns and intelligent scheduling.
            </p>
          </Card>
          
          <Card className="p-6 hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
            <p className="text-muted-foreground">
              Track campaign performance, student engagement, and conversion 
              rates with real-time analytics and insights.
            </p>
          </Card>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Passionate about transforming education through technology
          </p>
        </div>
        
        <Card className="p-8 max-w-2xl mx-auto text-center hover-lift">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">AdmitConnect AI Team</h3>
          <p className="text-primary font-medium mb-4">Founders & AI Engineers</p>
          <p className="text-muted-foreground mb-6">
            We're a team of AI engineers, educators, and marketing experts dedicated to 
            making college admissions more accessible and efficient through technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowContact(true)}
              className="hover-lift"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={scrollToFeatures}
              className="hover-lift"
            >
              <Globe className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </div>
        </Card>
      </section>

      {/* Demo Booking Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-8 text-center bg-ai-gradient-subtle border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a personalized demo to see how AdmitConnect AI can transform 
            your admissions outreach and boost enrollment.
          </p>
          <Button 
            size="lg" 
            className="cta-glow pulse-glow"
            onClick={() => setShowSchedule(true)}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Live Demo
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-lg font-semibold bg-ai-gradient bg-clip-text text-transparent">
              AdmitConnect AI
            </div>
            <p className="text-muted-foreground">
              Revolutionizing college admissions with AI-powered automation
            </p>
            <div className="text-sm text-muted-foreground">
              ©2025 AdmitConnect AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      <ContactModal open={showContact} onOpenChange={setShowContact} />
      <ScheduleModal open={showSchedule} onOpenChange={setShowSchedule} />
      <BackToTop />
    </div>
  );
};

export default About;