import { type GameState } from '../state/game-state.ts';

const MS_IN_SECOND = 1000;
const LOW_TIME_WARNING = 15;

export function startTimer(state: GameState) {
  state.endTime = Date.now() + state.timeLeft * MS_IN_SECOND;
}

export function updateTimeLeft(state: GameState) {
  if (state.status !== 'playing' || state.endTime === null) {
    return;
  }

  state.timeLeft = Math.max(0, Math.ceil((state.endTime - Date.now()) / MS_IN_SECOND));

  if (state.timeLeft === 0) {
    state.status = 'game-over';
  }
}

export function addTimeBonus(params: { state: GameState; bonus: number; maxTime: number }) {
  const { state, bonus, maxTime } = params;

  if (state.endTime === null) {
    return;
  }

  const now = Date.now();
  const remainingMs = Math.max(0, state.endTime - now);
  const nextRemainingMs = Math.min(remainingMs + bonus * MS_IN_SECOND, maxTime * MS_IN_SECOND);

  state.endTime = now + nextRemainingMs;
  state.timeLeft = Math.ceil(nextRemainingMs / MS_IN_SECOND);
}

export function isLowTime(state: GameState) {
  return state.status === 'playing' && state.timeLeft < LOW_TIME_WARNING;
}
