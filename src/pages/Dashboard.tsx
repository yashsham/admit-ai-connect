import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Phone, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp,
  FileText,
  Play,
  Pause,
  Settings,
  Bell,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Campaigns",
      value: "12",
      change: "+3",
      changeType: "positive",
      icon: BarChart3
    },
    {
      title: "Messages Sent",
      value: "8,459",
      change: "+1,204",
      changeType: "positive",
      icon: MessageSquare
    },
    {
      title: "Calls Made",
      value: "2,847",
      change: "+586",
      changeType: "positive",
      icon: Phone
    },
    {
      title: "Response Rate",
      value: "24.8%",
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: "B.Tech Admission 2024",
      type: "Voice + WhatsApp",
      status: "Active",
      progress: 75,
      candidates: 1240,
      responses: 298
    },
    {
      id: 2,
      name: "MBA Program Outreach",
      type: "WhatsApp Only",
      status: "Completed",
      progress: 100,
      candidates: 856,
      responses: 203
    },
    {
      id: 3,
      name: "Engineering Seats Alert",
      type: "Voice Only",
      status: "Paused",
      progress: 45,
      candidates: 2100,
      responses: 467
    }
  ];

  return (
    <div className="min-h-screen bg-ai-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ai-gradient rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-card-foreground">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="glass" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="hero" size="lg" className="h-16">
            <Upload className="w-5 h-5 mr-2" />
            Upload Candidates
          </Button>
          <Button variant="ai" size="lg" className="h-16">
            <Play className="w-5 h-5 mr-2" />
            Create Campaign
          </Button>
          <Button variant="glass" size="lg" className="h-16">
            <FileText className="w-5 h-5 mr-2" />
            View Reports
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-card-foreground">{stat.value}</span>
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-ai-gradient rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campaigns List */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-card-foreground">Recent Campaigns</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-border/50 rounded-lg bg-card/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-card-foreground">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={campaign.status === "Active" ? "default" : 
                                 campaign.status === "Completed" ? "secondary" : "outline"}
                        >
                          {campaign.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          {campaign.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-card-foreground">{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                      
                      <div className="flex justify-between text-sm mt-3">
                        <span className="text-muted-foreground">
                          <Users className="w-4 h-4 inline mr-1" />
                          {campaign.candidates} candidates
                        </span>
                        <span className="text-card-foreground">
                          {campaign.responses} responses
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Overview */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Usage This Month</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Voice Calls</span>
                    <span className="text-card-foreground">2,847 / 5,000</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">WhatsApp Messages</span>
                    <span className="text-card-foreground">8,459 / 10,000</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Today's Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-ai-blue" />
                    <span className="text-sm text-muted-foreground">Calls Made</span>
                  </div>
                  <span className="text-card-foreground font-semibold">127</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-ai-teal" />
                    <span className="text-sm text-muted-foreground">Messages Sent</span>
                  </div>
                  <span className="text-card-foreground font-semibold">394</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-ai-purple" />
                    <span className="text-sm text-muted-foreground">Avg. Call Duration</span>
                  </div>
                  <span className="text-card-foreground font-semibold">2:34</span>
                </div>
              </div>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="p-6 bg-ai-gradient-subtle border-primary/50">
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-card-foreground">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground">
                  Get unlimited campaigns and advanced analytics
                </p>
                <Button variant="premium" size="sm" className="w-full">
                  Upgrade Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;