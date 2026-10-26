import { type CauldronStats } from '../logic/calculate-cauldron.ts';

function Stat(params: { key: keyof CauldronStats; name: string; icon: string }) {
  const { key, name, icon } = params;

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
  stat.dataset.stat = key;
  stat.append(iconElement, label, value);

  return stat;
}

export function CurrentStats() {
  const temperature = Stat({
    key: 'temperature',
    name: 'Temperature',
    icon: '/assets/icons/temperature.svg',
  });
  const density = Stat({ key: 'density', name: 'Density', icon: '/assets/icons/density.svg' });
  const magicPower = Stat({
    key: 'magicPower',
    name: 'Magic Power',
    icon: '/assets/icons/magic-power.svg',
  });

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

export function renderCurrentStats(params: { container: HTMLElement; stats: CauldronStats }) {
  const { container, stats } = params;

  container.querySelectorAll<HTMLElement>('.current-stat').forEach((stat) => {
    const { stat: key } = stat.dataset;
    if (key === 'temperature' || key === 'density' || key === 'magicPower') {
      renderStat({ container: stat, value: stats[key] });
    }
  });
}
