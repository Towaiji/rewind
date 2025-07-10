import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../app/lib/supabase';
import { router } from 'expo-router';
import { User } from '../types';

interface AuthContextValue {
  session: Session | null;
  profile: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any } | void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    username: string,
    avatar?: string,
  ) => Promise<{ error: any } | void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  profile: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: async () => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: async () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.log(error);
      return null;
    }
    return {
      ...data,
      joindate: data.joindate ? new Date(data.joindate) : new Date(),
      streakDays: data.streakdays ?? 0,
      totalMemories: data.totalmemories ?? 0,
    } as User;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        fetchProfile(data.session.user.id).then(setProfile);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        fetchProfile(newSession.user.id).then(setProfile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    profile,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (data?.session?.user) {
        fetchProfile(data.session.user.id).then(setProfile);
      }
      return { error } as any;
    },
    signUp: async (email, password, name, username, avatar) => {
      // Check for existing username
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();
      if (existing) {
        return { error: { message: "Username is already taken" } };
      }

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error || !data.user) {
        console.log('Auth signup error:', error);
        return { error } as any;
      }
      const avatarUrl = avatar || `https://i.pravatar.cc/150?u=${username}`;
      const { error: insertError } = await supabase.from('profiles').insert({
        id: data.user.id,
        name,
        username,
        avatar: avatarUrl,
        streakdays: 0,
        totalmemories: 0,
        joindate: new Date().toISOString(),
      });
      if (insertError) {
        console.log('Profile insert error:', insertError);
        return { error: insertError } as any;
      }
      fetchProfile(data.user.id).then(setProfile);
      return { error: null } as any;
    },

    signOut: async () => {
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
      router.replace('/login');
    },
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}