'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowDownRight, ArrowLeft, ArrowUpRight, CalendarDays, Compass, Home, Sparkles, UserRound } from 'lucide-react';
import { Brand, DemoLinks } from '@/components/brand';
import { HomeScreen, DiscoverScreen, PlannerScreen, RecipeScreen } from '@/components/mobile-main';
import { AuthScreen, MealsScreen, NutritionScreen, OnboardingScreen, PricingScreen, ProfileScreen, SetupScreen } from '@/components/mobile-secondary';

const nav = [ { href: '/app', label: 'Home', icon: Home }, { href: '/app/discover', label: 'Discover', icon: Compass }, { href: '/app/ai-planner', label: 'AI Planner', icon: Sparkles }, { href: '/app/meals', label: 'My Meals', icon: CalendarDays }, { href: '/app/profile', label: 'Profile', icon: UserRound } ];
export function MobileApp() {
  const path = usePathname(); const section = path.split('/')[2] || 'home'; const recipeId = path.split('/')[3];
  const flow = ['onboarding', 'auth', 'setup'].includes(section);
  let screen;
  switch (section) {
    case 'discover': screen = <DiscoverScreen/>; break;
    case 'ai-planner': screen = <PlannerScreen/>; break;
    case 'recipe': screen = <RecipeScreen id={recipeId || 'chicken'}/>; break;
    case 'meals': screen = <MealsScreen/>; break;
    case 'nutrition': screen = <NutritionScreen/>; break;
    case 'pricing': screen = <PricingScreen/>; break;
    case 'profile': screen = <ProfileScreen/>; break;
    case 'onboarding': screen = <OnboardingScreen/>; break;
    case 'auth': screen = <AuthScreen/>; break;
    case 'setup': screen = <SetupScreen/>; break;
    default: screen = <HomeScreen/>;
  }
  return <div className="app-presentation"><div className="app-demo-bar"><Brand small/><DemoLinks active="app"/></div><div className="app-presentation-inner"><aside className="app-intro"><div><span className="app-intro-kicker"><span/> THE MOBILE EXPERIENCE</span><h1>A little more<br/><em>you</em> in every day.</h1><p>Good food, thoughtful guidance and a little less wondering what’s for dinner.</p><div className="app-intro-rule"/><div className="app-intro-feature"><div><Sparkles size={19}/></div><span><b>Your day, your way.</b><small>Explore the interactive mobile app demo.</small></span></div><div className="app-intro-feature"><div><CalendarDays size={19}/></div><span><b>Made for real life.</b><small>Tap around — your choices are saved locally.</small></span></div><Link className="app-intro-link" href="/"> <ArrowLeft size={16}/> Back to the website</Link></div><div className="app-intro-foot"><span>MADE WITH CARE, FOR EVERYDAY LIFE</span><ArrowDownRight size={18}/></div></aside><div className="device-outer"><div className="device-frame"><div className="app-status"><b>9:41</b><span>● ● ▰</span></div><div className="app-scroll" key={path}>{screen}</div>{!flow && <nav className="app-bottom-nav" aria-label="App navigation">{nav.map(item => { const Icon = item.icon; const active = item.href === '/app' ? section === 'home' : path.startsWith(item.href) || (item.label === 'Profile' && ['pricing', 'nutrition'].includes(section)); return <Link key={item.href} href={item.href} className={active ? 'active' : ''}><Icon size={19} strokeWidth={active ? 2.3 : 1.8}/><span>{item.label}</span></Link>; })}</nav>}</div></div><aside className="app-side-note"><span className="side-note-star">✳</span><p>"A little more balance,<br/>one meal at a time."</p><div/><span>DESIGNED FOR EVERY DAY</span><Link href="/admin">View business dashboard <ArrowUpRight size={15}/></Link></aside></div></div>;
}
