import { type GameStatus } from '../state/game-state.ts';

export function ActionButton(params: { status: GameStatus; onClick: () => void }) {
  const { status, onClick } = params;

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'primary', 'action-button');
  button.addEventListener('click', onClick);

  renderActionButton({ button, status });

  return button;
}

export function renderActionButton(params: { button: HTMLButtonElement; status: GameStatus }) {
  const { button, status } = params;

  button.textContent = status === 'menu' ? 'Play' : 'Brew';
  button.disabled = status === 'paused' || status === 'game-over';
}
