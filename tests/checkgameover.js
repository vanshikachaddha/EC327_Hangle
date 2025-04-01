let gameover = false;
//Changed the return statements to reflect what the client side game would actually do (allow or prevent user from continuing)
function checkgameover(incorrectGuess) {

    if (!incorrectGuess) {
        gameover = true;
        //console.log("good!")
        //CLIENT SIDE DISPLAY BELOW
        /*
        displayMessage("You Win!", true, true)
        animateTiles();
        confetti({
        particleCount: 150,    // Number of confetti pieces
        spread: 70,            // Spread angle of confetti
        origin: { y: 0.6 },    // Confetti drop point
        colors: ['#bb0000', '#ffffff', '#00bb00'] // Custom colors
        });
        playSound('sounds/win.wav');
        */
        return true;
    }
 
    if (wrong_attempts >= max_attempts) {
        gameover = true;
        //console.log("bad");
        //CLIENT SIDE DISPLAY BELOW
        /*
        displayMessage(`Game Over! The word was: ${currentword}`);
        playSound('sounds/lose.wav');
        */
        return false;
    }
    return null;
}
let max_attempts = 5;
let wrong_attempts = 4;

let GoodGame = checkgameover(false);
if (GoodGame === true) {
    console.log("Test Passed: Player wins!");
} else {
    console.log("Test Failed: Winning condition not met.");
}
wrong_attempts = 5; 
GoodGame = checkgameover(true);
if (GoodGame === false) {
    console.log("Test Passed: Player loses!");
} else {
    console.log("Test Failed: Losing condition not met.");
}

wrong_attempts = 3;
GoodGame = checkgameover(true);
if (GoodGame === null) {
    console.log("Test Passed: Game continues.");
} else {
    console.log("Test Failed: Premature gameover");
}
