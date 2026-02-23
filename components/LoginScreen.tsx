
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="p-8 h-full flex flex-col justify-center">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-[#FF4B4B] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-red-200 shadow-xl">
          <span className="text-4xl">🍕</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">FoodieFlow</h1>
        <p className="text-slate-400 text-sm">Order your favorite food easily</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            placeholder="hello@example.com"
            className="w-full bg-white px-5 py-4 rounded-2xl border border-slate-100 outline-none focus:border-[#FF4B4B] shadow-sm transition-all"
            defaultValue="user@foodie.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-wider">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white px-5 py-4 rounded-2xl border border-slate-100 outline-none focus:border-[#FF4B4B] shadow-sm transition-all"
            defaultValue="password123"
          />
        </div>
        <div className="text-right">
          <button className="text-[#FF4B4B] text-xs font-bold">Forgot Password?</button>
        </div>
      </div>

      <button
        onClick={onLogin}
        className="w-full bg-[#FF4B4B] text-white py-4 rounded-2xl font-bold mt-10 shadow-lg shadow-red-100 active:scale-95 transition-all"
      >
        Login
      </button>

      <div className="mt-8 text-center text-sm">
        <span className="text-slate-400">Don't have an account? </span>
        <button className="text-[#FF4B4B] font-bold">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginScreen;
