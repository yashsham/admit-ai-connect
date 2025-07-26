import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';
import { ScheduleDemoModal } from './ScheduleDemoModal';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [showScheduleDemo, setShowScheduleDemo] = useState(false);
  const demoVideos = [
    {
      title: "Getting Started with AdmitConnect AI",
      description: "Learn how to set up your first campaign in under 5 minutes",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "4:32",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "AI Voice Call Demo",
      description: "See our AI making real admission calls to prospective students",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "3:15",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "WhatsApp Automation Walkthrough",
      description: "Complete guide to WhatsApp campaign setup and management",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "6:45",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Product Demos</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Featured Demo */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
              <Button
                size="lg"
                variant="hero"
                onClick={() => openVideo(demoVideos[0].url)}
                className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/30 transition-colors"
              >
                <Play className="w-16 h-16 text-white" />
              </Button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold">{demoVideos[0].title}</h3>
                <p className="text-sm opacity-90">{demoVideos[0].description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-black/30 px-2 py-1 rounded">
                    {demoVideos[0].duration}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">Featured</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Demos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoVideos.slice(1).map((video, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div 
                  className="relative aspect-video bg-gradient-to-br from-ai-teal to-ai-purple rounded-lg flex items-center justify-center"
                  onClick={() => openVideo(video.url)}
                >
                  <Play className="w-12 h-12 text-white" />
                  <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-card-foreground mb-1">{video.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openVideo(video.url)}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Demo Summary */}
          <Card className="p-6 bg-ai-gradient-subtle">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Ready to get started?</h3>
              <p className="text-muted-foreground">
                See how AdmitConnect AI can transform your college admission process with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" onClick={() => onOpenChange(false)}>
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowScheduleDemo(true)}
                >
                  Schedule Personal Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
      
      <ScheduleDemoModal 
        open={showScheduleDemo} 
        onOpenChange={setShowScheduleDemo} 
      />
    </Dialog>
  );
};
