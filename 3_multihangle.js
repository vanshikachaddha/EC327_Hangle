/**
 * Processes the user input for the game, validating the word entered by the user.
 * <p>
 * This function retrieves the value entered by the user in the input field with ID 
 * <code>userInput</code> and performs several checks:
 * </p>
 * <ul>
 *     <li><u>Empty Input:</u> If no input is provided, it shows a message prompting the user to enter a valid word.</li>
 *     <li><u>Invalid Characters:</u> If the input contains numbers or special characters, it prompts the user to enter a word consisting only of letters.</li>
 *     <li><u>Word Length:</u> If the input length exceeds 8 characters, it shows a message restricting the word length to 8 letters.</li>
 * </ul>
 * <p>
 * If the input passes all checks, the function:
 * </p>
 * <ul>
 *     <li>Sets the <code>currentword</code> to the uppercased version of the input.</li>
 *     <li>Sets the <code>word_length</code> dynamically based on the length of the input.</li>
 *     <li>Hides the popup element by setting its <code>display</code> style to "none".</li>
 *     <li>Initializes the game by calling the <code>initialize()</code> function.</li>
 * </ul>
 *
 * @example:
 * returnText(); // Processes the user input and updates the game state.
 *
 * @return void - This function does not return any value.
 * @see initialize
 * @see currentword
 * @see word_length
 * @since 2024-12-09
 */
function returnText() {
    const input = document.getElementById("userInput").value.trim();
    const message_category = document.querySelector("p");
    const letters = /^[A-Za-z]+$/;

    if (input === "" || input == null) {
        const message_category = document.querySelector("p");
        message_category.innerHTML = "Make it hard to the other person can't guess it (max 8 letters)";
        return;
    }

    else if (!letters.test(input)) {
        const message_category = document.querySelector("p");
        message_category.innerHTML = "Really, numbers? Put in a word.";
        return;
    }

    else if (input.length > 8) {
        const message_category = document.querySelector("p");
        message_category.innerHTML = "Can't be more than 8 letters.";
        return;
    }
    
    currentword = input.toUpperCase();
    word_length = currentword.length; // Set word length dynamically
    //console.log("Word Set:", currentword);

    // Hide the popup
    const popup = document.querySelector(".popup");
    popup.style.display = "none";

    // Initialize the game
    initialize();
}

const keyboard_container = document.querySelector("#keyboard_container");
let currentword;
let max_attempts = 6; 
var gameover = false;
let wrong_attempts = 0; 
let word_length;
var spot = 0;
let currentIndex = 1; 
let correct_word = 0;

/**
* <p>
* Assigns the <u>returnText</u> function to the window.onload event.
* This ensures the <u>returnText</u> function executes automatically when the webpage finishes loading.</p>
* <p>
* The window.onload event is triggered after all assets
* (e.g., HTML, CSS, JavaScript, images) are fully loaded.
* By using this assignment, the <u>returnText</u> function initializes
* or performs actions required after the page loads.</p>
* @return void - The assigned function does not return any value.
* @see {@link window.onload}
* 
*/
window.onload = function() {
   returnText();
}

/**
 * Redirects the user to the main page when the "Home" link is clicked.
 * 
 * <p>This function listens for a click event on the element with the ID `Home-link`. Upon clicking, 
 * the user is redirected to the "1_mainpage.html" page. It is primarily used for navigation purposes 
 * within the application.</p>
 * 
 * @function
 * @param none
 * @return void
 * @since 2024-12-09
 */

document.getElementById('Home-link').addEventListener('click', () => {
    window.location.href = '1_mainpage.html';
});

