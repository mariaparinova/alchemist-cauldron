export function Help() {
  const icon = document.createElement('img');
  icon.classList.add('icon', 'icon-button-image');
  icon.src = '/assets/icons/help.svg';
  icon.alt = 'Help';

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'icon-button', 'help-button');
  button.ariaLabel = 'Help';
  button.append(icon);

  return button;
}
