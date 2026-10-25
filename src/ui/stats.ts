function Stat(params: { name: string; icon: string }) {
  const { name, icon } = params;

  const iconElement = document.createElement('img');
  iconElement.classList.add('icon', 'stat-icon');
  iconElement.src = icon;
  iconElement.alt = name;

  const label = document.createElement('span');
  label.classList.add('stat-label');
  label.textContent = name;

  const value = document.createElement('span');
  value.classList.add('stat-value');
  value.textContent = '0';

  const stat = document.createElement('div');
  stat.classList.add('current-stat');
  stat.append(iconElement, label, value);

  return stat;
}

export function CurrentStats() {
  const temperature = Stat({ name: 'Temperature', icon: '/assets/icons/temperature.svg' });
  const density = Stat({ name: 'Density', icon: '/assets/icons/density.svg' });
  const magicPower = Stat({ name: 'Magic Power', icon: '/assets/icons/magic-power.svg' });

  const currentStats = document.createElement('div');
  currentStats.classList.add('current-stats-container');
  currentStats.append(temperature, density, magicPower);

  return currentStats;
}

export function renderStat(params: { container: HTMLElement; value: number }) {
  const { container, value } = params;

  const valueElement = container.querySelector<HTMLElement>('.stat-value');
  if (valueElement) {
    valueElement.textContent = `${value}`;
  }
}
