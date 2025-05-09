import { toast } from 'sonner';
import { supabase } from './supabase';

export const signup = async (email: string, password: string) => {
  try {
    const user = await supabase.auth.signUp({
      email,
      password,
    });
    if (user.error) {
      throw new Error(user.error.message);
    }
    return user.data;
  } catch (error) {
    console.error('Error signing up:', error);
    toast.error('Error signing up, please try again later.');
    throw error;
  }
};

export const googleSignIn = async () => {
  try {
    const response = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    toast.error('Error signing in with Google, please try again later.');
  } finally {
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error('Error logging in, please try again later.');
    throw error;
  }
};
