import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { applyTheme, getStoredThemeMode, getStoredBrightness } from './utils/theme';

// Synchronously apply theme mode and brightness on initial mount before first render
applyTheme(getStoredThemeMode(), getStoredBrightness());

createRoot(document.getElementById('root')!).render(<App />);

