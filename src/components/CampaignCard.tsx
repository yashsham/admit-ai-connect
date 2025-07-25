import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  MessageSquare, 
  Phone, 
  Users, 
  Calendar,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  candidates_count: number;
  messages_sent: number;
  calls_made: number;
  responses_received: number;
  created_at: string;
  scheduled_at?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  onUpdate: () => void;
}

export const CampaignCard = ({ campaign, onUpdate }: CampaignCardProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'paused': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'voice': return <Phone className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const newStatus = campaign.status === 'active' ? 'paused' : 'active';
      
      const { error } = await supabase
        .from('campaigns')
        .update({ status: newStatus })
        .eq('id', campaign.id);

      if (error) throw error;

      toast({
        title: "Campaign updated",
        description: `Campaign ${newStatus === 'active' ? 'resumed' : 'paused'} successfully.`,
      });
      
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaign.id);

      if (error) throw error;

      toast({
        title: "Campaign deleted",
        description: "Campaign has been permanently deleted.",
      });
      
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="p-6 hover-lift bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            {getTypeIcon(campaign.type)}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{campaign.name}</h3>
            <p className="text-sm text-muted-foreground">
              Created {formatDate(campaign.created_at)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusColor(campaign.status)}>
            {campaign.status}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={loading}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast({ title: "Edit feature coming soon!" })}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleStatusToggle} disabled={loading}>
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={loading} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{campaign.candidates_count}</div>
          <div className="text-xs text-muted-foreground">Candidates</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{campaign.messages_sent}</div>
          <div className="text-xs text-muted-foreground">Messages</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{campaign.calls_made}</div>
          <div className="text-xs text-muted-foreground">Calls</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-500">{campaign.responses_received}</div>
          <div className="text-xs text-muted-foreground">Responses</div>
        </div>
      </div>

      {campaign.scheduled_at && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          Scheduled for {formatDate(campaign.scheduled_at)}
        </div>
      )}
    </Card>
  );
};