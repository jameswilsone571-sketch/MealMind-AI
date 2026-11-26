import type { ReactNode } from 'react';
import { AppProvider } from '@/components/app-state';
export default function MobileLayout({ children }: { children: ReactNode }) { return <AppProvider>{children}</AppProvider>; }
