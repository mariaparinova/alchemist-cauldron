import { Score, renderScore } from './ui/score.ts';
import { Timer, renderTimer } from './ui/timer.ts';
import { Lives, renderLives } from './ui/lives.ts';
import { Cabinet, fillCabinet, renderCabinet } from './ui/shelf.ts';
import { Cauldron } from './ui/cauldron.ts';
import { Recipe, renderRecipe, renderRecipeIngredients } from './ui/recipe.ts';
import { initState } from './state/game-state.ts';
import { type Difficulty, difficultyTable } from './data/difficulty.ts';
import { BrewButton, PlayButton, renderActionButtons } from './ui/action-buttons.ts';
import { ingredients } from './data/ingredients.ts';
import { brew, canBrew, startGame } from './logic/game.ts';
import { CurrentStats, renderCurrentStats } from './ui/stats.ts';
import { addIngredient, isCauldronFull } from './logic/stock.ts';
import { calculateCauldron } from './logic/calculate-cauldron.ts';
import { isLowTime, updateTimeLeft } from './logic/timer.ts';
import { Help } from './ui/help.ts';
import { Settings } from './ui/settings.ts';

const TIMER_UPDATE_INTERVAL = 250;
let timerId: number | undefined;

export function init(app: HTMLDivElement) {
  const difficulty = initState.difficulty ?? 'medium';
  const { ingredientsOnShelf } = difficultyTable[difficulty];
  const scoreContainer = Score();
  const timerContainer = Timer();
  const livesContainer = Lives();
  const recipeContainer = Recipe();
  const cabinet = Cabinet({ slots: ingredientsOnShelf });
  const statsContainer = CurrentStats();

  const header = document.createElement('header');
  header.classList.add('header');
  header.append(scoreContainer, timerContainer, livesContainer);

  const cauldronWithStats = document.createElement('div');
  cauldronWithStats.classList.add('cauldron-with-stats');
  cauldronWithStats.append(Cauldron(), statsContainer);

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  gameContainer.append(cauldronWithStats, recipeContainer);

  const main = document.createElement('main');
  main.classList.add('main');
  main.append(cabinet, gameContainer);

  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const view: GameView = {
    scoreContainer,
    timerContainer,
    livesContainer,
    recipeContainer,
    statsContainer,
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
  const { maxIngredientsInCauldron } = difficultyTable[difficulty];
  const {
    scoreContainer,
    timerContainer,
    livesContainer,
    recipeContainer,
    statsContainer,
    cabinet,
    playButton,
    brewButton,
  } = view;

  renderScore({ container: scoreContainer, score: initState.score });
  renderTimerView({ container: timerContainer, difficulty });
  renderLives({ container: livesContainer, lives: initState.lives });

  if (initState.activeRecipe) {
    renderRecipe({
      container: recipeContainer,
      recipe: initState.activeRecipe,
      maxIngredients: maxIngredientsInCauldron,
    });

    renderRecipeIngredients({
      container: recipeContainer,
      used: initState.cauldronIngredients.length,
      max: maxIngredientsInCauldron,
    });
  }

  renderCurrentStats({
    container: statsContainer,
    stats: calculateCauldron(initState.cauldronIngredients),
  });

  renderCabinet({
    cabinet,
    stock: initState.shelfStock,
    isLocked:
      initState.status !== 'playing' ||
      isCauldronFull({ state: initState, maxIngredients: maxIngredientsInCauldron }),
  });

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
    onSelect: (ingredientId) => onSelectIngredient({ view, difficulty, ingredientId }),
  });

  renderGame({ view, difficulty });
  runTimer({ view, difficulty });
}

function onBrew(params: { view: GameView; difficulty: Difficulty }) {
  const { view, difficulty } = params;

  brew({ state: initState, difficulty });
  renderGame({ view, difficulty });
}

function runTimer(params: { view: GameView; difficulty: Difficulty }) {
  const { view, difficulty } = params;

  clearInterval(timerId);

  timerId = setInterval(() => {
    updateTimeLeft(initState);

    if (initState.status !== 'playing') {
      clearInterval(timerId);
      renderGame({ view, difficulty });
      return;
    }

    renderTimerView({ container: view.timerContainer, difficulty });
  }, TIMER_UPDATE_INTERVAL);
}

function renderTimerView(params: { container: HTMLElement; difficulty: Difficulty }) {
  const { container, difficulty } = params;
  const { startingTime } = difficultyTable[difficulty];

  renderTimer({
    container,
    timeLeft: initState.timeLeft,
    maxTime: startingTime,
    isWarning: isLowTime(initState),
  });
}

function onSelectIngredient(params: OnSelectIngredientParams) {
  const { view, difficulty, ingredientId } = params;
  const { maxIngredientsInCauldron } = difficultyTable[difficulty];

  const isAdded = addIngredient({
    state: initState,
    ingredientId,
    maxIngredients: maxIngredientsInCauldron,
  });

  if (isAdded) {
    renderGame({ view, difficulty });
  }
}

interface GameView {
  scoreContainer: HTMLElement;
  timerContainer: HTMLElement;
  livesContainer: HTMLElement;
  recipeContainer: HTMLElement;
  statsContainer: HTMLElement;
  cabinet: HTMLElement;
  playButton: HTMLButtonElement;
  brewButton: HTMLButtonElement;
}

interface OnSelectIngredientParams {
  view: GameView;
  difficulty: Difficulty;
  ingredientId: string;
}
