// Include fs module
const fs = require('fs');
const os = require('os');

const processInput = () => {
    return fs
        .readFileSync(__dirname + '/input.txt', 'utf8')
        .split(os.EOL + os.EOL)
        .map((e) => e.split('\n'));
};

const main = () => {
    const elfSnacks = processInput();

    let biggestSnack = 0;
    let allSnacks = [];
    for (let i = 0; i < elfSnacks.length; i++) {
        let snackSize = elfSnacks[i].reduce(
            (a, b) => parseInt(a) + parseInt(b)
        );
        if (snackSize > biggestSnack) {
            biggestSnack = snackSize;
        }
        allSnacks.push(snackSize);
    }
    let topThreeSnacks = allSnacks
        .sort()
        .slice(allSnacks.length - 3, allSnacks.length);
    console.log('Elf with biggest snack: ' + biggestSnack);
    console.log('Top three biggest snacks: ' + topThreeSnacks);
    console.log(
        'Top three biggest snacks added: ' +
            topThreeSnacks.reduce((a, b) => parseInt(a) + parseInt(b))
    );
};

main();
