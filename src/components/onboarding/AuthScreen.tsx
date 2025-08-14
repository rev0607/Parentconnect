import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { supabase } from '../../lib/supabase';

interface AuthScreenProps {
  onAuth: (authData: any) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  isAuthenticated?: boolean;
  authUser?: any;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  onAuth, 
  onNext, 
  onBack, 
  onSkip, 
  isAuthenticated = false,
  authUser = null 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, show success state and auto-advance
  useEffect(() => {
    if (isAuthenticated && authUser) {
      console.log('User is already authenticated, auto-advancing...');
      setTimeout(() => {
        onNext();
      }, 1500); // Give user time to see success message
    }
  }, [isAuthenticated, authUser, onNext]);

  useEffect(() => {
    // Handle URL hash parameters (OAuth callback)
    const handleOAuthCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      
      if (accessToken) {
        console.log('OAuth callback detected with access token');
        setIsLoading(true);
        
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          if (data.session?.user) {
            console.log('Session established from OAuth callback');
            // The auth state listener in OnboardingFlow will handle this
          }
        } catch (err) {
          console.error('OAuth callback error:', err);
          setError('Authentication failed. Please try again.');
        } finally {
          setIsLoading(false);
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleOAuthCallback();
  }, []);

  const handleGoogleSignIn = async () => {
    if (isAuthenticated) {
      onNext();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Initiating Google sign in...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            scope: 'openid email profile'
          }
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      console.log('Google sign in initiated:', data);
      // The redirect will happen automatically
      // Don't set loading to false here as we're redirecting
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in with Google. Please try again.');
      setIsLoading(false);
    }
  };

  // Show success state if authenticated
  if (isAuthenticated && authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome!</h2>
          <p className="text-gray-600 dark:text-gray-300">Successfully signed in. Proceeding to setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          onClick={onSkip}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium"
        >
          Skip for now
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Smart Parent AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to create your personalized learning dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
                <p>Auth Status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
                <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 py-4 px-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              ) : (
                <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
              )}
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {isLoading ? 'Signing in...' : isAuthenticated ? 'Continue to Setup' : 'Continue with Google'}
              </span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Coming Soon</span>
              </div>
            </div>

            {/* Future Auth Methods */}
            <div className="space-y-3 opacity-50">
              <button
                disabled
                className="w-full flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📱</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Continue with Phone (OTP)</span>
              </button>

              <button
                disabled
                className="w-full flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🍎</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Continue with Apple</span>
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};