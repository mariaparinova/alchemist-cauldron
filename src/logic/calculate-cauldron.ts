import { type Ingredient } from '../data/ingredients.ts';

export function calculateCauldron(ingredients: Ingredient[]) {
  const calculatedIngredients: CauldronStats = {
    temperature: 0,
    density: 0,
    magicPower: 0,
  };

  ingredients.forEach((ingredient) => {
    calculatedIngredients.temperature += ingredient.temperature;
    calculatedIngredients.density += ingredient.density;
    calculatedIngredients.magicPower += ingredient.magicPower;
  });

  return calculatedIngredients;
}

export interface CauldronStats {
  temperature: number;
  density: number;
  magicPower: number;
}