/**
 * Initializes the Hangle game by setting up the word tiles and the keyboard interface.
 *
 * [Long Description]
 * This function prepares the game UI and functionality, including the following:
 * - Resets the display for the word tiles and keyboard.
 * - Dynamically creates tiles for the word to guess and sets them up as interactive elements.
 * - Generates a virtual keyboard for user input, including special keys ("Enter" and "Backspace").
 * - Binds event listeners for both virtual and physical keyboards to ensure seamless user interaction.
 *
 * Steps:
 * 1. Clears the existing word display area (`.display`).
 * 2. Creates blank tiles representing the word, appending them to the display container.
 * 3. Generates a virtual keyboard with rows of buttons for letters and special keys.
 * 4. Attaches click listeners to virtual keyboard buttons and binds physical keyboard inputs.
 *
 * @global {HTMLElement} tile_category - The DOM container for displaying the word tiles.
 * @global {HTMLElement} keyboard_container - The DOM container for rendering the virtual keyboard.
 * @global {function} input - Handles user input for letter guesses.
 * @global {function} updateRemoveBodyPartButton - Updates the initial state of game controls (e.g., remove body part button).
 * @global {number} word_length - The length of the word to guess, used to create tiles.
 *
 * @throws {Error} Throws an error if required global variables (`tile_category`, `keyboard_container`, etc.) are undefined.
 *
 * @example
 * // Example usage:
 * initialize();
 * // - Resets the game UI and sets up the tiles and keyboard for a new game.
 *
 * @see input - Handles user interaction with the keyboard for letter input.
 * @see updateRemoveBodyPartButton - Manages the state of specific game controls.
 * 
 * @see <a href="https://www.youtube.com/watch?v=EJ3GeUDGLE4&ab_channel=GreatDayDesigns">Game Development Tutorial - Great Day Designs</a>
 * @see <a href="https://www.youtube.com/watch?v=ckjRsPaWHX8&ab_channel=KennyYipCoding">Hangman Game Tutorial - Kenny Yip Coding</a>
 *
 */

function initialize() {
    const tile_category = document.querySelector(".display");
    tile_category.innerHTML = "";
    updateRemoveBodyPartButton()

    // Create HangMan Space
    for (let i=0; i<word_length; i++) {
        const tile = document.createElement("li");
        tile.id = i.toString();
        tile.classList.add("letter");
        tile.innerText = "";
        tile_category.appendChild(tile);
    }

    /// This is for typing the words in the boxes
    const rows = [
        "qwertyuiop".split(""),
        "asdfghjkl".split(""),
        [{ char: "↵", key: "enter" }, ..."zxcvbnm".split(""), { char: "⌫", key: "backspace" }],
    ];



    /// This is for typing the words in the boxes

    keyboard_container.innerHTML = "";

    rows.forEach((row) => {
        const keyboard_row = document.createElement("div"); // Create a row container
        keyboard_row.classList.add("keyboard_row");

        row.forEach((item) => {
            const button = document.createElement("button");

            if (typeof item === "string") {
                button.innerText = item.toUpperCase();
                button.dataset.key = item;
            } else {
                button.innerText = item.char;
                button.dataset.key = item.key;
            }

            button.addEventListener("click", () => {
                input(button.dataset.key);
            });

            keyboard_row.appendChild(button);
        });

        keyboard_container.appendChild(keyboard_row);
    });

    // Typing with keys
    document.addEventListener("keyup", (e) => {

        const keyPressed = e.key.toLowerCase(); 
        console.log("Key pressed:", keyPressed);
    
        let button = document.querySelector(`button[data-key="${keyPressed}"]`);
    
        if (!button) {
            if (e.key === "Enter") {
                button = document.querySelector(`button[data-key="enter"]`);
            } else if (e.key === "Backspace") {
                button = document.querySelector(`button[data-key="backspace"]`);
            }
        }
    
        if (button) {
            button.click();
        } else {
            console.log("No matching button found for:", keyPressed);
        }
    });
}

/**
* <p>Toggles the sound setting based on the state of the sound slider (checkbox).
* This function reads the state of the sound slider, stores it in `localStorage`,
* and allows persistence of the user's sound preference across sessions.</p>
* <p>Key functionality:</p>
* <ul>
*  <li>If the slider is checked, sound is enabled</li>
*  <li>If the slider is unchecked, sound is disabled.</li>
* </ul>
*
* <p>The state of the sound preference is saved in `localStorage` with the key `soundEnabled`.</p>
*
* Example usage:
* toggleSound();  // Saves the sound setting (enabled or disabled)
* @return void - The assigned function does not return any value.
* @since 2024-12-09
*/
function toggleSound() {
    const soundEnabled = document.getElementById('sound-slider').checked;
    localStorage.setItem('soundEnabled', soundEnabled); // Save the state
}

