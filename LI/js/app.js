import { Portfolio } from './portfolio.js';
import { UI } from './ui.js';
import { API } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const api = new API();
    const portfolio = new Portfolio();
    const ui = new UI(portfolio, api);
    
    await ui.init();
});