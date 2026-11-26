import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'MealMind AI | A little more joy in every meal',
  description: 'A smarter, more personal way to plan your meals. Explore the MealMind AI product demo.',
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
