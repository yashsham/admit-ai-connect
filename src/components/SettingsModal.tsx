import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { User, Building2, Bell, Lock, Save } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    college_name: '',
    college_address: '',
    college_website: '',
    notifications_enabled: true,
    email_alerts: true,
    sms_alerts: false
  });

  useEffect(() => {
    if (user && open) {
      loadProfile();
    }
  }, [user, open]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          email: data.email || user?.email || '',
          college_name: data.college_name || '',
          college_address: data.college_address || '',
          college_website: data.college_website || '',
          notifications_enabled: data.notifications_enabled !== false,
          email_alerts: data.email_alerts !== false,
          sms_alerts: data.sms_alerts || false
        });
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: 'new-password' // This would be from a form input
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="college" className="flex items-center space-x-1">
              <Building2 className="w-4 h-4" />
              <span>College</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-1">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <Button onClick={saveProfile} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="college" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="college_name">College Name</Label>
                  <Input
                    id="college_name"
                    value={profile.college_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, college_name: e.target.value }))}
                    placeholder="Your college name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college_address">College Address</Label>
                  <Textarea
                    id="college_address"
                    value={profile.college_address}
                    onChange={(e) => setProfile(prev => ({ ...prev, college_address: e.target.value }))}
                    placeholder="College address"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college_website">College Website</Label>
                  <Input
                    id="college_website"
                    value={profile.college_website}
                    onChange={(e) => setProfile(prev => ({ ...prev, college_website: e.target.value }))}
                    placeholder="https://yourcollege.edu"
                  />
                </div>
                <Button onClick={saveProfile} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save College Info'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={profile.notifications_enabled}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, notifications_enabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get campaign updates via email</p>
                  </div>
                  <Switch
                    checked={profile.email_alerts}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, email_alerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                  </div>
                  <Switch
                    checked={profile.sms_alerts}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, sms_alerts: checked }))}
                  />
                </div>
                <Button onClick={saveProfile} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Notification Settings'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Change Password</Label>
                  <p className="text-sm text-muted-foreground">
                    You will receive an email to reset your password
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    supabase.auth.resetPasswordForEmail(user?.email || '', {
                      redirectTo: window.location.origin + '/auth'
                    });
                    toast({
                      title: "Password reset email sent",
                      description: "Check your email for reset instructions.",
                    });
                  }}
                  variant="outline" 
                  className="w-full"
                >
                  Send Password Reset Email
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};