'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/lib/db';

interface ExtraFeaturesContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const ExtraFeaturesContext = createContext<ExtraFeaturesContextType | undefined>(undefined);

export function ExtraFeaturesProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem('compareList');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedRecent = localStorage.getItem('recentlyViewed');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);
      if (savedDarkMode) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Failed to load extra features state', e);
    }
  }, []);

  // Sync state changes to localStorage and DOM
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      let next;
      if (exists) {
        next = prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 products at a time.');
          return prev;
        }
        next = [...prev, product];
      }
      localStorage.setItem('compareList', JSON.stringify(next));
      return next;
    });
  };

  const isInCompare = (productId: string) => compareList.some((p) => p.id === productId);
  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('compareList');
  };

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const next = [product, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem('recentlyViewed', JSON.stringify(next));
      return next;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  return (
    <ExtraFeaturesContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        recentlyViewed,
        addToRecentlyViewed,
        darkMode,
        toggleDarkMode,
        quickViewProduct,
        setQuickViewProduct
      }}
    >
      {children}
    </ExtraFeaturesContext.Provider>
  );
}

export function useExtraFeatures() {
  const context = useContext(ExtraFeaturesContext);
  if (!context) {
    throw new Error('useExtraFeatures must be used within an ExtraFeaturesProvider');
  }
  return context;
}
