import { BettingSequence } from './BettingSequence.js';

export class BettingCalculator {
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