/**
 * Loads the user's sound preference from `localStorage` and applies it to the sound slider.
 * <p>
 * This function checks the `localStorage` for the user's saved sound preference under the key 
 * soundEnabled</code>. If no preference is found (value is null), it defaults 
 * to enabling sound and saves this default state back to `localStorage`. The function then updates 
 * the state of the sound slider on the webpage based on the retrieved or default preference.
 * </p>
 * <ul>
 *     <li><u>Retrieves Preference:</u> Reads the soundEnabled</code> key from `localStorage`.</li>
 *     <li><u>Defaults to Sound ON:</u> If no preference exists, sets soundEnabled to true.</li>
 *     <li><u>Updates UI:</u> Reflects the preference in the sound slider's checked state.</li>
 * </ul>
 *
 * @example:
 * loadSoundPreference(); // Loads and applies the user's sound preference on page load.
 * @return void - This function does not return a value.
 * @see localStorage
 * @see JSON.parse
 * @since 2024-12-09
 */
function loadSoundPreference() {
    let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled'));

    if (soundEnabled === null) {
        // Default to sound ON if no preference is saved
        soundEnabled = true;
        localStorage.setItem('soundEnabled', true);
    }

    // Set the slider and the sound state based on localStorage
    document.getElementById('sound-slider').checked = soundEnabled;
}

// Attach the event listener for the sound slider toggle
document.getElementById('sound-slider').addEventListener('change', toggleSound);

// Load the sound preference on page load
document.addEventListener('DOMContentLoaded', loadSoundPreference);

/**
 * Allows sound to play, grabbing the specific sound file from its path, when soundEnabled is true.
 * <p>
 * This function checks the when sound is <u>enabled</u>. If sound is enabled the function plays the audio.
 * If sound is not enabled it logs it to the console saying "Sound is disabled".
 * </p>
 * <ul>
 *     <li> sound is enabled sound plays</li>
 *     <li> sound is disabled sound does not play</li>
 * </ul>
 *
 * @example:
 * playSound(audioPath); // Loads and applies the user's sound preference on page load.
 * @param audioPath - write audio path in string
 * @return void - This function does not return a value.
 * @see localStorage
 * @see JSON.parse
 * @since 2024-12-09
 */
function playSound(audioPath) {
    const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled')); // Check the current sound state
    if (soundEnabled) {
        const audio = new Audio(audioPath);
        audio.play();
    } else {
        console.log("Sound is disabled.");
    }
}

/**
 * Processes user input and updates the game state based on the key pressed.
 *
 * [Long Description]
 * This function manages user input during gameplay. Depending on the key pressed, it performs one of the following actions:
 * 1. **Backspace**: Clears the most recent unlocked tile, updates the `spot` tracker, and exits the loop.
 * 2. **Enter**: Invokes `checkletter` to validate the current word or letter against the answer.
 * 3. **Letter Key**: Finds the first available unlocked tile and populates it with the letter, updating `spot` accordingly.
 *
 * The function ensures that no actions are taken if the game is over (`gameover` is `true`). It provides auditory feedback for 
 * all key presses using the `playSound` function. Additionally, it  handles edge cases such as locked tiles and 
 * ensures no actions occur when all tiles are filled.
 *
 * @param {string} keyPressed - The key pressed by the user. Can be one of the following:
 *                               - `"backspace"`: Clears the most recent input in an unlocked tile.
 *                               - `"enter"`: Triggers the letter/word validation process.
 *                               - Any other string representing a letter: Fills the next available tile.
 *
 * @global {boolean} gameover - Prevents further input if the game has ended.
 * @global {function} playSound - Plays a sound to provide auditory feedback for key presses.
 * @global {number} spot - Tracks the position of the next tile to populate.
 * @global {number} word_length - Determines the number of tiles in the current word.
 *
 *
 * @example
 * // Example usage:
 * input("a"); // Fills the next available tile with "A".
 * input("backspace"); // Clears the last input in an unlocked tile.
 * input("enter"); // Validates the user's word or letter.
 *
 * @see checkletter - Validates the current word/letter when "enter" is pressed.
 * @see playSound - Provides auditory feedback for key presses.
 *
 */
