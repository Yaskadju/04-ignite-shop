import React, { ReactNode } from "react"
import { CartProvider } from "use-shopping-cart"

export function Cart({ children }: { children: ReactNode }) {
  return (
    <CartProvider
      shouldPersist={true}
      cartMode="checkout-session"
      currency="BRL"
      stripe={String(process.env.STRIPE_SECRET_KEY)}>
      {children}
    </CartProvider>
  )
}
