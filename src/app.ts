import { Score } from './ui/score.ts';
import { Timer } from './ui/timer.ts';
import { Lives, renderLives } from './ui/lives.ts';
import { Cabinet, fillCabinet } from './ui/shelf.ts';
import { Cauldron } from './ui/cauldron.ts';
import { Recipe, renderRecipe } from './ui/recipe.ts';
import { initState } from './state/game-state.ts';
import { type Difficulty, difficultyTable } from './data/difficulty.ts';
import { BrewButton, PlayButton, renderActionButtons } from './ui/action-buttons.ts';
import { ingredients } from './data/ingredients.ts';
import { brew, canBrew, startGame } from './logic/game.ts';
import { CurrentStats } from './ui/stats.ts';
import { Help } from './ui/help.ts';
import { Settings } from './ui/settings.ts';

export function init(app: HTMLDivElement) {
  const difficulty = initState.difficulty ?? 'medium';
  const { ingredientsOnShelf } = difficultyTable[difficulty];
  const livesContainer = Lives();
  const recipeContainer = Recipe();
  const cabinet = Cabinet({ slots: ingredientsOnShelf });

  const header = document.createElement('header');
  header.classList.add('header');
  header.append(Score(), Timer(), livesContainer);

  const cauldronWithStats = document.createElement('div');
  cauldronWithStats.classList.add('cauldron-with-stats');
  cauldronWithStats.append(Cauldron(), CurrentStats());

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  gameContainer.append(cauldronWithStats, recipeContainer);

  const main = document.createElement('main');
  main.classList.add('main');
  main.append(cabinet, gameContainer);

  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const view: GameView = {
    livesContainer,
    recipeContainer,
    cabinet,
    playButton: PlayButton(() => onPlay({ view, difficulty })),
    brewButton: BrewButton(() => onBrew({ view, difficulty })),
  };

  renderGame({ view, difficulty });

  footer.append(Help(), view.playButton, view.brewButton, Settings());
  app.append(header, main, footer);
}

function renderGame(params: { view: GameView; difficulty: Difficulty }) {
  const { view, difficulty } = params;
  const { livesContainer, recipeContainer, playButton, brewButton } = view;
  const { maxIngredientsInCauldron } = difficultyTable[difficulty];

  renderLives({ container: livesContainer, lives: initState.lives });

  if (initState.activeRecipe) {
    renderRecipe({
      container: recipeContainer,
      recipe: initState.activeRecipe,
      maxIngredients: maxIngredientsInCauldron,
    });
  }

  renderActionButtons({
    playButton,
    brewButton,
    status: initState.status,
    canBrew: canBrew(initState),
  });
}

function onPlay(params: { view: GameView; difficulty: Difficulty }) {
  const { view, difficulty } = params;

  startGame({ state: initState, difficulty });

  fillCabinet({
    cabinet: view.cabinet,
    ingredients,
    stock: initState.shelfStock,
    onSelect: () => {},
  });

  renderGame({ view, difficulty });
}

function onBrew(params: { view: GameView; difficulty: Difficulty }) {
  const { view, difficulty } = params;

  brew({ state: initState, difficulty });
  renderGame({ view, difficulty });
}

interface GameView {
  livesContainer: HTMLElement;
  recipeContainer: HTMLElement;
  cabinet: HTMLElement;
  playButton: HTMLButtonElement;
  brewButton: HTMLButtonElement;
}
