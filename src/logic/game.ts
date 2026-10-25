import { type GameState } from '../state/game-state.ts';
import { type Difficulty, difficultyTable } from '../data/difficulty.ts';
import { ingredients } from '../data/ingredients.ts';
import { pickRecipe } from './recipe-generator.ts';
import { getRandomNumber } from '../utils/numbers.ts';

export function startGame(params: { state: GameState; difficulty: Difficulty }) {
  const { state, difficulty } = params;
  const { lives, startingTime } = difficultyTable[difficulty];
  const MIN_STOCK = 2;
  const MAX_STOCK = 15;

  const shelfStock: Record<string, number> = {};
  ingredients.forEach((ingredient) => {
    shelfStock[ingredient.id] = getRandomNumber({ min: MIN_STOCK, max: MAX_STOCK });
  });

  state.status = 'playing';
  state.score = 0;
  state.lives = lives;
  state.timeLeft = startingTime;
  state.activeRecipe = pickRecipe({ difficulty });
  state.cauldronIngredients = [];
  state.shelfStock = shelfStock;
}
