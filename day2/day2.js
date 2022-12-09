// Include fs module
const { lookupService } = require('dns');
const fs = require('fs');
const os = require('os');

const processInput = () => {
    return fs.readFileSync(__dirname + '/input.txt', 'utf8').split(os.EOL);
};

// Rock (A) (X) 1
// Paper (B) (Y) 2
// Scissors (C) (Z) 3

// W 6 / L 1 / D 3
const determineGameResultPart1 = (p1, p2) => {
    let result = 0;
    switch (p1) {
        case 'A': // Rock
            // vs Rock, Draw | vs Paper, Win | vs Scissors, Lose
            result =
                p2 == 'X' ? 1 + 3 : p2 == 'Y' ? 2 + 6 : p2 == 'Z' ? 3 + 0 : 0;
            break;
        case 'B': // Paper
            // vs Rock, Lose | vs Paper, Draw | vs Scissors, Win
            result =
                p2 == 'X' ? 1 + 0 : p2 == 'Y' ? 2 + 3 : p2 == 'Z' ? 3 + 6 : 0;
            break;
        case 'C': // Scissors
            // vs Rock, Lose | vs Paper, Win | vs Scissors, Draw
            result =
                p2 == 'X' ? 1 + 6 : p2 == 'Y' ? 2 + 0 : p2 == 'Z' ? 3 + 3 : 0;
            break;
    }
    return result;
};

// X = Lose
// Y = Draw
// Z = Win
// Rock (A) (X) 1
// Paper (B) (Y) 2
// Scissors (C) (Z) 3
const determineGameResultPart2 = (p1, p2) => {
    let result = 0;
    switch (p1) {
        case 'A': // Rock
            // Lose, Scissors | Draw, Rock | Win, Paper
            result =
                p2 == 'X' ? 0 + 3 : p2 == 'Y' ? 3 + 1 : p2 == 'Z' ? 6 + 2 : 0;
            break;
        case 'B': // Paper
            // Lose, Rock | Draw, Paper | Win, Scissors
            result =
                p2 == 'X' ? 0 + 1 : p2 == 'Y' ? 3 + 2 : p2 == 'Z' ? 6 + 3 : 0;
            break;
        case 'C': // Scissors
            // Lose, Paper | Draw, Scissors | Win, Rock
            result =
                p2 == 'X' ? 0 + 2 : p2 == 'Y' ? 3 + 3 : p2 == 'Z' ? 6 + 1 : 0;
            break;
    }
    return result;
};

const main = (determineGameResults) => {
    const strategyGuide = processInput();
    let results = [];
    for (let i = 0; i < strategyGuide.length; i++) {
        let result = determineGameResults(...strategyGuide[i].split(' '));
        results.push(result);
    }
    let totalScore = results.reduce((a, b) => a + b);

    console.log('Total score: ' + totalScore);
};
// Part 1
main(determineGameResultPart1);
// Part 2
main(determineGameResultPart2);
