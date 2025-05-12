import { toast } from 'sonner';
import { supabase } from './supabase';

export const signup = async (email: string, password: string) => {
  try {
    const user = await supabase.auth.signUp({
      email,
      password,
    });
    if (user.error) {
      toast.error(user.error.message);
      throw new Error(user.error.message);
    }
    return user.data;
  } catch (error) {
    console.error('Error signing up:', error);
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

export const getSession = async () => {
  try {
    const session = await supabase.auth.getSession();
    return session;
  } catch (error) {
    throw Error('Session not found');
  }
};

export const getUser = async () => {
  try {
    const user = await supabase.auth.getUser();
    if (user?.error) {
      throw new Error('An error occurred trying to get the current user');
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await getUser();
    response?.data.user?.id ? true : false;
  } catch (error) {
    console.error(error);
  }
};
