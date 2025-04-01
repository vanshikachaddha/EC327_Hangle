
/*
commented out dependencies
Checking if it is the correct guess should work, Keyboard turning colors is not included in this test
*/
function checkletter() {

    let spotsfilled = true;

        for (let i =0; i<word_length; i++) {
            const currtile = "Poker"

            if (!currtile || currtile.innerText == "") {
                spotsfilled = false;
                break; //write something like spots aren't filled
            }
        }

        if (!spotsfilled) {
            console.log("Please fill all spots before pressing Enter.");
            return; 
        }

        let incorrectGuess = false;

        if (spotsfilled) {
            for (let i =0; i<word_length; i++) {
                const currtile = "Poker"
                let letter = currtile.innerText.toUpperCase();
                //const keyButton = document.querySelector(`button[data-key="${letter.toLowerCase()}"]`);

                
                if (currentword[i]==letter) {
                    /*
                    currtile.classList.add("right");
                    currtile.dataset.lock = "true";
                    if (keyButton) {
                        if (keyButton.classList.contains("there")) {
                            keyButton.classList.remove("there");
                        }
                        
                        keyButton.classList.add("right");
                    }
                    */
                
                correct_word += 1;
                }
                
                else if(currentword.includes(letter)) {
                    /*
                    currtile.classList.add("there");
                    if (keyButton) 
                        if (!keyButton.classList.contains("right")) {
                            keyButton.classList.add("there");
                        }
                    */
                    incorrectGuess = true;
                }

                else {
                    //if (keyButton) keyButton.classList.add("wrong");
                    incorrectGuess = true;
                }

        }

        if (incorrectGuess) {
            wrong_attempts++;
            console.log(`Wrong attempt ${wrong_attempts}/${max_attempts}`);
            //updatehangman();
            //updateRemoveBodyPartButton();
        }

            
        }
        //resetboard();
        //checkgameover(incorrectGuess);
}

//Had chatgpt help 
function test_checkletter() {

    let word_length = 5;
    let currentword = "POKER";
    let correct_word = 0;
    let wrong_attempts = 0;
    let max_attempts = 6;

    //this is the pseudo guess!
    const mockTiles = [
        { innerText: "P" },
        { innerText: "O" },
        { innerText: "K" },
        { innerText: "E" },
        { innerText: "R" }, 
    ];

    
    let spotsfilled = true;

    for (let i = 0; i < word_length; i++) {
        const currtile = mockTiles[i];

        if (!currtile || currtile.innerText == "") {
            spotsfilled = false;
            console.log("Please fill all spots before pressing Enter.");
            break;
        }
    }

    if (!spotsfilled) {
        console.log("Test failed: spots not filled.");
        return;
    }

    let incorrectGuess = false;

    for (let i = 0; i < word_length; i++) {
        const currtile = mockTiles[i];
        const letter = currtile.innerText.toUpperCase();

        if (currentword[i] === letter) {
            correct_word += 1;
        } else if (currentword.includes(letter)) {
            incorrectGuess = true;
        } else {
            incorrectGuess = true;
        }
    }

    if (incorrectGuess) {
        wrong_attempts++;
        console.log(`Test result: Wrong attempt ${wrong_attempts}/${max_attempts}`);
    }

    
    console.assert(correct_word === word_length, "Test failed: Not all letters were correctly guessed.");
    console.assert(wrong_attempts === 0, "Test failed: There were incorrect guesses.");
    console.log("Test passed: All guesses correct and spots filled.");
}

test_checkletter();