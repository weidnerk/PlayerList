import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { AuthForm } from '../components/AuthForm';

export function SignIn() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Trophy className="w-12 h-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'signin' 
              ? 'Sign in to manage your NFL player list'
              : 'Sign up to start tracking your favorite players'}
          </p>
        </div>

        <AuthForm 
          mode={mode}
          onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        />
      </div>
    </div>
  );
}