import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Crown, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthProvider';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentModal = ({ open, onOpenChange }: PaymentModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleRazorpayPayment = () => {
    if (typeof window.Razorpay === 'undefined') {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => initializePayment();
      document.body.appendChild(script);
    } else {
      initializePayment();
    }
  };

  const initializePayment = () => {
    const options = {
      key: 'rzp_test_DEMO_KEY', // Demo key - replace with actual
      amount: 299900, // ₹2999 in paise
      currency: 'INR',
      name: 'AdmitConnect AI',
      description: 'Pro Plan Subscription',
      image: '/favicon.ico',
      prefill: {
        name: user?.user_metadata?.full_name || 'User',
        email: user?.email || '',
      },
      theme: {
        color: '#3B82F6'
      },
      handler: function (response: any) {
        // Payment successful
        toast({
          title: "Payment Successful!",
          description: "Welcome to AdmitConnect AI Pro! 🎉",
        });
        onOpenChange(false);
        
        // Here you would typically update the user's subscription in your database
        console.log('Payment ID:', response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          toast({
            title: "Payment Cancelled",
            description: "You can upgrade to Pro anytime from your dashboard.",
          });
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const proFeatures = [
    'Unlimited Campaigns',
    'Advanced AI Analytics',
    'Priority Voice & WhatsApp API',
    'Custom Script Templates',
    'Real-time Performance Insights',
    'Dedicated Support',
    'Export & Reporting Tools',
    'Multi-language Support'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <span>Upgrade to Pro</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing Card */}
          <Card className="p-6 bg-ai-gradient-subtle border-primary/20">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                <Sparkles className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
              
              <div>
                <h3 className="text-2xl font-bold text-card-foreground">Pro Plan</h3>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-3xl font-bold text-primary">₹2,999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Everything you need to scale your admissions
                </p>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full btn-shiny pulse-glow"
                onClick={handleRazorpayPayment}
              >
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now - ₹2,999/month
              </Button>
            </div>
          </Card>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {proFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-card-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Security & Guarantee */}
          <Card className="p-4 bg-muted/50">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                🔒 Secure payment powered by Razorpay
              </p>
              <p className="text-xs text-muted-foreground">
                Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};