const input = (keyPressed) => {
    if (gameover) return;

    playSound('sounds/click.wav');

    if (keyPressed == "backspace") {

        for (let i=spot-1; i>=0; i--) {
            const currtile = document.getElementById(i.toString());
            if (!currtile.dataset.lock) {
                currtile.innerText = "";
                spot = i;
                break;
            }
            
        }
    }

    else if (keyPressed == "enter") {
        checkletter();

    
    }

    else {
        for (let i = 0; i < word_length; i++) {
            const currtile = document.getElementById(i.toString());
            if (!currtile.dataset.lock && currtile.innerText === "") {
                currtile.innerText = keyPressed.toUpperCase();
                spot = i + 1;
                break;
            }
        }
    }

}

/**
 * Validates the user's guess by comparing it with the correct word and updates the game state accordingly.
 *
 * [Long Description]
 * This function checks whether all the tiles have been filled with letters before validating the guess.
 * If any tile is empty, it prompts the user to fill all spots. If the tiles are filled, it evaluates each 
 * letter against the target word (`currentword`) and updates the game state:
 * 
 * 1. Correct guesses (letters in the correct position) are marked with the "right" class.
 * 2. Incorrectly positioned but valid letters are marked with the "there" class.
 * 3. Invalid letters (not in the word) are marked with the "wrong" class.
 *
 * Additionally, it tracks the number of incorrect guesses, updates the hangman display, and manages 
 * the game's end state by calling `checkgameover`. The keyboard buttons are dynamically updated to 
 * reflect the accuracy of the user's guesses.
 *
 * @global {string} currentword - The word the player is trying to guess.
 * @global {number} correct_word - The count of correctly guessed letters in the correct positions.
 * @global {number} wrong_attempts - The current number of incorrect guesses.
 * @global {number} max_attempts - The maximum number of allowed wrong guesses before game over.
 * @global {function} updatehangman - Updates the hangman figure based on incorrect attempts.
 * @global {function} updateRemoveBodyPartButton - Manages the state of the "remove body part" button.
 * @global {function} resetboard - Resets the tile board for the next round.
 * @global {function} checkgameover - Checks if the game is over due to winning or exceeding maximum attempts.
 *
 * @throws {Error} Throws an error if any required global variables (`currentword`, `word_length`, etc.) are undefined.
 *
 * @example
 * // Example usage:
 * checkletter();
 * // Output:
 * // - Updates the tile and keyboard button states based on the user's guess.
 * // - Logs incorrect attempts or success status to the console.
 *
 * @see updatehangman - Handles the visual display of the hangman figure.
 * @see checkgameover - Manages the game's end state based on current progress.
 * 
 * @note This logic was developed with assistance from ChatGPT to ensure accuracy and clarity.
 */

function checkletter() {

    let spotsfilled = true;

        for (let i =0; i<word_length; i++) {
            const currtile = document.getElementById(i.toString());

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
                const currtile = document.getElementById(i.toString());
                let letter = currtile.innerText.toUpperCase();
                const keyButton = document.querySelector(`button[data-key="${letter.toLowerCase()}"]`);

                if (currentword[i]==letter) {
                    currtile.classList.add("right");
                    currtile.dataset.lock = "true";
                    if (keyButton) {
                        if (keyButton.classList.contains("there")) {
                            keyButton.classList.remove("there");
                        }
                        
                        keyButton.classList.add("right");
                    }

                    correct_word += 1;
                }
                
                else if(currentword.includes(letter)) {
                    currtile.classList.add("there");
                    if (keyButton) 
                        if (!keyButton.classList.contains("right")) {
                            keyButton.classList.add("there");
                        }
                    incorrectGuess = true;
                }

                else {
                    if (keyButton) keyButton.classList.add("wrong");
                    incorrectGuess = true;
                }

        }

        if (incorrectGuess) {
            wrong_attempts++;
            console.log(`Wrong attempt ${wrong_attempts}/${max_attempts}`);
            updatehangman();
            updateRemoveBodyPartButton();
        }

            
        }
        resetboard();
        checkgameover(incorrectGuess);
        
    
}


/**
 * Animates the tiles with a "bounce" effect sequentially.
 *
 * [Long Description]
 * This function applies a "bounce" animation to each tile representing the guessed word.
 * The animation is applied sequentially with a staggered delay, ensuring a smooth visual effect.
 * After the animation ends, the "bounce" class is removed from each tile to reset its state.
 *
 * The delay for each tile is based on its index, creating a cascading animation effect.
 * This function is primarily used to enhance user experience by providing visual feedback.
 *
 * @global {number} word_length - The total number of tiles to animate, corresponding to the length of the word.
 *
 * @throws {Error} Throws an error if the global variable `word_length` is undefined or if a tile element cannot be found.
 *
 * @example
 * // Example usage:
 * animateTiles();
 * // Output:
 * // - Applies a "bounce" animation to each tile with a staggered delay.
 *
 */
