// src/types/razorpay.d.ts

type RazorpayTheme = { color?: string };
type RazorpayModal = { ondismiss?: () => void };

type RazorpayOptions = {
  key?: string;
  order_id: string;
  amount: number;
  currency: "INR";
  name: string;
  description?: string;
  notes?: Record<string, string>;
  handler: () => void;
  theme?: RazorpayTheme;
  modal?: RazorpayModal;
};

type RazorpayInstance = { open: () => void };

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

export {};
