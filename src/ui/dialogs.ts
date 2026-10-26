export function PauseDialog(params: { onResume: () => void; onExit: () => void }) {
  const { onResume, onExit } = params;

  const title = document.createElement('span');
  title.classList.add('dialog-title');
  title.textContent = 'Game Paused';

  const resumeButton = DialogButton({ text: 'Resume', onClick: onResume });
  const exitButton = DialogButton({ text: 'Exit', onClick: onExit });

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('dialog-actions');
  buttonsContainer.append(resumeButton, exitButton);

  const dialog = document.createElement('dialog');
  dialog.classList.add('dialog');
  dialog.append(title, buttonsContainer);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    onResume();
  });

  return dialog;
}

function DialogButton(params: { text: string; onClick: () => void }) {
  const { text, onClick } = params;

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'primary', 'dialog-button');
  button.textContent = text;
  button.addEventListener('click', onClick);

  return button;
}
