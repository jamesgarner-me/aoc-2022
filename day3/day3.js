// Include fs module
const fs = require('fs');
const os = require('os');

const processInput = () => {
    return fs.readFileSync(__dirname + '/input.txt', 'utf8').split(os.EOL);
};

const findCommonItem = (str1, str2, str3) => {
    let commonCharacter = '';
    for (let i = 0; i < str1.length; i++) {
        // Part 1
        if (str3 == null && str2.indexOf(str1[i]) >= 0) {
            commonCharacter = str1[i];
            break;
        }
        //Part 2
        else {
            if (str2.indexOf(str1[i]) >= 0 && str3.indexOf(str1[i]) >= 0) {
                commonCharacter = str1[i];
                break;
            }
        }
    }
    return commonCharacter;
};

const assignPriority = (letter) => {
    let alphabet = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.indexOf(letter);
};

const main = () => {
    let data = processInput();
    let priorities = [];
    let badgePriorities = [];
    for (let i = 0; i < data.length; i++) {
        let str1 = data[i].slice(0, data[i].length / 2);
        let str2 = data[i].slice(data[i].length / 2, data[i].length);
        if ((i + 1) % 3 == 0 && i != 0) {
            badgePriorities.push(
                assignPriority(
                    findCommonItem(data[i - 2], data[i - 1], data[i])
                )
            );
        }

        priorities.push(assignPriority(findCommonItem(str1, str2)));
    }
    console.log('Sum of priorities: ' + priorities.reduce((a, b) => a + b));
    console.log(
        'Sum of badgePriorities: ' + badgePriorities.reduce((a, b) => a + b)
    );
};

main();
