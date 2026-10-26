import { formatTime } from '../utils/time.ts';

export function Timer() {
  const icon = document.createElement('img');
  icon.classList.add('icon', 'timer-icon');
  icon.src = '/assets/icons/clock.svg';
  icon.alt = 'Timer Icon';

  const timer = document.createElement('div');
  timer.classList.add('timer');

  const barFill = document.createElement('div');
  barFill.classList.add('timer-bar-fill');

  const bar = document.createElement('div');
  bar.classList.add('timer-bar');
  bar.append(barFill);

  const timerInfo = document.createElement('div');
  timerInfo.classList.add('timer-info');
  timerInfo.append(timer, bar);

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer-container');
  timerContainer.append(icon, timerInfo);

  return timerContainer;
}

export function renderTimer(params: RenderTimerParams) {
  const { container, timeLeft, maxTime, isWarning } = params;

  container.classList.toggle('timer-warning', isWarning);

  const timer = container.querySelector<HTMLElement>('.timer');
  if (timer) {
    timer.textContent = formatTime(timeLeft);
  }

  const barFill = container.querySelector<HTMLElement>('.timer-bar-fill');
  if (barFill) {
    barFill.style.width = `${maxTime ? (timeLeft / maxTime) * 100 : 0}%`;
  }
}

interface RenderTimerParams {
  container: HTMLElement;
  timeLeft: number;
  maxTime: number;
  isWarning: boolean;
}
