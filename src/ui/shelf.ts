import type { Ingredient } from '../data/ingredients.ts';

const statIcons = {
  temperature: { src: '/assets/icons/temperature.svg', alt: 'Temperature' },
  density: { src: '/assets/icons/density.svg', alt: 'Density' },
  magicPower: { src: '/assets/icons/magic-power.svg', alt: 'Magic Power' },
} as const;

export function Cabinet(params: { slots: number }) {
  const { slots } = params;
  const emptyShelves = new Array(slots).fill(null).map(() => EmptyShelf());

  const cabinet = document.createElement('div');
  cabinet.classList.add('cabinet');
  cabinet.append(...emptyShelves);

  return cabinet;
}

export function EmptyShelf() {
  const shelf = document.createElement('div');
  shelf.classList.add('shelf');

  return shelf;
}

export function Shelf(params: ShelfParams) {
  const { ingredient, amount, onClick } = params;
  const { id, name, icon, temperature, density, magicPower } = ingredient;

  const ingredientIcon = document.createElement('img');
  ingredientIcon.classList.add('icon', 'shelf-icon');
  ingredientIcon.src = `/assets/icons/ingredients/${icon}.svg`;
  ingredientIcon.alt = name;

  const ingredientName = document.createElement('span');
  ingredientName.classList.add('shelf-name');
  ingredientName.textContent = name;

  const buttonClickHandler = () => {
    const clickedShelf = ingredientButton.closest<HTMLElement>('.shelf');
    const ingredientId = clickedShelf?.dataset.ingredientId;
    if (ingredientId) {
      onClick(ingredientId);
    }
  };

  const ingredientButton = document.createElement('button');
  ingredientButton.classList.add('button', 'shelf-button');
  ingredientButton.type = 'button';
  ingredientButton.disabled = amount <= 0;
  ingredientButton.append(ingredientIcon);
  ingredientButton.addEventListener('click', buttonClickHandler);

  const details = document.createElement('div');
  details.classList.add('shelf-details');
  details.append(
    ShelfStat({ ...statIcons.temperature, value: temperature }),
    ShelfStat({ ...statIcons.density, value: density }),
    ShelfStat({ ...statIcons.magicPower, value: magicPower }),
  );

  const info = document.createElement('div');
  info.classList.add('shelf-info');
  info.append(ingredientName, details);

  const ingredientAmount = document.createElement('div');
  ingredientAmount.classList.add('shelf-amount');
  ingredientAmount.textContent = `${amount}`;

  const shelf = document.createElement('div');
  shelf.classList.add('shelf');
  shelf.dataset.ingredientId = id;
  shelf.append(ingredientButton, info, ingredientAmount);

  return shelf;
}

export function fillCabinet(params: FillCabinetParams) {
  const { cabinet, ingredients, stock, onSelect } = params;
  const slots = Array.from(cabinet.children);

  slots.forEach((slot, index) => {
    const ingredient = ingredients[index];
    if (ingredient) {
      slot.replaceWith(Shelf({ ingredient, amount: stock[ingredient.id] ?? 0, onClick: onSelect }));
    }
  });
}

export function clearCabinet(cabinet: HTMLElement) {
  const slots = Array.from(cabinet.children);
  slots.forEach((slot) => slot.replaceWith(EmptyShelf()));
}

export function renderCabinet(params: RenderCabinetParams) {
  const { cabinet, stock, isLocked } = params;
  const shelves = cabinet.querySelectorAll<HTMLElement>('[data-ingredient-id]');

  shelves.forEach((shelf) => {
    const { ingredientId } = shelf.dataset;
    if (ingredientId) {
      updateShelf({ shelf, amount: stock[ingredientId] ?? 0, isLocked });
    }
  });
}

function updateShelf(params: UpdateShelfParams) {
  const { shelf, amount, isLocked } = params;

  shelf.classList.toggle('shelf-out-of-stock', amount === 0 || isLocked);

  const amountElement = shelf.querySelector<HTMLElement>('.shelf-amount');
  if (amountElement) {
    amountElement.textContent = `${amount}`;
  }

  const button = shelf.querySelector<HTMLButtonElement>('.shelf-button');
  if (button) {
    button.disabled = amount === 0 || isLocked;
  }
}

function ShelfStat(params: { src: string; alt: string; value: number }) {
  const { src, alt, value } = params;

  const icon = document.createElement('img');
  icon.classList.add('shelf-stat-icon');
  icon.src = src;
  icon.alt = alt;

  const valueElement = document.createElement('span');
  valueElement.textContent = `${value}`;

  const stat = document.createElement('div');
  stat.classList.add('shelf-stat');
  stat.append(icon, valueElement);

  return stat;
}

interface ShelfParams {
  ingredient: Ingredient;
  amount: number;
  onClick: (ingredientId: string) => void;
}

interface FillCabinetParams {
  cabinet: HTMLElement;
  ingredients: Ingredient[];
  stock: Record<string, number>;
  onSelect: (ingredientId: string) => void;
}

interface RenderCabinetParams {
  cabinet: HTMLElement;
  stock: Record<string, number>;
  isLocked: boolean;
}

interface UpdateShelfParams {
  shelf: HTMLElement;
  amount: number;
  isLocked: boolean;
}
