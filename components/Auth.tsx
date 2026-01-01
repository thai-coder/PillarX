import React, { useState } from 'react';
import { User, LogIn, UserPlus, ShieldAlert, ShieldCheck } from 'lucide-react';
import { detectActor } from '../utils/detector';
import { User as UserType } from '../types';

interface AuthProps {
  onAuthSuccess: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const { actorType } = detectActor();

  const trackActivity = (type: string, detail: string, userId?: string) => {
    const activities = JSON.parse(localStorage.getItem('pillarx_activities') || '[]');
    const newActivity = {
      id: Date.now().toString(),
      user_id: userId,
      action_type: type,
      action_detail: detail,
      ip_address: '127.0.0.1',
      user_agent: navigator.userAgent,
      actor_type: actorType,
      created_at: new Date().toISOString()
    };
    localStorage.setItem('pillarx_activities', JSON.stringify([newActivity, ...activities]));
  };

  const handleAdminQuickLogin = () => {
    const adminUser: UserType = {
      id: 'admin_001',
      email: 'admin@pillarx.com',
      full_name: 'PillarX Admin',
      role: 'ADMIN',
      is_bot: false
    };
    trackActivity('LOGIN', 'Quick login as Administrator', adminUser.id);
    onAuthSuccess(adminUser);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !fullName)) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('pillarx_users') || '[]');
    
    if (isLogin) {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        trackActivity('LOGIN', `User logged in from ${actorType} client`, user.id);
        onAuthSuccess(user);
      } else {
        setError('Invalid email or password.');
      }
    } else {
      if (users.find((u: any) => u.email === email)) {
        setError('Email already exists.');
        return;
      }
      const newUser: UserType = {
        id: Date.now().toString(),
        email,
        password,
        full_name: fullName,
        role: 'USER',
        is_bot: actorType === 'BOT'
      } as any; // Cast for mock password support
      
      localStorage.setItem('pillarx_users', JSON.stringify([...users, newUser]));
      trackActivity('REGISTER', `New user registered as ${actorType}`, newUser.id);
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-[#005a8d] p-8 text-center text-white">
          <h1 className="text-3xl font-bold tracking-tight">PillarX</h1>
          <p className="mt-2 text-blue-100 opacity-80">{isLogin ? 'Welcome back' : 'Join our community'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
              <ShieldAlert className="w-4 h-4" />
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#005a8d] hover:bg-[#004a75] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isLogin ? 'Login' : 'Create Account'}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Quick Access</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={handleAdminQuickLogin}
            className="w-full border-2 border-[#005a8d] text-[#005a8d] hover:bg-[#005a8d]/5 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            Login as Admin
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-500 font-semibold hover:text-[#005a8d] transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </form>

        {actorType === 'BOT' && (
          <div className="bg-amber-50 px-8 py-3 border-t border-amber-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-amber-700 font-medium italic">Automation detected. Session flagged for review.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;