function animateTiles() {
    for (let i = 0; i < word_length; i++) {
        const currtile = document.getElementById(i.toString());

        // Add a delay for each tile based on its index
        setTimeout(() => {
            currtile.classList.add("bounce");

            // Remove the animation class after it ends
            currtile.addEventListener("animationend", () => {
                currtile.classList.remove("bounce");
            });
        }, i * 150); // Stagger delay by 150ms per tile
    }
}


/**
 * Checks if the game is over and handles end-of-game actions accordingly.
 *
 * [Long Description]
 * This function determines whether the game has ended based on the player's most recent guess.
 * If the guess was correct and the game is won, it sets the game state to "over," displays a 
 * winning message, animates the tiles, plays a victory sound, and launches confetti. If the 
 * number of incorrect attempts reaches or exceeds the maximum allowed, it ends the game, 
 * displays a losing message, and plays a failure sound.
 *
 * @param {boolean} incorrectGuess - Indicates whether the last guess was incorrect.
 *                                    If `true`, the game checks if the maximum attempts have been exceeded.
 *
 * @global {boolean} gameover - A flag that indicates if the game has ended. This is set to `true` when the game is over.
 * @global {number} wrong_attempts - The current number of incorrect guesses.
 * @global {number} max_attempts - The maximum number of incorrect guesses allowed before the game ends.
 * @global {string} currentword - The word the player was trying to guess, used in the losing message.
 * @global {function} animateTiles - Animates the tiles when the game is won.
 * @global {function} displayMessage - Displays a message to the player indicating the game's outcome.
 * @global {function} playSound - Plays a sound file corresponding to the game's outcome (win or lose).
 *
 *
 * @example
 * // Example usage:
 * checkgameover(false); // Handles the "win" scenario if no incorrect guess.
 * checkgameover(true);  // Checks if the player has exceeded the maximum allowed incorrect attempts.
 *
 * @see animateTiles - For handling tile animations upon winning.
 * @see displayMessage - For managing game status messages.
 * @see confetti - Used to trigger confetti effects for celebrations.
 * 
 */
function checkgameover(incorrectGuess) {

    if (!incorrectGuess) {
        gameover = true;
        console.log("good!");
        displaymessage("You Win!", true, true);
        animateTiles();
        playSound('sounds/win.wav');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#bb0000','#ffffff','#00bb00']
        });
        return;
    }
 
    if (wrong_attempts >= max_attempts) {
        gameover = true;
        console.log("bad");
        displaymessage(`Game Over! The word was: ${currentword}`);
        playSound('sounds/lose.wav');
        return;
    }
 }

 /**
 * Displays a message overlay on the screen with optional reset and home buttons.
 *
 * [Long Description]
 * This function creates and displays an overlay message on the screen. It includes a customizable 
 * message and optional buttons for resetting the game and navigating to the home page. The overlay 
 * is styled dynamically based on whether the game was won or lost. The "Play Again" button reloads 
 * the page to restart the game, while the "Go Home" button redirects to the main page.
 *
 * A fade-in animation is triggered after the overlay is appended to the DOM for a smooth visual effect.
 *
 * @param {string} message - The message to display on the overlay.
 * @param {boolean} [showResetButton=true] - Determines whether the "Play Again" button is displayed.
 * @param {boolean} [isWin=false] - Specifies whether the game was won, which affects the overlay's style.
 *
 * @example
 * // Display a winning message with reset and home buttons:
 * displayMessage("You Win!", true, true);
 *
 * // Display a losing message without a reset button:
 * displayMessage("Game Over! The word was: CAT", false);
 *
 * @see location.reload - Used to reload the page for restarting the game.
 * @see window.location.href - Redirects to the specified home page URL.
 */
 function displaymessage(message, showResetButton = true, isWin = false) {
    // Create the black overlay
    const overlay = document.createElement("div");
    overlay.classList.add(isWin ? "overlay-win" : "overlay");

    // Create the message container
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    // Add the message text
    const messageText = document.createElement("p");
    messageText.classList.add("message-text");
    messageText.innerText = message;
    messageContainer.appendChild(messageText);

    // Add the reset button (Play Again)
    if (showResetButton) {
        const resetButton = document.createElement("button");
        resetButton.classList.add("reset-button");
        resetButton.innerText = "Play Again";
        resetButton.addEventListener("click", () => {
            location.reload(); // Reload the page to restart the game
        });
        messageContainer.appendChild(resetButton);
    }

    // Add the Home button (go to home page)
    const homeButton = document.createElement("button");
    homeButton.classList.add("home-button");
    homeButton.innerText = "Go Home";
    homeButton.addEventListener("click", () => {
        window.location.href = '1_mainpage.html'; // Redirect to home page
    });
    messageContainer.appendChild(homeButton);

    // Append the container to the overlay
    overlay.appendChild(messageContainer);

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Trigger fade-in animation
    setTimeout(() => {
        overlay.classList.add("fade-in");
    }, 10);
}


