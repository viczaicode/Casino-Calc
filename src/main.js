import { BettingUI } from './ui/BettingUI.js';
import { AuthUI } from './ui/AuthUI.js';

// Az alkalmazás konténer elrejtése
const container = document.querySelector('.container');
container.style.display = 'none';

// Az alkalmazás csak sikeres autentikáció után indul
new AuthUI(() => {
    container.style.display = 'block';
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.opacity = '1';
        new BettingUI();
    }, 100);
}); 