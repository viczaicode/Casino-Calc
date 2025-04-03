import { BettingCalculator } from '../models/BettingCalculator.js';

export class BettingUI {
    constructor() {
        this.form = document.getElementById('calculatorForm');
        this.resultDiv = document.getElementById('result');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const startAmount = parseInt(document.getElementById('startAmount').value);
        const mode = document.getElementById('mode').value;
        
        const calculator = new BettingCalculator(startAmount, mode);
        const optimalSequence = calculator.findOptimalBet();
        
        this.displayResults(optimalSequence, startAmount);
    }

    displayResults(sequence, startAmount) {
        this.resultDiv.style.opacity = '0';
        this.resultDiv.style.display = 'block';
        
        if (sequence) {
            const details = sequence.getSequenceDetails();
            let html = `<div class="results-container">`;
            html += `<h3>Kalkuláció eredménye</h3>`;
            html += `<div class="summary-box">`;
            html += `<div class="summary-item">`;
            html += `<span class="label">Javasolt kezdőtét:</span>`;
            html += `<span class="value">${sequence.initialBet} Ft</span>`;
            html += `</div>`;
            html += `<div class="summary-item">`;
            html += `<span class="label">Szükséges összeg:</span>`;
            html += `<span class="value">${sequence.getTotalNeeded()} Ft</span>`;
            html += `</div>`;
            html += `<div class="summary-item">`;
            html += `<span class="label">Nyereség:</span>`;
            html += `<span class="value">+${sequence.initialBet} Ft</span>`;
            html += `</div>`;
            html += `</div>`;
            
            html += `<table class="betting-table">`;
            html += `<thead>`;
            html += `<tr>`;
            html += `<th>Lépés</th>`;
            html += `<th>Tét összege</th>`;
            html += `<th>Megjegyzés</th>`;
            html += `</tr>`;
            html += `</thead>`;
            html += `<tbody>`;
            
            details.forEach(bet => {
                html += `<tr>`;
                html += `<td>${bet.description === 'kezdőtét' ? '1' : bet.description.split('.')[0]}</td>`;
                html += `<td>${bet.amount} Ft</td>`;
                html += `<td>${bet.description}</td>`;
                html += `</tr>`;
            });
            
            html += `</tbody>`;
            html += `</table>`;
            html += `</div>`;
            
            this.resultDiv.innerHTML = html;
        } else {
            this.resultDiv.innerHTML = `<p class="error-message">Nem található megfelelő tét a megadott feltételekkel. 
                Próbáld meg nagyobb kezdőösszeggel!</p>`;
        }

        setTimeout(() => {
            this.resultDiv.style.opacity = '1';
        }, 100);
    }
} 