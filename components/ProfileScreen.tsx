
import React, { useState } from 'react';

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const pastOrders = [
    {
      id: '#HM-84291',
      date: 'Oct 24, 2024',
      items: 'Royal Angus Beef, Truffle Fries, Nitro Cold Brew',
      total: '$31.50',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: '#HM-84102',
      date: 'Oct 18, 2024',
      items: 'Smoked Chicken Alfredo, Classic Margherita',
      total: '$41.50',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: '#HM-83995',
      date: 'Oct 12, 2024',
      items: 'Vanilla Bean Brioche Toast, Iced Latte',
      total: '$22.50',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=150'
    }
  ];

  return (
    <div className="p-0 h-full flex flex-col bg-[#F9F9F9] relative overflow-hidden">
      {/* Main Content */}
      <div className={`p-6 flex flex-col h-full transition-transform duration-500 ${showHistory ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center text-slate-800 active:scale-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-lg font-black text-slate-800 tracking-tighter italic uppercase">Account</h1>
          <button className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center text-slate-400 active:rotate-45 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-[36px] overflow-hidden border-4 border-white shadow-xl shadow-red-100/50 group">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt="Alex Thompson" 
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#FF4B4B] p-2 rounded-xl shadow-lg border-2 border-white text-white animate-bounce cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </div>
          </div>
          <h2 className="text-xl font-black text-slate-900 italic mt-4 tracking-tight">Alex Thompson</h2>
          <p className="text-[#FF4B4B] text-[9px] font-black uppercase tracking-[0.2em] mt-1 px-3 py-0.5 bg-red-50 rounded-full">Elite Foodie • Lv. 24</p>
        </div>

        <div className="flex gap-3 mb-6">
          {[
            { label: 'Orders', val: '24', icon: '📦' },
            { label: 'Rewards', val: '12', icon: '🎫' },
            { label: 'Points', val: '850', icon: '✨' }
          ].map((stat, i) => (
            <div key={i} className="flex-1 bg-white p-3.5 rounded-[24px] shadow-sm border border-slate-50 text-center hover:shadow-md transition-shadow">
              <span className="text-lg block mb-0.5">{stat.icon}</span>
              <span className="text-slate-900 text-lg font-black tabular-nums">{stat.val}</span>
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto pb-4 custom-scrollbar pr-1">
          {[
            { icon: '📍', label: 'My Addresses' },
            { icon: '💳', label: 'Payment Methods' },
            { icon: '📦', label: 'Order History', action: () => setShowHistory(true) },
            { icon: '🎫', label: 'Promo Codes' },
            { icon: '💡', label: 'About HappyMeals', action: () => setShowAbout(true) },
            { icon: '🎧', label: 'Help & Support' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={item.action}
              className="w-full bg-white p-3.5 rounded-[20px] shadow-sm border border-slate-50 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-slate-50/50"
            >
              <div className="flex items-center gap-3">
                 <span className="text-base opacity-80 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                 <span className="text-[11px] font-black text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{item.label}</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <svg className="text-slate-300 group-hover:text-[#FF4B4B] transition-colors" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </button>
          ))}

          <button className="w-full mt-4 py-4 rounded-[20px] text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#FF4B4B] transition-all flex items-center justify-center gap-2 group">
            <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Logout Account
          </button>
        </div>
      </div>

      {/* Slide-in Order History */}
      <div className={`absolute inset-0 bg-[#F9F9F9] z-20 transition-transform duration-500 p-6 flex flex-col ${showHistory ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center gap-6 mb-8">
          <button onClick={() => setShowHistory(false)} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center text-slate-800 active:scale-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-xl font-black text-slate-800 tracking-tighter italic">Order History</h1>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-1">
          {pastOrders.map((order, i) => (
            <div key={i} className="bg-white p-4 rounded-[28px] border border-slate-50 shadow-sm flex gap-4 animate-in slide-in-from-right duration-500" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-inner">
                 <img src={order.image} className="w-full h-full object-cover" alt="Meal" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-slate-800 text-xs leading-none">{order.id}</h3>
                    <span className="text-[8px] font-black text-green-500 uppercase px-1.5 py-0.5 bg-green-50 rounded-full">{order.status}</span>
                  </div>
                  <p className="text-[9px] font-medium text-slate-400 mt-0.5 line-clamp-1">{order.items}</p>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-bold text-slate-300">{order.date}</span>
                   <span className="text-xs font-black text-[#FF4B4B]">{order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-5 bg-[#FF4B4B] rounded-[32px] text-center shadow-xl shadow-red-100 flex flex-col items-center">
           <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] mb-2">Feeling Hungry?</span>
           <button onClick={() => { setShowHistory(false); onBack(); }} className="bg-white text-[#FF4B4B] px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Order Again</button>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white rounded-[40px] shadow-2xl relative max-w-sm text-center overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
            <div className="h-40 relative bg-slate-900 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF4B4B] rounded-full blur-[60px] animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] animate-pulse delay-700" />
               </div>
               <div className="relative z-10 flex flex-col items-center">
                  <div className="text-5xl mb-2 transform hover:scale-110 transition-transform">🥘</div>
                  <h2 className="text-white font-black italic text-2xl tracking-tighter leading-none">THE VISION</h2>
               </div>
            </div>
            <div className="p-8 pt-6">
              <p className="text-slate-500 text-[13px] leading-relaxed font-medium mb-6">
                HappyMeals democratizes fine dining using AI Scouts and Gamified rewards.
              </p>
              <button 
                onClick={() => setShowAbout(false)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
