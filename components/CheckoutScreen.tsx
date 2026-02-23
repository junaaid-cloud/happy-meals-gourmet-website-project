
import React, { useState } from 'react';
import { ADDRESSES } from '../constants';

interface CheckoutScreenProps {
  total: number;
  discountPercentage: number;
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ total, discountPercentage, onBack, onSuccess }) => {
  const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0].id);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = 3.50;
  const discountAmount = total * discountPercentage;
  const finalTotal = total + deliveryFee - discountAmount;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-[#F9F9F9]">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center text-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tighter italic">Checkout</h1>
        <div className="w-12 h-12"></div>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto pb-6 custom-scrollbar">
        {/* Shipping Section */}
        <div className="space-y-4">
           <div className="flex justify-between items-center mb-1">
             <h2 className="font-bold text-slate-800">Shipping To</h2>
             <button className="text-[10px] font-black text-[#FF4B4B] uppercase tracking-widest">Change</button>
           </div>
           
           <div className="space-y-3">
             {ADDRESSES.map((addr) => (
               <button 
                 key={addr.id}
                 onClick={() => setSelectedAddress(addr.id)}
                 className={`w-full p-5 rounded-[32px] border-2 transition-all flex items-center gap-4 text-left ${
                   selectedAddress === addr.id ? 'bg-white border-[#FF4B4B] shadow-xl shadow-red-50' : 'bg-white border-slate-50 opacity-60'
                 }`}
               >
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAddress === addr.id ? 'border-[#FF4B4B]' : 'border-slate-200'}`}>
                    {selectedAddress === addr.id && <div className="w-2.5 h-2.5 bg-[#FF4B4B] rounded-full" />}
                 </div>
                 <div>
                    <h3 className="font-black text-slate-800 text-sm leading-none mb-1">{addr.type}</h3>
                    <p className="text-[11px] font-medium text-slate-400">{addr.address}</p>
                 </div>
               </button>
             ))}
           </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
           <h2 className="font-bold text-slate-800">Payment Method</h2>
           <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 space-y-4">
              {[
                { id: 'card', name: 'Credit card', icon: '💳' },
                { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                { id: 'google', name: 'Google pay', icon: 'G' },
              ].map((method) => (
                <button 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                     <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">{method.icon}</span>
                     <span className="font-bold text-sm text-slate-600 group-hover:text-slate-900">{method.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#FF4B4B]' : 'border-slate-100'}`}>
                    {paymentMethod === method.id && <div className="w-2 h-2 bg-[#FF4B4B] rounded-full" />}
                  </div>
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Summary & Final Button */}
      <div className="mt-4 space-y-5">
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
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-[#FF4B4B] text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-200"
        >
          {isProcessing ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : 'Place to Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutScreen;
