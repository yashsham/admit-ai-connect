import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, User, Mail, Phone, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ScheduleDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScheduleDemoModal = ({ open, onOpenChange }: ScheduleDemoModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeName: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', 
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Demo Scheduled!",
        description: "We'll send you a calendar invite shortly. Check your email!",
      });
      
      onOpenChange(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        collegeName: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule demo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Schedule Personal Demo</span>
          </DialogTitle>
        </DialogHeader>

        <Card className="p-6 bg-ai-gradient-subtle border-primary/20 mb-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-card-foreground">
              🚀 See AdmitConnect AI in Action
            </h3>
            <p className="text-sm text-muted-foreground">
              Get a personalized 30-minute demo tailored to your college's needs
            </p>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address *</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@college.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collegeName" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>College/Institution</span>
              </Label>
              <Input
                id="collegeName"
                value={formData.collegeName}
                onChange={(e) => handleInputChange('collegeName', e.target.value)}
                placeholder="Your college name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Preferred Date *</span>
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Preferred Time *</span>
              </Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your specific requirements or questions..."
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              variant="hero" 
              className="flex-1 btn-shiny"
              disabled={loading}
            >
              {loading ? 'Scheduling...' : 'Schedule Demo'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};