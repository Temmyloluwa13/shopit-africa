'use client';

import React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import CartToast from '@/components/ui/CartToast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartToast />
    </CartProvider>
  );
}
