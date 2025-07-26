import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    toast({
      title: "Welcome back!",
      description: "Successfully signed in to your account.",
    });
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
            email: email,
          },
        ]);

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    toast({
      title: "Account created!",
      description: "Welcome to AdmitConnect AI. You can now access your dashboard.",
    });
  };

  const signInWithGoogleAuth = async () => {
    try {
      const result = await signInWithGoogle();
      const { user: firebaseUser } = result;
      
      // Sign in to Supabase with the Google access token
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: await firebaseUser.getIdToken(),
      });

      if (error) throw error;

      // Create or update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: firebaseUser.uid,
          full_name: firebaseUser.displayName,
          email: firebaseUser.email,
        });

      if (profileError) {
        console.error('Error creating/updating profile:', profileError);
      }

      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google.",
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle: signInWithGoogleAuth,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};