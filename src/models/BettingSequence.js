export class BettingSequence {
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