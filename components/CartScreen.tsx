
import React from 'react';
import { CartItem } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  total: number;
  discountPercentage: number;
  onCheckout: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ 
  cart, onBack, onRemove, onUpdateQty, total, discountPercentage, onCheckout 
}) => {
  const deliveryFee = total > 0 ? 3.50 : 0;
  const discountAmount = total * discountPercentage;
  const finalTotal = total + deliveryFee - discountAmount;

  return (
    <div className="p-6 h-full flex flex-col bg-[#F9F9F9]">
      <div className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center text-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tighter italic">My Cart</h1>
        <div className="w-12 h-12"></div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pb-6 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="text-center py-20 opacity-40">
            <div className="text-6xl mb-4">🛒</div>
            <p className="font-bold text-slate-400">Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex gap-4 relative group">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                   <h3 className="font-black text-slate-800 leading-tight text-sm truncate pr-6">{item.name}</h3>
                   <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.category}</p>
                   {item.extras && item.extras.length > 0 && (
                     <p className="text-[8px] text-[#FF4B4B] font-bold mt-0.5">+{item.extras.map(e => e.name).join(', ')}</p>
                   )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#FF4B4B] font-black text-sm">${((item.price + (item.extras?.reduce((s,e) => s+e.price, 0) || 0)) * item.quantity).toFixed(2)}</span>
                  <div className="bg-slate-50 rounded-xl px-2 py-1 flex items-center gap-3 border border-slate-100">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-800 font-bold">－</button>
                    <span className="text-[11px] font-black w-3 text-center tabular-nums">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-800 font-bold">＋</button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onRemove(item.id)}
                className="absolute top-4 right-4 text-slate-200 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Receipt Summary */}
      <div className="mt-4 space-y-4">
        {discountPercentage > 0 && (
          <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 flex justify-between items-center">
             <div className="flex items-center gap-2">
               <span className="text-lg">🎁</span>
               <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Lucky Spin Discount</span>
             </div>
             <span className="text-green-700 font-black">-{discountPercentage * 100}%</span>
          </div>
        )}

        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-500">
             <span>Subtotal</span>
             <span className="text-slate-800 tabular-nums">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-500">
             <span>Delivery</span>
             <span className="text-slate-800 tabular-nums">${deliveryFee.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-xs font-bold text-green-600">
               <span>Lucky Reward</span>
               <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="h-px bg-slate-50 my-1" />
          <div className="flex justify-between items-center pt-1">
             <span className="font-black text-slate-800">Total</span>
             <span className="text-2xl font-black text-[#FF4B4B] tabular-nums">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="w-full bg-[#FF4B4B] text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 disabled:bg-slate-200 disabled:shadow-none transition-all"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
