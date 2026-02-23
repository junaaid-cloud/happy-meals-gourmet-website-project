import React, { useState, useMemo } from 'react';
import { FoodItem, ExtraAddOn } from '../types';
import { EXTRA_MEAL_INGREDIENTS, EXTRA_DRINK_INGREDIENTS, EXTRA_ICECREAM_INGREDIENTS } from '../constants';

interface DetailsScreenProps {
  food: FoodItem;
  onBack: () => void;
  onAddToCart: (food: FoodItem, quantity: number, extras: ExtraAddOn[]) => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ food, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Determine which extras to show based on category
  const currentExtrasOptions = useMemo(() => {
    if (food.category === 'Soda' || food.category === 'Drinks') {
      return EXTRA_DRINK_INGREDIENTS;
    }
    if (food.category === 'Ice Cream' || food.category === 'Dessert') {
      return EXTRA_ICECREAM_INGREDIENTS;
    }
    return EXTRA_MEAL_INGREDIENTS;
  }, [food.category]);

  const handleToggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((acc, id) => {
      const extra = currentExtrasOptions.find(ex => ex.id === id);
      return acc + (extra ? extra.price : 0);
    }, 0);
  }, [selectedExtras, currentExtrasOptions]);

  const finalUnitPrice = food.price + extrasTotal;

  return (
    <div className="relative pb-32 min-h-full bg-white animate-in fade-in duration-500">
      {/* Visual Header */}
      <div className="relative h-[380px] overflow-hidden">
        <img src={food.image} className="w-full h-full object-cover animate-in zoom-in-110 duration-[2000ms]" alt={food.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <button onClick={onBack} className="absolute top-8 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-white/40 transition-all active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button className="absolute top-8 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-white/40 transition-all active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 rounded-full px-8 py-3 shadow-2xl flex items-center gap-6 z-10 border-4 border-white animate-in slide-in-from-bottom-4 duration-500 delay-200">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white text-2xl font-black active:scale-125 transition-transform">－</button>
          <span className="text-white font-black text-xl w-6 text-center tabular-nums">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="text-white text-2xl font-black active:scale-125 transition-transform">＋</button>
        </div>
      </div>

      <div className="bg-[#F9F9F9] rounded-t-[45px] px-6 pt-14 pb-10 mt-[-20px] relative z-0">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
           <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight italic">{food.name}</h1>
              <span className="text-[#FF4B4B] text-3xl font-black tracking-tighter tabular-nums animate-pulse">${food.price.toFixed(2)}</span>
           </div>
           <p className="text-slate-400 text-sm leading-relaxed font-medium">{food.description}</p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-400">
          <div className="flex items-center gap-3 bg-white p-3 rounded-[25px] flex-1 mr-2 shadow-sm border border-slate-50">
            <span className="w-10 h-10 bg-yellow-50 rounded-2xl flex items-center justify-center text-lg">⭐</span>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase leading-none">Rating</p>
              <p className="text-[13px] font-black text-slate-800 leading-tight mt-1">{food.rating}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-[25px] flex-1 mx-2 shadow-sm border border-slate-50">
            <span className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-lg">🔥</span>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase leading-none">Energy</p>
              <p className="text-[13px] font-black text-slate-800 leading-tight mt-1">{food.calories}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-[25px] flex-1 ml-2 shadow-sm border border-slate-50">
            <span className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-lg">🕒</span>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase leading-none">Time</p>
              <p className="text-[13px] font-black text-slate-800 leading-tight mt-1">{food.time}</p>
            </div>
          </div>
        </div>

        {/* Base Ingredients */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Base Ingredients</h3>
          <div className="flex gap-4">
            {food.ingredients.map((ing, idx) => (
              <div key={idx} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-50 hover:scale-110 transition-transform cursor-default">
                {ing}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Extras */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-600">
          <div className="flex justify-between items-center mb-5">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                {food.category === 'Soda' || food.category === 'Drinks' ? 'Beverage Boosts' : 
                 (food.category === 'Ice Cream' || food.category === 'Dessert') ? 'Sweet Toppings' : 'Gourmet Extras'}
             </h3>
             <span className="text-slate-400 text-[10px] font-black uppercase italic tracking-wider">Premium Selection</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {currentExtrasOptions.map((extra) => {
              const isActive = selectedExtras.includes(extra.id);
              return (
                <button
                  key={extra.id}
                  onClick={() => handleToggleExtra(extra.id)}
                  className={`relative min-w-[120px] p-5 rounded-[32px] border-2 transition-all flex flex-col items-center gap-2 ${
                    isActive 
                      ? 'bg-white border-[#FF4B4B] shadow-xl shadow-red-50 scale-105' 
                      : 'bg-white border-slate-50 shadow-sm opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-3xl">{extra.icon}</span>
                  <span className="text-[11px] font-black text-slate-800 text-center leading-tight">{extra.name}</span>
                  <span className="text-[10px] font-bold text-slate-400">+$ {extra.price.toFixed(2)}</span>
                  {isActive && (
                    <div className="absolute -top-2 -right-2 bg-[#FF4B4B] w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in duration-300">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-between z-50 animate-in slide-in-from-bottom-full duration-500">
         <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bill</span>
            <div className="flex items-baseline gap-1">
               <span className="text-2xl font-black text-slate-900 tabular-nums animate-in zoom-in duration-300" key={finalUnitPrice * quantity}>
                  ${(finalUnitPrice * quantity).toFixed(2)}
               </span>
               <span className="text-[10px] font-bold text-slate-300">Incl. Extras</span>
            </div>
         </div>
         <button 
           onClick={() => {
             const extras = currentExtrasOptions.filter(e => selectedExtras.includes(e.id));
             onAddToCart(food, quantity, extras);
             onBack();
           }}
           className="bg-[#FF4B4B] text-white px-8 py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 hover:shadow-red-200 transition-all flex items-center gap-3 group"
         >
           Add to Bag
           <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
         </button>
      </div>
    </div>
  );
};

export default DetailsScreen;
