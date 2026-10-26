export function Settings() {
  const icon = document.createElement('img');
  icon.classList.add('icon', 'icon-button-image');
  icon.src = '/assets/icons/settings.svg';
  icon.alt = 'Settings';

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'icon-button', 'settings-button');
  button.ariaLabel = 'Settings';
  button.append(icon);

  return button;
}
