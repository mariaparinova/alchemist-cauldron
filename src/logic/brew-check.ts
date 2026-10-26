import { type Recipe } from '../data/recipes.ts';
import { type CauldronStats } from './calculate-cauldron.ts';

const statKeys: (keyof CauldronStats)[] = ['temperature', 'density', 'magicPower'];

export function isBrewSuccessful(params: isBrewSuccessfulParams) {
  const { stats, recipe, tolerance } = params;

  return statKeys.every((key) => {
    const { min, max } = recipe[key];
    const value = stats[key];

    return value >= min - tolerance && value <= max + tolerance;
  });
}

interface isBrewSuccessfulParams {
  stats: CauldronStats;
  recipe: Recipe;
  tolerance: number;
}
