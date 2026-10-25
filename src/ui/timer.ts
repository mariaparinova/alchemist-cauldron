export function Timer() {
  const icon = document.createElement('img');
  icon.classList.add('icon', 'timer-icon');
  icon.src = '/assets/icons/clock.svg';
  icon.alt = 'Timer Icon';

  const timer = document.createElement('div');
  timer.classList.add('timer');

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('header-item', 'timer-container');
  timerContainer.append(icon, timer);

  return timerContainer;
}
