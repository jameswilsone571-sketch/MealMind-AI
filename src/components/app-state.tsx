'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { dateKey, recipeById, type MealSlot } from '@/lib/demo-data';

export type Profile = { firstName: string; age: string; height: string; weight: string; targetWeight: string; activity: string; diet: string; restrictions: string[]; otherRestrictions: string; allergies: string; goal: string; calorieTarget: number; notifications: boolean };
export type PlanEntry = { id: string; recipeId: string; slot: MealSlot; date: string; eaten: boolean };
type DemoState = { profile: Profile; favourites: string[]; plan: PlanEntry[]; extraCalories: number; subscription: 'Free' | 'Premium'; aiUses: number };
type DemoContext = { state: DemoState; updateProfile: (profile: Partial<Profile>) => void; toggleFavourite: (id: string) => void; addMeal: (id: string, slot?: MealSlot, date?: string) => void; removeMeal: (id: string) => void; replaceMeal: (id: string, recipeId: string) => void; toggleEaten: (id: string) => void; setExtraCalories: (n: number) => void; setSubscription: (s: 'Free' | 'Premium') => void; recordGeneration: () => void; resetDemo: () => void; toast: (message: string) => void };

const defaultProfile: Profile = { firstName: 'Alex', age: '29', height: '170', weight: '68', targetWeight: '', activity: 'Moderately active', diet: 'No preference', restrictions: [], otherRestrictions: '', allergies: '', goal: 'Improve general nutrition', calorieTarget: 2000, notifications: true };
function initialState(): DemoState {
  const today = dateKey();
  return { profile: defaultProfile, favourites: ['pancakes'], extraCalories: 230, subscription: 'Free', aiUses: 0, plan: [
    { id: 'initial-breakfast', recipeId: 'yoghurt', slot: 'Breakfast', date: today, eaten: true },
    { id: 'initial-lunch', recipeId: 'chicken', slot: 'Lunch', date: today, eaten: true },
    { id: 'initial-dinner', recipeId: 'salmon', slot: 'Dinner', date: today, eaten: false },
    { id: 'initial-snack', recipeId: 'snack', slot: 'Snacks', date: today, eaten: true },
  ] };
}
const Context = createContext<DemoContext | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    try { const saved = localStorage.getItem('mealmind-demo-v1'); if (saved) { const parsed = JSON.parse(saved) as DemoState; setState({ ...initialState(), ...parsed, profile: { ...defaultProfile, ...parsed.profile } }); } } catch { /* Start with fresh demo data. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem('mealmind-demo-v1', JSON.stringify(state)); }, [ready, state]);
  useEffect(() => { if (!message) return; const timer = window.setTimeout(() => setMessage(''), 3000); return () => window.clearTimeout(timer); }, [message]);
  const toast = useCallback((text: string) => setMessage(text), []);
  const updateProfile = (profile: Partial<Profile>) => setState(s => ({ ...s, profile: { ...s.profile, ...profile } }));
  const toggleFavourite = (id: string) => { const exists = state.favourites.includes(id); setState(s => ({ ...s, favourites: exists ? s.favourites.filter(x => x !== id) : [...s.favourites, id] })); toast(exists ? 'Removed from your favourites' : 'Saved to your favourites'); };
  const addMeal = (id: string, slot?: MealSlot, date?: string) => { const recipe = recipeById(id); setState(s => ({ ...s, plan: [...s.plan, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, recipeId: id, slot: slot ?? recipe.slot, date: date ?? dateKey(), eaten: false }] })); toast('Added to your meal plan'); };
  const removeMeal = (id: string) => { setState(s => ({ ...s, plan: s.plan.filter(p => p.id !== id) })); toast('Meal removed from your plan'); };
  const replaceMeal = (id: string, recipeId: string) => { setState(s => ({ ...s, plan: s.plan.map(p => p.id === id ? { ...p, recipeId, eaten: false } : p) })); toast('Meal updated'); };
  const toggleEaten = (id: string) => setState(s => ({ ...s, plan: s.plan.map(p => p.id === id ? { ...p, eaten: !p.eaten } : p) }));
  const setExtraCalories = (n: number) => setState(s => ({ ...s, extraCalories: Math.max(0, Math.round(n) || 0) }));
  const setSubscription = (subscription: 'Free' | 'Premium') => { setState(s => ({ ...s, subscription })); toast(`${subscription} demo plan selected`); };
  const recordGeneration = () => setState(s => ({ ...s, aiUses: s.aiUses + 1 }));
  const resetDemo = () => { setState(initialState()); toast('Demo reset to its starting state'); };
  return <Context.Provider value={{ state, updateProfile, toggleFavourite, addMeal, removeMeal, replaceMeal, toggleEaten, setExtraCalories, setSubscription, recordGeneration, resetDemo, toast }}>{children}{message && <div className="toast" role="status"><span>✓</span> {message}</div>}</Context.Provider>;
}
export function useDemo() { const context = useContext(Context); if (!context) throw new Error('useDemo must be used within AppProvider'); return context; }
