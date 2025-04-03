import { BettingSequence } from './BettingSequence.js';

export class BettingCalculator {
    constructor(startAmount, mode) {
        this.startAmount = startAmount;
        this.mode = mode;
        this.maxLosses = this.getMaxLossesByMode(mode);
        this.minBet = 100;
        this.maxBet = 1000;
        this.betStep = 50;
    }

    getMaxLossesByMode(mode) {
        const modes = {
            'risky': 6,
            'safe': 7,
            'ultrasafe': 8,
            'megasafe': 9
        };
        return modes[mode] || 7; // alapértelmezett: safe mód
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