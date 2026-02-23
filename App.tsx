
import React, { useState, useMemo, useCallback } from 'react';
import { AppScreen, FoodItem, CartItem, ExtraAddOn } from './types';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import CartScreen from './components/CartScreen';
import CheckoutScreen from './components/CheckoutScreen';
import ProfileScreen from './components/ProfileScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('LOGIN');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeDiscount, setActiveDiscount] = useState<number>(0);

  const addToCart = useCallback((food: FoodItem, quantity: number = 1, extras: ExtraAddOn[] = []) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...food, quantity, extras }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  }, []);

  const navigateToDetails = (food: FoodItem) => {
    setSelectedFood(food);
    setCurrentScreen('DETAILS');
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => {
      const extrasTotal = (item.extras || []).reduce((sum, e) => sum + e.price, 0);
      return acc + (item.price + extrasTotal) * item.quantity;
    }, 0);
  }, [cart]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN':
        return <LoginScreen onLogin={() => setCurrentScreen('HOME')} />;
      case 'HOME':
        return (
          <HomeScreen
            onSelectFood={navigateToDetails}
            onNavigate={setCurrentScreen}
            onWinDiscount={setActiveDiscount}
            currentDiscount={activeDiscount}
            cartCount={cart.length}
          />
        );
      case 'DETAILS':
        return selectedFood ? (
          <DetailsScreen
            food={selectedFood}
            onBack={() => setCurrentScreen('HOME')}
            onAddToCart={addToCart}
          />
        ) : null;
      case 'CART':
        return (
          <CartScreen
            cart={cart}
            onBack={() => setCurrentScreen('HOME')}
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
            total={totalAmount}
            discountPercentage={activeDiscount}
            onCheckout={() => setCurrentScreen('CHECKOUT')}
          />
        );
      case 'CHECKOUT':
        return (
          <CheckoutScreen
            total={totalAmount}
            discountPercentage={activeDiscount}
            onBack={() => setCurrentScreen('CART')}
            onSuccess={() => {
              setCart([]);
              setActiveDiscount(0);
              setCurrentScreen('HOME');
            }}
          />
        );
      case 'PROFILE':
        return <ProfileScreen onBack={() => setCurrentScreen('HOME')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      {/* Device Frame Simulation */}
      <div className="relative w-full max-w-[420px] h-[850px] bg-white rounded-[45px] shadow-2xl overflow-hidden border-[8px] border-slate-900 flex flex-col">
        {/* Branding & Status Header */}
        <div className="absolute top-0 left-0 right-0 h-32 z-50 overflow-hidden rounded-b-[40px]">
          <div className="absolute inset-0 bg-[#880000]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#A00000] to-[#600000] opacity-80" />
          
          <div className="absolute inset-0 flex flex-col px-6 pb-6 pt-8">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-black italic tracking-tighter text-white">
                    Happy<span className="text-[#FF4B4B]">Meals</span>
                  </h1>
                  <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Gourmet Delivery</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold text-white">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Notch Integration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-[60]" />

        {/* Main Content Area */}
        <main className="flex-1 w-full mt-32 overflow-y-auto custom-scrollbar bg-[#F9F9F9]">
          {renderScreen()}
        </main>

        {/* Global Bottom Tab Bar */}
        {currentScreen !== 'LOGIN' && (
          <nav className="bg-white/80 backdrop-blur-lg border-t border-slate-100 px-10 flex items-center justify-between h-20">
            <button onClick={() => setCurrentScreen('HOME')} className={`flex flex-col items-center gap-1 ${currentScreen === 'HOME' ? 'text-[#FF4B4B]' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span className="text-[10px] font-bold">Menu</span>
            </button>
            <button onClick={() => setCurrentScreen('CART')} className={`relative flex flex-col items-center gap-1 ${currentScreen === 'CART' ? 'text-[#FF4B4B]' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#FF4B4B] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.length}
                </span>
              )}
              <span className="text-[10px] font-bold">Cart</span>
            </button>
            <button onClick={() => setCurrentScreen('PROFILE')} className={`flex flex-col items-center gap-1 ${currentScreen === 'PROFILE' ? 'text-[#FF4B4B]' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="text-[10px] font-bold">Profile</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default App;
