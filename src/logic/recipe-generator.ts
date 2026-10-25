import { type Difficulty } from '../data/difficulty.ts';
import { type Recipe, recipes } from '../data/recipes.ts';
import { getRandomNumber } from '../utils/numbers.ts';

export function pickRecipe(params: { difficulty: Difficulty; excludeId?: string }): Recipe | null {
  const { difficulty, excludeId } = params;

  if (!excludeId) {
    return recipes[getRandomNumber({ min: 0, max: recipes.length - 1 })];
  }

  const recipesWithoutPrevious = recipes.filter(
    (recipeItem) => recipeItem.difficulty === difficulty && recipeItem.id !== excludeId,
  );

  if (!recipesWithoutPrevious.length) {
    return null;
  }

  const randomId = getRandomNumber({ min: 0, max: recipesWithoutPrevious.length - 1 });

  return recipesWithoutPrevious[randomId];
}
