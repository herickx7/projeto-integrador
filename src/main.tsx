import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const signature = `
 _   _  _____  
| | | ||  __ \\ 
| |_| || |__) |
|  _  ||  ___/ 
| | | || |     
\\_| |_/\\_|     

Developed by Herick & Pedro
`;

console.log('%c' + signature, 'color: #3b82f6; font-weight: bold; font-family: monospace;');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
