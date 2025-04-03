// Egy sorozat kezelése (tét és a hozzá tartozó duplázások)
class BettingSequence {
    constructor(initialBet, maxLosses) {
        this.initialBet = initialBet;
        this.maxLosses = maxLosses;
        this.sequence = this.calculateSequence();
    }

    calculateSequence() {
        let sequence = [this.initialBet];
        let previousBet = this.initialBet;
        
        for (let i = 1; i < this.maxLosses; i++) {
            let nextBet = previousBet * 2;
            sequence.push(nextBet);
            previousBet = nextBet;
        }
        
        return sequence;
    }

    getTotalNeeded() {
        return this.sequence.reduce((a, b) => a + b, 0);
    }

    getSequenceDetails() {
        return this.sequence.map((bet, index) => ({
            amount: bet,
            description: index === 0 ? 'kezdőtét' : `${index + 1}. vesztés után`
        }));
    }
}

// A kalkulátor fő logikája
class BettingCalculator {
    constructor(startAmount, mode) {
        this.startAmount = startAmount;
        this.mode = mode;
        this.maxLosses = mode === 'safe' ? 7 : 6;
        this.minBet = 100;
        this.maxBet = 1000;
        this.betStep = 50;
    }

    generatePossibleBets() {
        const bets = [];
        for (let bet = this.minBet; bet <= this.maxBet; bet += this.betStep) {
            bets.push(bet);
        }
        return bets;
    }

    findOptimalBet() {
        const possibleBets = this.generatePossibleBets();
        
        // Visszafelé megyünk a legnagyobb megfelelő tétért
        for (let i = possibleBets.length - 1; i >= 0; i--) {
            const sequence = new BettingSequence(possibleBets[i], this.maxLosses);
            if (sequence.getTotalNeeded() <= this.startAmount) {
                return sequence;
            }
        }
        
        return null;
    }
}

// UI kezelő osztály
class BettingUI {
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
        this.resultDiv.style.display = 'block';
        
        if (sequence) {
            const details = sequence.getSequenceDetails();
            let html = `<h3>Kalkuláció eredménye:</h3>`;
            html += `<p>Javasolt kezdőtét: ${sequence.initialBet} Ft</p>`;
            html += `<p>Tétek sorozata vesztés esetén:</p>`;
            html += `<ol>`;
            
            details.forEach(bet => {
                html += `<li>${bet.amount} Ft (${bet.description})</li>`;
            });
            
            html += `</ol>`;
            html += `<p>Maximális szükséges összeg: ${sequence.getTotalNeeded()} Ft</p>`;
            html += `<p>Egy nyerés esetén: +${sequence.initialBet} Ft (${startAmount + sequence.initialBet} Ft)</p>`;
            
            this.resultDiv.innerHTML = html;
        } else {
            this.resultDiv.innerHTML = `<p style="color: red;">Nem található megfelelő tét a megadott feltételekkel. 
                Próbáld meg nagyobb kezdőösszeggel!</p>`;
        }
    }
}

// Az alkalmazás indítása
new BettingUI(); 