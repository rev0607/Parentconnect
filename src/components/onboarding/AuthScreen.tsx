import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

interface AuthScreenProps {
  onAuth: (authData: any) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuth, onNext, onBack, onSkip }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handlePhoneAuth = () => {
    if (phoneNumber.length >= 10) {
      setShowOTP(true);
    }
  };

  const handleOTPVerify = () => {
    if (otp.length === 6) {
      onAuth({ phone: phoneNumber, verified: true });
      onNext();
    }
  };

  const handleSocialAuth = (provider: string) => {
    onAuth({ provider, verified: true });
    onNext();
  };

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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {showOTP ? 'Verify Your Phone' : 'Sign Up / Login'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {showOTP ? 'Enter the 6-digit code sent to your phone' : 'Choose your preferred sign-in method'}
            </p>
          </div>

          {!showOTP ? (
            <div className="space-y-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={handlePhoneAuth}
                disabled={phoneNumber.length < 10}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Continue with Phone (OTP)
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Auth Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialAuth('google')}
                  className="w-full flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleSocialAuth('apple')}
                  className="w-full flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🍎</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Continue with Apple</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Code sent to {phoneNumber}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
                />
              </div>

              <button
                onClick={handleOTPVerify}
                disabled={otp.length !== 6}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Verify & Continue
              </button>

              <button
                onClick={() => setShowOTP(false)}
                className="w-full text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Change phone number
              </button>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};