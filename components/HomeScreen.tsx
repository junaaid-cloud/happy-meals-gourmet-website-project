
import React, { useState, useEffect, useMemo } from 'react';
import { FoodItem, Recommendation, AppScreen } from '../types';
import { FOOD_ITEMS, CATEGORIES } from '../constants';
import { getSmartRecommendations } from '../services/gemini';

interface HomeScreenProps {
  onSelectFood: (food: FoodItem) => void;
  onNavigate: (screen: AppScreen) => void;
  onWinDiscount: (discount: number) => void;
  currentDiscount: number;
  cartCount: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onSelectFood, 
  onNavigate, 
  onWinDiscount, 
  currentDiscount,
  cartCount
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<Recommendation | null>(null);
  const [showWheel, setShowWheel] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // AI-Powered Search Scout Logic with optimized speed
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const q = searchQuery.trim();
      if (q.length >= 2) {
        setIsLoading(true);
        const result = await getSmartRecommendations(q, FOOD_ITEMS);
        setAiRecommendation(result);
        setIsLoading(false);
      } else {
        setAiRecommendation(null);
      }
    }, 400); // Shorter debounce for snappier feel

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      const prizes = [0.1, 0.15, 0.2, 0.3];
      const win = prizes[Math.floor(Math.random() * prizes.length)];
      onWinDiscount(win);
      setIsSpinning(false);
      setTimeout(() => setShowWheel(false), 1500);
    }, 2000);
  };

  const sortedAndFilteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    
    let items = FOOD_ITEMS.filter(item => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) ||
             item.description.toLowerCase().includes(q) ||
             item.tags.some(t => t.toLowerCase().includes(q)) ||
             item.ingredients.some(i => i.toLowerCase().includes(q));
    });

    if (aiRecommendation) {
      const recId = aiRecommendation.foodId;
      const recItem = FOOD_ITEMS.find(i => i.id === recId);
      if (recItem) {
        const filteredWithoutRec = items.filter(i => i.id !== recId);
        items = [recItem, ...filteredWithoutRec];
      }
    }
    return items;
  }, [activeCategory, searchQuery, aiRecommendation]);

  const smartCravings = ['Egg Free', 'Spicy', 'Cold Brew', 'Vegan', 'Sweet', 'Mild'];

  return (
    <div className="min-h-full pb-32">
      <div className="px-6 mt-6 mb-6">
        {currentDiscount > 0 ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎉</span>
              <div>
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-none">Voucher Applied</p>
                <p className="text-sm font-bold text-green-700 italic">Discount available: {currentDiscount * 100}% OFF</p>
              </div>
            </div>
            <div className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-green-100">ACTIVE</div>
          </div>
        ) : (
          <div className="relative h-[160px] bg-gradient-to-br from-[#8366F1] to-[#8B5CF6] rounded-[40px] p-7 overflow-hidden flex flex-col justify-between shadow-2xl transition-all hover:scale-[1.02]">
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md text-[9px] font-black text-white px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Daily Bonus</span>
              <h4 className="text-2xl font-black text-white italic uppercase leading-tight mb-1">Lucky Spin</h4>
              <p className="text-white/60 text-[10px] font-bold">Win secret discounts for your order!</p>
            </div>
            <button onClick={() => setShowWheel(true)} className="bg-white text-[#8366F1] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit relative z-10 shadow-lg active:scale-95 transition-all">Spin Now</button>
            <div className="absolute -bottom-10 -right-10 opacity-20 transform rotate-12 scale-[3.5] select-none">🎡</div>
          </div>
        )}
      </div>

      <div className="px-6 mb-8">
        <div className="relative group mb-4">
          <svg className={`absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF4B4B] transition-all ${isLoading ? 'animate-pulse text-[#FF4B4B]' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="What are you craving? (e.g. 'egg free')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white p-5 pl-14 rounded-[22px] border border-slate-50 shadow-sm focus:border-[#FF4B4B] outline-none transition-all placeholder:text-slate-300 font-medium"
          />
          {isLoading && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
               <div className="animate-spin h-4 w-4 border-2 border-[#FF4B4B] border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scroll-hide">
           {smartCravings.map(craving => (
             <button key={craving} onClick={() => setSearchQuery(craving)} className="bg-white border border-slate-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#FF4B4B] transition-all whitespace-nowrap">{craving}</button>
           ))}
        </div>
      </div>

      <div className="px-6 mb-10">
        <h2 className="font-bold text-slate-900 text-lg uppercase tracking-tighter italic mb-4">ON THE MENU</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scroll-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex flex-col items-center gap-2 p-3 min-w-[70px] rounded-[28px] transition-all border ${
                activeCategory === cat.name ? 'bg-[#FF4B4B] text-white border-transparent shadow-xl shadow-red-50' : 'bg-white text-slate-600 border-slate-100'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10">
          {sortedAndFilteredItems.map((item, index) => {
            const isMatch = searchQuery.trim().length > 0 && index === 0;
            return (
              <div 
                key={item.id} 
                onClick={() => onSelectFood(item)}
                className={`relative bg-white rounded-[40px] p-4 transition-all duration-500 cursor-pointer border-2 group ${
                  isMatch ? 'border-[#FF4B4B] shadow-2xl scale-[1.04]' : 'border-white shadow-sm hover:shadow-xl'
                }`}
              >
                {isMatch && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F172A] px-4 py-1.5 rounded-full shadow-2xl z-20 flex items-center justify-center min-w-[110px] whitespace-nowrap">
                     <span className="text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                       🔥 YOUR MATCH
                     </span>
                  </div>
                )}

                <div className="relative w-full aspect-square rounded-[30px] overflow-hidden mb-4">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl shadow-md">
                    <span className="text-[10px] font-black flex items-center gap-0.5">⭐ {item.rating}</span>
                  </div>
                </div>
                
                <div className="px-1">
                  <h4 className="font-black text-slate-900 text-[14px] leading-tight mb-1 uppercase truncate">{item.name}</h4>
                  <p className={`text-[10px] leading-tight mb-3 line-clamp-3 overflow-hidden ${isMatch ? 'text-[#FF4B4B] italic font-medium' : 'text-slate-400'}`}>
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center relative">
                    <span className="text-[#FF4B4B] font-black text-base tabular-nums">${item.price.toFixed(2)}</span>
                    <button className="w-9 h-9 bg-[#FF4B4B] rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-100 active:scale-90 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showWheel && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-white w-full max-w-[360px] rounded-[60px] p-12 text-center relative overflow-hidden shadow-2xl">
             <h3 className="text-2xl font-black text-slate-900 uppercase mb-1 italic">Lucky Wheel</h3>
             <div className="relative w-64 h-64 mx-auto my-12">
                <div 
                  className={`w-full h-full rounded-full border-[12px] border-slate-50 shadow-2xl relative flex items-center justify-center transition-transform duration-[2.5s] ease-out`}
                  style={{ 
                    background: 'conic-gradient(#FF4B4B 0 90deg, #F9FAFB 90deg 180deg, #FF4B4B 180deg 270deg, #F9FAFB 270deg 360deg)',
                    transform: isSpinning ? 'rotate(1800deg)' : 'rotate(0deg)'
                  }}
                ><span className="text-5xl">🏆</span></div>
             </div>
             <button onClick={handleSpin} disabled={isSpinning} className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-sm transition-all ${isSpinning ? 'bg-slate-100 text-slate-400' : 'bg-[#FF4B4B] text-white shadow-2xl active:scale-95'}`}>{isSpinning ? 'SPINNING...' : 'TAP TO SPIN'}</button>
             <button onClick={() => setShowWheel(false)} className="mt-8 text-slate-300 text-[10px] font-black uppercase tracking-widest">Return</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
