const testUnfinishedWord = "Y_U_H";
const finishedWord = "YOUTH";
word_length = 5;

/*
Changed the functionality of the function to work as a unit test
Functions the same as its original code with input from client instead
*/
function getRandomUnrevealedLetter() {
    const unrevealedIndices = [];
   
    for (let i = 0; i < word_length; i++) {
        const currTile = testUnfinishedWord[i];
        if (currTile === "_" ) {
            unrevealedIndices.push(i);
        }
    }

    if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrevealedIndices.length);
        const indexToReveal = unrevealedIndices[randomIndex];
        return finishedWord[indexToReveal];
    }
    return null; 
}

const revealedLetter = getRandomUnrevealedLetter();
if (revealedLetter == 'T'){
    console.log("Test Passed: Function works as intended. Letter T");
}
else if (revealedLetter == 'O'){
    console.log("Test Passed: Function works as intended. Letter: O");
}
else{
    console.log("Test Failed: Function does not work as intended");
}