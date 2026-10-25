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

export function renderActionButtons(params: RenderActionButtonsParams) {
  const { playButton, brewButton, status, canBrew } = params;
  const isGameActive = status === 'playing' || status === 'paused';

  playButton.hidden = isGameActive;
  brewButton.hidden = !isGameActive;
  brewButton.disabled = !canBrew;
}

interface RenderActionButtonsParams {
  playButton: HTMLButtonElement;
  brewButton: HTMLButtonElement;
  status: GameStatus;
  canBrew: boolean;
}