/**
 * Resets the letter tiles on the board for the next round of the game.
 *
 * [Long Description]
 * This function clears the text and resets the styles for all letter tiles that 
 * are not marked as "right" (correctly guessed letters). It ensures that only 
 * unlocked tiles (tiles without the "right" class) are cleared, while maintaining 
 * the state of correctly guessed tiles. Additionally, it removes the "there" 
 * class from all tiles, resetting their visual state.
 *
 * Key Features:
 * - Clears the `innerText` of tiles that are not locked as correct.
 * - Removes the "there" class from all tiles.
 * - Resets the `spot` tracker to 0, indicating the starting position for input in the next round.
 *
 * @global {number} word_length - The length of the word being guessed, used to determine the number of tiles.
 * @global {number} spot - Tracks the current position for the next input. This is reset to 0 by this function.
 *
 * @example
 * // Reset the board for a new round:
 * resetboard();
 *
 * @see spot - Resets the spot tracker for the next round of inputs.
 * @since 2024-12-09
 */
function resetboard() {
    for (let i = 0; i<word_length; i++) {
        const currtile = document.getElementById(i.toString());
        if (!currtile.classList.contains("right")) {
            currtile.innerText = "";
            currtile.classList.remove("there");
        }
    }

    spot = 0;

}

/**
 * Updates the hangman figure by revealing the next body part image.
 *
 * <p>This function manages the visual representation of incorrect guesses by progressively 
 * revealing parts of the hangman figure. Each time an incorrect guess is made, the opacity 
 * of the next body part image in the sequence is set to 1, making it visible. The function 
 * keeps track of the current index of the body parts and ensures that it does not exceed the 
 * total number of body parts available.</p>
 *
 * <ul>
 *   <li><strong>Increment Index:</strong> The function increments the `currentIndex` to keep track 
 *       of which body part should be revealed next.</li>
 *   <li><strong>Reveal Body Part:</strong> The next body part image in the sequence is revealed 
 *       by changing its opacity.</li>
 *   <li><strong>Boundary Check:</strong> Ensures that no more body parts are revealed after the 
 *       last image in the sequence.</li>
 * </ul>
 *
 * @global {NodeList} images - A collection of elements representing the hangman body parts.
 *                             These elements are queried from the DOM using the `.body-part` class.
 * @global {number} currentIndex - Tracks the current body part being revealed. Incremented with 
 *                                 each incorrect guess.
 *
 * @throws {Error} Throws an error if the `images` NodeList is undefined or `currentIndex` exceeds its length.
 *
 * @example
 * // Example usage:
 * updatehangman();
 * // Output:
 * // - Reveals the next body part in the sequence by making it visible.
 *
 * @since 2024-12-09
 */
function updatehangman() {
    const images = document.querySelectorAll('.body-part');
    if (currentIndex < images.length) {
        images[currentIndex].style.opacity = 1; // Show the next image
        currentIndex++;
     }
}

document.getElementById('Home-link').addEventListener('click', () => {
    window.location.href = 'index.html';
});

