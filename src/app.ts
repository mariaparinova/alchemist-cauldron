import { Score } from './ui/score.ts';
import { Timer } from './ui/timer.ts';
import { Lives, renderLives } from './ui/lives.ts';
import { Cabinet, fillCabinet } from './ui/shelf.ts';
import { Cauldron } from './ui/cauldron.ts';
import { Recipe, renderRecipe } from './ui/recipe.ts';
import { initState } from './state/game-state.ts';
import { difficultyTable } from './data/difficulty.ts';
import { ActionButton, renderActionButton } from './ui/action-button.ts';
import { ingredients } from './data/ingredients.ts';
import { startGame } from './logic/game.ts';
import { CurrentStats } from './ui/stats.ts';
import { Help } from './ui/help.ts';
import { Settings } from './ui/settings.ts';

export function init(app: HTMLDivElement) {
  const difficulty = initState.difficulty ?? 'medium';
  const { ingredientsOnShelf, maxIngredientsInCauldron } = difficultyTable[difficulty];

  const header = document.createElement('header');
  header.classList.add('header');
  const livesContainer = Lives();
  header.append(Score(), Timer(), livesContainer);

  const cauldronWithStats = document.createElement('div');
  cauldronWithStats.classList.add('cauldron-with-stats');
  cauldronWithStats.append(Cauldron(), CurrentStats());

  const recipeContainer = Recipe();
  const cabinet = Cabinet({ slots: ingredientsOnShelf });

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  gameContainer.append(cauldronWithStats, recipeContainer);

  const main = document.createElement('main');
  main.classList.add('main');
  main.append(cabinet, gameContainer);

  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const onPlay = () => {
    startGame({ state: initState, difficulty });
    renderLives({ container: livesContainer, lives: initState.lives });

    if (initState.activeRecipe) {
      renderRecipe({
        container: recipeContainer,
        recipe: initState.activeRecipe,
        maxIngredients: maxIngredientsInCauldron,
      });
    }

    fillCabinet({
      cabinet,
      ingredients,
      stock: initState.shelfStock,
      onSelect: () => {},
    });
    renderActionButton({ button: actionButton, status: initState.status });
  };

  const actionButton = ActionButton({
    status: initState.status,
    onClick: () => {
      if (initState.status === 'menu') {
        onPlay();
      }
    },
  });

  footer.append(Help(), actionButton, Settings());

  app.append(header, main, footer);
}
