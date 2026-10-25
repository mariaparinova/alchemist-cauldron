export function Lives() {
  const livesContainer = document.createElement('div');
  livesContainer.classList.add('header-item', 'lives-container');

  return livesContainer;
}

export function renderLives(params: { container: HTMLElement; lives: number }) {
  const { container, lives } = params;
  const hearts = new Array(lives).fill(null).map(() => {
    const heart = document.createElement('img');
    heart.classList.add('icon', 'heart-icon');
    heart.src = '/assets/icons/health.svg';
    heart.alt = 'Life';

    return heart;
  });

  container.replaceChildren(...hearts);
}
