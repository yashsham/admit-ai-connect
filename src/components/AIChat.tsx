import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  sessionId?: string;
  onNewSession?: (sessionId: string) => void;
}

export const AIChat = ({ sessionId, onNewSession }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant for AdmitConnect. I can help you create campaign scripts, generate personalized messages, analyze candidate data, and provide strategic advice for your outreach campaigns. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(sessionId);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (currentSessionId) {
      loadMessages();
    }
  }, [currentSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const loadMessages = async () => {
    if (!currentSessionId || !user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const loadedMessages = data.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        timestamp: new Date(msg.created_at)
      }));

      if (loadedMessages.length > 0) {
        setMessages(loadedMessages);
      }
    } catch (error: any) {
      console.error('Error loading messages:', error);
    }
  };

  const createSession = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{
          user_id: user.id,
          session_name: `Chat ${new Date().toLocaleString()}`
        }])
        .select()
        .single();

      if (error) throw error;

      setCurrentSessionId(data.id);
      onNewSession?.(data.id);
      return data.id;
    } catch (error: any) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  const saveMessage = async (role: 'user' | 'assistant', content: string, sessionId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('chat_messages')
        .insert([{
          session_id: sessionId,
          role,
          content
        }]);
    } catch (error: any) {
      console.error('Error saving message:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    try {
      // Create session if needed
      let sessionId = currentSessionId;
      if (!sessionId) {
        sessionId = await createSession();
        if (!sessionId) throw new Error('Failed to create session');
      }

      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMsg]);

      // Save user message
      await saveMessage('user', userMessage, sessionId);

      // Create enhanced prompt for college admission context
      const contextPrompt = `You are an AI assistant specialized in college admissions and student outreach. The user is using AdmitConnect AI platform for managing admission campaigns.

Context: You help with:
- Creating effective campaign scripts for WhatsApp and voice calls
- Generating personalized messages for prospective students
- Analyzing candidate data and suggesting targeting strategies
- Providing advice on admission outreach best practices
- Writing compelling content for different courses and programs

User message: ${userMessage}

Please provide a helpful, professional response focused on college admissions and student outreach.`;

      // Get AI response
      const response = await supabase.functions.invoke('huggingface-ai', {
        body: { prompt: contextPrompt }
      });

      if (response.error) throw response.error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.generatedText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Save assistant message
      await saveMessage('assistant', response.data.generatedText, sessionId);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="p-4 border-b bg-ai-gradient-subtle rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ai-gradient rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by Mistral-7B</p>
          </div>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-ai-gradient text-white'}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-ai-gradient text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about campaigns, scripts, or student outreach..."
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};