export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export type Recipe = {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prep: number;
  cook: number;
  slot: MealSlot;
  tags: string[];
  ingredients: string[];
  instructions: string[];
};

export const recipes: Recipe[] = [
  {
    id: 'yoghurt', name: 'Greek yoghurt & berries', description: 'Creamy Greek yoghurt, juicy berries and a little crunch. A lovely start to the day.', image: '/images/yoghurt.jpg', calories: 320, protein: 22, carbs: 40, fat: 8, prep: 5, cook: 0, slot: 'Breakfast', tags: ['Vegetarian', 'Quick & easy', 'Breakfast'],
    ingredients: ['200g Greek yoghurt', 'A handful of mixed berries', '30g crunchy granola', '1 tsp honey'],
    instructions: ['Spoon the yoghurt into a bowl.', 'Scatter over the berries and granola.', 'Drizzle with honey and enjoy.'],
  },
  {
    id: 'chicken', name: 'Grilled chicken quinoa bowl', description: 'A colourful, satisfying bowl of grilled chicken, wholesome grains and fresh vegetables.', image: '/images/chicken.jpg', calories: 520, protein: 42, carbs: 48, fat: 16, prep: 10, cook: 20, slot: 'Lunch', tags: ['High protein', 'Balanced', 'Lunch'],
    ingredients: ['150g chicken breast', '100g cooked quinoa', 'Cherry tomatoes and cucumber', 'A handful of mixed leaves', '1 tsp olive oil', 'Lemon and herbs'],
    instructions: ['Season the chicken with herbs and a little salt.', 'Grill until cooked through, then slice.', 'Prepare the quinoa and chop the vegetables.', 'Add everything to a bowl and finish with lemon and olive oil.'],
  },
  {
    id: 'salmon', name: 'Salmon with roasted vegetables', shortName: 'Mediterranean salmon', description: 'Tender salmon with colourful roasted vegetables and a bright lemon finish.', image: '/images/salmon.jpg', calories: 610, protein: 38, carbs: 40, fat: 26, prep: 10, cook: 25, slot: 'Dinner', tags: ['High protein', 'Balanced dinner', 'Pescatarian'],
    ingredients: ['1 salmon fillet', '1 courgette', '1 red pepper', '150g baby potatoes', 'Lemon, olive oil and herbs'],
    instructions: ['Heat the oven to 200°C.', 'Chop the vegetables and toss with olive oil.', 'Roast for 15 minutes, then add the salmon.', 'Cook for a further 12–15 minutes and serve with lemon.'],
  },
  {
    id: 'snack', name: 'Almonds & fresh fruit', description: 'A simple, naturally sweet snack with a satisfying crunch.', image: '/images/vegetarian.jpg', calories: 180, protein: 5, carbs: 20, fat: 9, prep: 3, cook: 0, slot: 'Snacks', tags: ['Vegetarian', 'Quick & easy', 'Snack'],
    ingredients: ['A small handful of almonds', '1 apple or seasonal fruit'],
    instructions: ['Wash and slice the fruit.', 'Serve with the almonds.'],
  },
  {
    id: 'med-bowl', name: 'Grilled chicken Mediterranean bowl', description: 'A fresh, feel-good bowl made with juicy grilled chicken, quinoa and a zesty lemon dressing.', image: '/images/hero-bowl.jpg', calories: 485, protein: 42, carbs: 38, fat: 16, prep: 10, cook: 20, slot: 'Lunch', tags: ['High protein', 'Mediterranean', 'Balanced'],
    ingredients: ['150g grilled chicken breast', '100g cooked quinoa', 'Cherry tomatoes', 'Cucumber', 'Fresh spinach', '1 tsp olive oil', 'Lemon dressing'],
    instructions: ['Season the chicken.', 'Grill until fully cooked.', 'Prepare the quinoa.', 'Chop the vegetables.', 'Combine the ingredients in a bowl.', 'Add lemon dressing and serve.'],
  },
  {
    id: 'pancakes', name: 'Protein breakfast pancakes', description: 'Fluffy oat pancakes topped with berries for a breakfast worth getting up for.', image: '/images/pancakes.jpg', calories: 380, protein: 27, carbs: 44, fat: 10, prep: 5, cook: 10, slot: 'Breakfast', tags: ['High protein', 'Breakfast', 'Vegetarian'],
    ingredients: ['40g oats', '1 egg', '100g Greek yoghurt', 'Mixed berries', 'A splash of milk'],
    instructions: ['Blend the oats, egg, yoghurt and milk.', 'Cook small pancakes in a non-stick pan.', 'Top with berries and serve warm.'],
  },
  {
    id: 'avocado', name: 'Avocado & egg toast', description: 'A classic combination with creamy avocado, egg and fresh greens.', image: '/images/avocado.jpg', calories: 340, protein: 18, carbs: 31, fat: 16, prep: 5, cook: 8, slot: 'Breakfast', tags: ['Quick & easy', 'Vegetarian', 'Breakfast'],
    ingredients: ['1 slice wholegrain bread', '½ avocado', '1 egg', 'A handful of leaves', 'Lemon and chilli flakes'],
    instructions: ['Toast the bread and cook the egg to your liking.', 'Mash the avocado with lemon.', 'Layer onto the toast, add the egg and serve with greens.'],
  },
  {
    id: 'pasta', name: 'Healthy vegetable pasta', description: 'A vibrant bowl of wholewheat pasta, tomatoes, greens and herbs.', image: '/images/pasta.jpg', calories: 430, protein: 19, carbs: 62, fat: 12, prep: 10, cook: 15, slot: 'Dinner', tags: ['Vegetarian', 'Balanced dinner', 'Quick & easy'],
    ingredients: ['75g wholewheat pasta', 'Cherry tomatoes', 'A handful of spinach', '30g feta', 'Fresh basil and olive oil'],
    instructions: ['Cook the pasta according to the packet.', 'Warm the tomatoes and spinach in a pan.', 'Toss together and top with feta and basil.'],
  },
  {
    id: 'veggie', name: 'Garden goodness grain bowl', description: 'A delicious mix of grains, seasonal vegetables and a light herb dressing.', image: '/images/vegetarian.jpg', calories: 445, protein: 18, carbs: 56, fat: 14, prep: 10, cook: 15, slot: 'Lunch', tags: ['Vegetarian', 'Vegan', 'Balanced'],
    ingredients: ['100g cooked quinoa', '½ tin chickpeas', 'Seasonal vegetables', 'Mixed leaves', 'Lemon and herbs'],
    instructions: ['Cook the quinoa and rinse the chickpeas.', 'Chop the vegetables and herbs.', 'Combine in a bowl and dress with lemon.'],
  },
];

export const recipeById = (id: string) => recipes.find((recipe) => recipe.id === id) ?? recipes[0];
export const slots: MealSlot[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
export function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
