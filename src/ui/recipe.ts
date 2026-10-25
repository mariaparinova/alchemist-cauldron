import { type Recipe } from '../data/recipes.ts';

const recipeRows = [
  { key: 'temperature', icon: '/assets/icons/temperature.svg', label: 'Temperature' },
  { key: 'density', icon: '/assets/icons/density.svg', label: 'Density' },
  { key: 'magicPower', icon: '/assets/icons/magic-power.svg', label: 'Magic Power' },
] as const;

export function Recipe() {
  const heading = document.createElement('span');
  heading.classList.add('recipe-heading');
  heading.textContent = 'Recipe';

  const recipe = document.createElement('div');
  recipe.classList.add('recipe');
  recipe.append(heading);

  return recipe;
}

export function renderRecipe(params: RenderRecipeParams) {
  const { container, recipe, maxIngredients } = params;

  const heading = document.createElement('span');
  heading.classList.add('recipe-heading');
  heading.textContent = 'Recipe';

  const name = document.createElement('h2');
  name.classList.add('recipe-name');
  name.textContent = recipe.name;

  const rows = recipeRows.map((row) =>
    RecipeRow({
      icon: row.icon,
      label: row.label,
      min: recipe[row.key].min,
      max: recipe[row.key].max,
    }),
  );

  const recipeDetails = document.createElement('div');
  recipeDetails.classList.add('recipe-details');
  recipeDetails.append(...rows);

  const ingredientsLabel = document.createElement('span');
  ingredientsLabel.classList.add('recipe-label');
  ingredientsLabel.textContent = 'Ingredients';

  const ingredientsCount = document.createElement('span');
  ingredientsCount.classList.add('recipe-ingredients-count');

  const ingredientsContainer = document.createElement('div');
  ingredientsContainer.classList.add('recipe-row', 'recipe-ingredients');
  ingredientsContainer.append(ingredientsLabel, ingredientsCount);

  container.replaceChildren(heading, name, recipeDetails, ingredientsContainer);
  renderRecipeIngredients({ container, used: 0, max: maxIngredients });
}

export function renderRecipeIngredients(params: RenderRecipeIngredientsParams) {
  const { container, used, max } = params;

  const count = container.querySelector<HTMLElement>('.recipe-ingredients-count');
  if (count) {
    count.textContent = `${used} / ${max}`;
  }
}

function RecipeRow(params: { icon: string; label: string; min: number; max: number }) {
  const { icon, label, min, max } = params;

  const iconElement = document.createElement('img');
  iconElement.classList.add('recipe-icon');
  iconElement.src = icon;
  iconElement.alt = label;

  const labelElement = document.createElement('span');
  labelElement.classList.add('recipe-label');
  labelElement.textContent = label;

  const range = document.createElement('span');
  range.classList.add('recipe-range');
  range.textContent = `${min} – ${max}`;

  const row = document.createElement('div');
  row.classList.add('recipe-row');
  row.append(iconElement, labelElement, range);

  return row;
}

interface RenderRecipeParams {
  container: HTMLElement;
  recipe: Recipe;
  maxIngredients: number;
}

interface RenderRecipeIngredientsParams {
  container: HTMLElement;
  used: number;
  max: number;
}
