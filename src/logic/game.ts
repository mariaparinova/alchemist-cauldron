import { type GameState } from '../state/game-state.ts';
import { type Difficulty, difficultyTable } from '../data/difficulty.ts';
import { ingredients } from '../data/ingredients.ts';
import { pickRecipe } from './recipe-generator.ts';
import { calculateCauldron } from './calculate-cauldron.ts';
import { isBrewSuccessful } from './brew-check.ts';
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

export function canBrew(state: GameState) {
  return Boolean(
    state.status === 'playing' && state.activeRecipe && state.cauldronIngredients.length,
  );
}

export function brew(params: { state: GameState; difficulty: Difficulty }) {
  const { state, difficulty } = params;
  const { activeRecipe, cauldronIngredients } = state;

  if (!canBrew(state) || !activeRecipe) {
    return null;
  }

  const { recipeTolerance, scorePerBrew, timeBonusPerBrew } = difficultyTable[difficulty];
  const isSuccess = isBrewSuccessful({
    stats: calculateCauldron(cauldronIngredients),
    recipe: activeRecipe,
    tolerance: recipeTolerance,
  });

  state.cauldronIngredients = [];

  if (isSuccess) {
    state.score += scorePerBrew;
    state.timeLeft += timeBonusPerBrew;
    state.activeRecipe = pickRecipe({ difficulty, excludeId: activeRecipe.id });
  } else {
    state.lives -= 1;
  }

  const isCabinetEmpty = Object.values(state.shelfStock).every((stock) => stock === 0);

  if (isCabinetEmpty || state.lives === 0) {
    state.status = 'game-over';
  }

  return isSuccess;
}
