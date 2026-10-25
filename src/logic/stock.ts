import { type GameState } from '../state/game-state.ts';
import { ingredients } from '../data/ingredients.ts';

export function isCauldronFull(params: { state: GameState; maxIngredients: number }) {
  const { state, maxIngredients } = params;
  return state.cauldronIngredients.length >= maxIngredients;
}

export function addIngredient(params: AddIngredientParams) {
  const { state, ingredientId, maxIngredients } = params;
  const ingredient = ingredients.find((item) => item.id === ingredientId);
  const stock = state.shelfStock[ingredientId] ?? 0;

  if (
    !ingredient ||
    state.status !== 'playing' ||
    stock < 1 ||
    isCauldronFull({ state, maxIngredients })
  ) {
    return false;
  }

  state.shelfStock[ingredientId] = stock - 1;
  state.cauldronIngredients.push(ingredient);

  return true;
}

interface AddIngredientParams {
  state: GameState;
  ingredientId: string;
  maxIngredients: number;
}
