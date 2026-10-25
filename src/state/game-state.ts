import { type Recipe } from '../data/recipes.ts';
import { type Difficulty } from '../data/difficulty.ts';
import { type Ingredient } from '../data/ingredients.ts';

export const initState: GameState = {
  status: 'menu',
  score: 0,
  timeLeft: 0,
  lives: 0,
  activeRecipe: null,
  cauldronIngredients: [],
  shelfStock: {},
  difficulty: 'medium',
};

export type GameStatus = 'menu' | 'playing' | 'paused' | 'game-over';

export interface GameState {
  status: GameStatus;
  score: number;
  timeLeft: number;
  lives: number;
  activeRecipe: Recipe | null;
  cauldronIngredients: Ingredient[];
  shelfStock: Record<string, number>; // ingredient id -> portions left
  difficulty?: Difficulty; // Level 2+
  lastReactionId?: string | null; // Level 3+
}
