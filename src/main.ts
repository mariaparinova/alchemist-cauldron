import './styles/style.scss';
import { init } from './app.ts';

const app = document.querySelector<HTMLDivElement>('#app')!;

init(app);
