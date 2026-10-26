import { type GameStatus } from '../state/game-state.ts';

function ActionButton(params: { text: string; onClick: () => void }) {
  const { text, onClick } = params;

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'primary', 'action-button');
  button.textContent = text;
  button.addEventListener('click', onClick);

  return button;
}

export function PlayButton(onClick: () => void) {
  return ActionButton({ text: 'Play', onClick });
}

export function BrewButton(onClick: () => void) {
  return ActionButton({ text: 'Brew', onClick });
}

export function PauseButton(onClick: () => void) {
  const icon = document.createElement('img');
  icon.classList.add('icon', 'icon-button-image');
  icon.src = '/assets/icons/pause.svg';
  icon.alt = 'Pause';

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'icon-button', 'pause-button');
  button.ariaLabel = 'Pause';
  button.append(icon);
  button.addEventListener('click', onClick);

  return button;
}

export function renderActionButtons(params: RenderActionButtonsParams) {
  const { playButton, brewButton, pauseButton, status, canBrew } = params;
  const isGameActive = status === 'playing' || status === 'paused';

  playButton.hidden = isGameActive;
  brewButton.hidden = !isGameActive;
  pauseButton.hidden = !isGameActive;
  brewButton.disabled = !canBrew;
}

interface RenderActionButtonsParams {
  playButton: HTMLButtonElement;
  brewButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  status: GameStatus;
  canBrew: boolean;
}