/**
 * <p>
 * toggles darkmode on and off and saves the data into {@code localStorage} object, which is
 * then stored in the web storage API</p>
 * 
 * <p>
 * This function toggles the darkmode class on the {@code document.body} element, 
 * which typically applies or removes dark mode styling. It also updates the {@code localStorage}
 * with the current dark mode state. The state is saved as a boolean, where true
 * indicates that dark mode is enabled and false indicates that dark mode is disabled.
 *
 * @example:
 * toggleDarkMode(); // Loads and applies the user's sound preference on page load.
 * @return void - This function does not return a value.
 * @see localStorage
 * @see document.body
 * @since 2024-12-09
 */
function toggleDarkMode() {
    const darkModeEnabled = document.body.classList.toggle('darkmode');
    localStorage.setItem('darkModeEnabled', darkModeEnabled); // Save the state
}

/**
 * Toggles the dark mode on or off and saves the current state in localStorage.
 * <p>
 * This function toggles the <code>darkmode</code> class on the <code>document.body</code> element, 
 * which typically applies or removes dark mode styling. It also updates the <code>localStorage</code> 
 * with the current dark mode state. The state is saved as a boolean, where <code>true</code> 
 * indicates that dark mode is enabled and <code>false</code> indicates that dark mode is disabled.
 * </p>
 *
 * @example usage:
 * toggleDarkMode(); // Toggles dark mode and saves the state
 *
 * @return void - This function does not return any value.
 * @see localStorage
 * @see document.body
 */
function loadDarkModePreference() {
    const darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'));

    if (darkModeEnabled) {
        // Apply dark mode if it was enabled
        document.body.classList.add('darkmode');
        document.getElementById('darkmode-slider').checked = true; // Set the slider to ON
    } else {
        // Ensure light mode if dark mode was not enabled
        document.body.classList.remove('darkmode');
        document.getElementById('darkmode-slider').checked = false; // Set the slider to OFF
    }
}

// Attach the event listener for the dark mode slider toggle
document.getElementById('darkmode-slider').addEventListener('change', toggleDarkMode);

// Load the dark mode preference on page load
document.addEventListener('DOMContentLoaded', loadDarkModePreference);


const challengeSlider = document.getElementById("challenge-slider"); 
const keyboardContainer = document.getElementById("keyboard_container");
/**
 * <p>
 * Toggles the "grey-mode" class on the keyboard container based on the challenge slider's state.
 * <p> 
 * 
 * <ul>
 *     <li><strong>Checked:</strong> Enables "grey-mode" on the keyboard container.</li>
 *     <li><strong>Unchecked:</strong> Disables "grey-mode" and restores default styling.</li>
 * </ul>
 *
 * @event change - Triggered when the state of the challenge slider changes (checked/unchecked).
 *
 * @param {Event} event - The event triggered when the slider's state changes.
 *
 * @global {HTMLElement} challengeSlider - The DOM element representing the challenge slider.
 * @global {HTMLElement} keyboardContainer - The DOM element containing the keyboard.
 *
 * @example
 * // Example usage:
 * challengeSlider.addEventListener("change", () => {
 *     if (challengeSlider.checked) {
 *         keyboardContainer.classList.add("grey-mode");
 *     } else {
 *         keyboardContainer.classList.remove("grey-mode");
 *     }
 * });
 *
 * @return {void} - This function does not return a value.
 * @see keyboardContainer - The target element for the "grey-mode" class.
 * @see challengeSlider - The slider controlling the challenge mode.
 * @since 2024-12-09
 */
challengeSlider.addEventListener("change", () => {
    if (challengeSlider.checked) {
        keyboardContainer.classList.add("grey-mode");
    } else {
        keyboardContainer.classList.remove("grey-mode");
    }
});

/**
 * Handles the click event of the "remove-body-part" button to remove a body part image.
 * 
 * <p>This function is triggered when the user clicks the "remove-body-part" button. It reduces the visibility 
 * of the most recent body part image (by setting its opacity to 0) and decreases the `wrong_attempts` count. 
 * The button is then disabled and visually updated to indicate it's no longer clickable. If no wrong attempts 
 * are left, the button is hidden.</p>
 * 
 * @function
 * @param none
 * @return void
 * @see wrong_attempts,currentIndex
 * @since 2024-12-09
 */
