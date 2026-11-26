import Link from 'next/link';
import { ArrowUpRight, Leaf } from 'lucide-react';

export function Brand({ light = false, small = false }: { light?: boolean; small?: boolean }) {
  return <Link href="/" className={`brand ${light ? 'brand-light' : ''} ${small ? 'brand-small' : ''}`} aria-label="MealMind AI home"><span className="brand-mark"><Leaf size={small ? 17 : 20} strokeWidth={2.3}/></span><span>MealMind<span className="brand-ai"> AI</span></span></Link>;
}
export function DemoLinks({ active }: { active: 'website' | 'app' | 'admin' }) {
  return <div className="demo-links"><span className="demo-label">DEMO VIEWS</span><Link className={active === 'website' ? 'active' : ''} href="/">Website</Link><Link className={active === 'app' ? 'active' : ''} href="/app">App</Link><Link className={active === 'admin' ? 'active' : ''} href="/admin">Admin <ArrowUpRight size={11}/></Link></div>;
}
