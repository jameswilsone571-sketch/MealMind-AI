'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock3, Flame, Heart, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import { useDemo, type PlanEntry } from '@/components/app-state';
import { dateKey, recipeById, recipes, type MealSlot, type Recipe } from '@/lib/demo-data';

export function ScreenTitle({ eyebrow, title, description, back = '/app' }: { eyebrow?: string; title: string; description?: string; back?: string }) {
  return <div className="screen-title"><div className="screen-title-top"><Link href={back} className="back-button" aria-label="Go back"><ArrowLeft size={19}/></Link>{eyebrow && <span>{eyebrow}</span>}<span className="screen-title-spacer"/></div><h1>{title}</h1>{description && <p>{description}</p>}</div>;
}
export function getNutrition(plan: PlanEntry[], extra: number, date = dateKey()) {
  const eaten = plan.filter(entry => entry.date === date && entry.eaten).map(entry => recipeById(entry.recipeId));
  return { calories: eaten.reduce((sum, r) => sum + r.calories, 0) + (date === dateKey() ? extra : 0), protein: eaten.reduce((sum, r) => sum + r.protein, 0), carbs: eaten.reduce((sum, r) => sum + r.carbs, 0), fat: eaten.reduce((sum, r) => sum + r.fat, 0) };
}
export function CalorieRing({ consumed, target, dark = false }: { consumed: number; target: number; dark?: boolean }) {
  const progress = Math.min(100, Math.max(0, consumed / Math.max(target, 1) * 100));
  return <div className={`calorie-ring ${dark ? 'on-dark' : ''}`} style={{ background: `conic-gradient(${dark ? '#b6d9ad' : '#65a878'} ${progress}%, ${dark ? 'rgba(255,255,255,.18)' : '#e6eee7'} ${progress}%)` }}><div><Flame size={17}/><b>{Math.max(0, target - consumed).toLocaleString('en-GB')}</b><span>kcal left</span></div></div>;
}
export function MacroBar({ name, value, goal, colour }: { name: string; value: number; goal: number; colour: string }) {
  return <div className="macro-bar"><div><span><i style={{ background: colour }}/>{name}</span><b>{value}<small> / {goal}g</small></b></div><div className="macro-track"><i style={{ width: `${Math.min(100, value / goal * 100)}%`, background: colour }}/></div></div>;
}
export function MealRow({ entry, manage = false }: { entry: PlanEntry; manage?: boolean }) {
  const { removeMeal, replaceMeal } = useDemo();
  const [choosing, setChoosing] = useState(false);
  const recipe = recipeById(entry.recipeId);
  const choices = recipes.filter(r => r.slot === entry.slot && r.id !== recipe.id);
  return <article className="meal-row"><Link href={`/app/recipe/${recipe.id}`} className="meal-row-image"><img src={recipe.image} alt={recipe.name}/></Link><div className="meal-row-body"><div className="meal-row-top"><span>{entry.slot.toUpperCase()}</span><span><Flame size={12}/> {recipe.calories} kcal</span></div><Link className="meal-name" href={`/app/recipe/${recipe.id}`}>{recipe.name}</Link><div className="meal-row-actions"><Link href={`/app/recipe/${recipe.id}`}>View recipe <ArrowRight size={12}/></Link><button onClick={() => setChoosing(!choosing)}><RefreshCw size={12}/> Replace</button>{manage && <button className="remove-meal" onClick={() => { if (window.confirm('Remove this meal from your plan?')) removeMeal(entry.id); }} aria-label={`Remove ${recipe.name}`}><Trash2 size={13}/></button>}</div>{choosing && <div className="inline-picker"><b>Swap for</b>{choices.map(choice => <button key={choice.id} onClick={() => { replaceMeal(entry.id, choice.id); setChoosing(false); }}>{choice.name} <ChevronRight size={13}/></button>)}<button onClick={() => setChoosing(false)}>Cancel</button></div>}</div></article>;
}
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { state, toggleFavourite } = useDemo(); const saved = state.favourites.includes(recipe.id);
  return <article className="recipe-card"><div className="recipe-card-image"><Link href={`/app/recipe/${recipe.id}`}><img src={recipe.image} alt={recipe.name}/></Link><button onClick={() => toggleFavourite(recipe.id)} className={`heart-button ${saved ? 'saved' : ''}`} aria-label={saved ? 'Remove from favourites' : 'Save to favourites'}><Heart size={17} fill={saved ? 'currentColor' : 'none'}/></button></div><Link href={`/app/recipe/${recipe.id}`} className="recipe-card-copy"><span>{recipe.tags[0]}</span><h3>{recipe.name}</h3><div><span><Flame size={13}/> {recipe.calories} kcal</span><span><Clock3 size={13}/> {recipe.prep + recipe.cook} min</span></div></Link></article>;
}
export function RecipePicker({ slot, onClose, onPick }: { slot: MealSlot; onClose: () => void; onPick: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const choices = recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => Number(b.slot === slot) - Number(a.slot === slot));
  return <div className="app-modal-backdrop" onClick={onClose}><div className="app-modal picker-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`Add ${slot}`}><div className="modal-grabber"/><div className="app-modal-head"><div><span className="app-kicker">ADD A LITTLE GOODNESS</span><h2>Choose {slot.toLowerCase()}</h2></div><button onClick={onClose} aria-label="Close"><X size={19}/></button></div><input className="app-input" placeholder="Search recipes" value={query} onChange={e => setQuery(e.target.value)}/><div className="picker-list">{choices.map(r => <button key={r.id} onClick={() => onPick(r.id)}><img src={r.image} alt=""/><span><b>{r.name}</b><small>{r.calories} kcal · {r.prep + r.cook} min</small></span><Plus size={19}/></button>)}{!choices.length && <p>No recipes found. Try another search.</p>}</div></div></div>;
}
export function AppModal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return <div className="app-modal-backdrop" onClick={onClose}><div className="app-modal" role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}><div className="modal-grabber"/><button className="app-modal-close" onClick={onClose} aria-label="Close"><X size={19}/></button>{children}</div></div>;
}
export function AppButton({ children, onClick, secondary = false, disabled = false }: { children: React.ReactNode; onClick?: () => void; secondary?: boolean; disabled?: boolean }) {
  return <button disabled={disabled} onClick={onClick} className={`app-button ${secondary ? 'secondary' : ''}`}>{children}</button>;
}
export function CheckLine({ children }: { children: React.ReactNode }) { return <li><span><Check size={13}/></span>{children}</li>; }
