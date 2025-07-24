import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Mail, Calendar, Users, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';

interface CampaignCreatorProps {
  onCampaignCreated?: () => void;
}

export const CampaignCreator = ({ onCampaignCreated }: CampaignCreatorProps) => {
  const [campaignData, setCampaignData] = useState({
    name: '',
    type: '',
    scheduledAt: '',
    templateWhatsapp: '',
    templateVoice: '',
  });
  const [generating, setGenerating] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const campaignTypes = [
    { value: 'whatsapp', label: 'WhatsApp Only', icon: MessageSquare, color: 'bg-green-500' },
    { value: 'voice', label: 'Voice Only', icon: Phone, color: 'bg-blue-500' },
    { value: 'both', label: 'Voice + WhatsApp', icon: Users, color: 'bg-purple-500' },
    { value: 'email', label: 'Email Campaign', icon: Mail, color: 'bg-orange-500' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const generateScript = async (type: 'whatsapp' | 'voice') => {
    setGenerating(true);
    try {
      const prompt = type === 'whatsapp' 
        ? `Generate a professional WhatsApp message template for college admission outreach. The message should be personalized, engaging, and encourage prospective students to learn more about our programs. Include placeholders for {name}, {course}, and {college_name}. Keep it under 160 characters.`
        : `Generate a professional voice call script for college admission outreach. The script should be conversational, welcoming, and informative. Include placeholders for {name}, {course}, and {college_name}. The script should be around 30-45 seconds when spoken.`;

      const response = await supabase.functions.invoke('huggingface-ai', {
        body: { prompt }
      });

      if (response.error) throw response.error;

      const script = response.data.generatedText;
      
      if (type === 'whatsapp') {
        setCampaignData(prev => ({ ...prev, templateWhatsapp: script }));
      } else {
        setCampaignData(prev => ({ ...prev, templateVoice: script }));
      }

      toast({
        title: "Script generated!",
        description: `AI-generated ${type} script is ready for review.`,
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setCreating(true);
    try {
      const { error } = await supabase
        .from('campaigns')
        .insert([{
          name: campaignData.name,
          type: campaignData.type,
          scheduled_at: campaignData.scheduledAt ? new Date(campaignData.scheduledAt).toISOString() : null,
          template_whatsapp: campaignData.templateWhatsapp || null,
          template_voice: campaignData.templateVoice || null,
          user_id: user.id,
          status: 'draft'
        }]);

      if (error) throw error;

      toast({
        title: "Campaign created!",
        description: "Your campaign has been saved as a draft.",
      });

      // Reset form
      setCampaignData({
        name: '',
        type: '',
        scheduledAt: '',
        templateWhatsapp: '',
        templateVoice: '',
      });

      onCampaignCreated?.();
    } catch (error: any) {
      toast({
        title: "Creation failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const selectedType = campaignTypes.find(t => t.value === campaignData.type);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-card-foreground mb-2">Create New Campaign</h3>
          <p className="text-sm text-muted-foreground">
            Set up your outreach campaign with AI-powered messaging
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              placeholder="B.Tech Admission 2024"
              value={campaignData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {campaignTypes.map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    campaignData.type === type.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('type', type.value)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{type.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduled">Schedule (Optional)</Label>
            <Input
              id="scheduled"
              type="datetime-local"
              value={campaignData.scheduledAt}
              onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
            />
          </div>

          {(campaignData.type === 'whatsapp' || campaignData.type === 'both') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp-template">WhatsApp Message Template</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => generateScript('whatsapp')}
                  disabled={generating}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {generating ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                id="whatsapp-template"
                placeholder="Hi {name}, we're excited to tell you about our {course} program at {college_name}..."
                value={campaignData.templateWhatsapp}
                onChange={(e) => handleInputChange('templateWhatsapp', e.target.value)}
                rows={3}
              />
            </div>
          )}

          {(campaignData.type === 'voice' || campaignData.type === 'both') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-template">Voice Call Script</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => generateScript('voice')}
                  disabled={generating}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {generating ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                id="voice-template"
                placeholder="Hello {name}, this is calling from {college_name}. We wanted to reach out about our {course} program..."
                value={campaignData.templateVoice}
                onChange={(e) => handleInputChange('templateVoice', e.target.value)}
                rows={4}
              />
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={creating || !campaignData.name || !campaignData.type}
            >
              {creating ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};