document.getElementById('remove-body-part').addEventListener('click', function () {
    if (wrong_attempts > 0) {
        const images = document.querySelectorAll('.body-part');
        if (currentIndex > 1) {
            currentIndex--;
            images[currentIndex].style.opacity = 0;
            wrong_attempts = Math.max(0, wrong_attempts - 1);
            console.log(`Body part removed. Remaining wrong attempts: ${max_attempts - wrong_attempts}`);
        }
        this.disabled = true;
        this.style.opacity = 0.5;
        this.style.cursor = 'not-allowed';
    } else {
        this.style.display = 'none';
    }
});

/**
 * Adds an event listener to the "reveal-letter" button to reveal a random unrevealed letter from the current word.
 * <p>This functionality helps the user by revealing a letter from the target word when the button is clicked. 
 * The revealed letter is displayed in its corresponding tile on the interface and marked as "right." 
 * Additionally, the associated keyboard key is highlighted. Once all letters are revealed, 
 * the game checks for completion, and the "reveal-letter" button is disabled to prevent further use.</p>
 * <ul>
 *   <li><strong>Revealing a Letter:</strong> A random unrevealed letter is selected, displayed on the game tile, and marked as correct.</li>
 *   <li><strong>Keyboard Highlight:</strong> The corresponding keyboard key is updated to indicate it has been used correctly.</li>
 *   <li><strong>Button State:</strong> The "reveal-letter" button is disabled after a letter is revealed to prevent additional usage.</li>
 *   <li><strong>Game Completion:</strong> If all letters are revealed, the game checks for completion.</li>
 *   <li><strong>Error Handling:</strong> If all letters have already been revealed, a message is logged to the console.</li>
 * </ul>
 * 
 * @function
 * @since 2024-12-09
 */
document.getElementById('reveal-letter').addEventListener('click', function () {
    const randomIndex = getRandomUnrevealedLetter();

    if (randomIndex !== null) {
        const currTile = document.getElementById(randomIndex.toString());
        currTile.innerText = currentword[randomIndex];
        currTile.classList.add("right"); 
        currTile.dataset.lock = "true"; 

        // Update the keyboard button color
        const keyButton = document.querySelector(`button[data-key="${currentword[randomIndex].toLowerCase()}"]`);
        if (keyButton) {
            keyButton.classList.add("right");
        }

        correct_word++; 

        if (correct_word === word_length) {
            checkgameover(false); 
        }
    } else {
        console.log("All letters have already been revealed.");
    }
    this.disabled = true;
    this.style.opacity = 0.5; 
    this.style.cursor = 'not-allowed';
});

/**
 * Retrieves the index of a random unrevealed letter from the current word.
 * 
 * <p>This function identifies all the tiles representing unrevealed letters and randomly selects 
 * one of them. If all letters have been revealed, it returns `null`. The unrevealed letters are 
 * determined by checking the absence of a `lock` attribute in the dataset of each tile element.</p>
 * 
 * @function
 * @param none
 * @return {number|null} - The index of a random unrevealed letter, or `null` if no letters are left to reveal.
 * @see word_length
 * @since 2024-12-09
 *
 */
function getRandomUnrevealedLetter() {
    const unrevealedIndices = [];
    // Collect indices of unrevealed letters
    for (let i = 0; i < word_length; i++) {
        const currTile = document.getElementById(i.toString());
        if (!currTile.dataset.lock) {
            unrevealedIndices.push(i);
        }
    }
    // Shuffle the unrevealed indices
    if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrevealedIndices.length);
        return unrevealedIndices[randomIndex];
    }
    return null; // No letters left to reveal
}

/**
 * Updates the visibility of the "Remove Body Part" button based on the number of wrong attempts.
 * 
 * <p>This function checks the value of `wrong_attempts` and adjusts the display style of the 
 * "remove-body-part" button accordingly. The button becomes visible when there is at least one wrong 
 * attempt and is hidden otherwise. This functionality ensures that the button is only accessible 
 * when it is relevant to the game state.</p>
 * 
 * @function
 * @return void
 * @since 2024-12-09
 */
function updateRemoveBodyPartButton() {
    const removeBodyPartButton = document.getElementById('remove-body-part');
    if (wrong_attempts > 0) {
        removeBodyPartButton.style.display = 'inline-block';
    } else {
        removeBodyPartButton.style.display = 'none';
    }
}

module.exports = {
    initialize,
    input,
    checkletter,
    resetboard,
    checkgameover,
    updatehangman,
};
