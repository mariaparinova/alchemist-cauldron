export function Score() {
  const icon = document.createElement('img');
  icon.classList.add('icon', 'score-icon');
  icon.src = '/assets/icons/score.svg';
  icon.alt = 'Score Icon';

  const score = document.createElement('div');
  score.classList.add('score');

  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('header-item', 'score-container');
  scoreContainer.append(icon, score);

  return scoreContainer;
}
