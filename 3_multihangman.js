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
 * Example usage:
 * <pre>
 * returnText(); // Processes the user input and updates the game state.
 * </pre>
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
    console.log("Word Set:", currentword);

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
let right_attempts = 0;
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


document.getElementById('Home-link').addEventListener('click', () => {
    window.location.href = '1_mainpage.html';
});

/**
 * Initializes the Hangman game by setting up the word display and virtual keyboard.
 *
 * [Long Description]
 * This function prepares the Hangman game interface by:
 * 1. Verifying that the target word (`currentword`) and its length (`word_length`) are set.
 * 2. Creating and displaying blank tiles for each letter of the target word.
 * 3. Generating a virtual keyboard with buttons for each letter, allowing user interaction.
 * 4. Binding a keyup event listener to handle physical keyboard inputs.
 *
 * If the target word is not set correctly, the function logs an error and exits early.
 *
 * @global {string} currentword - The target word for the game. Must be defined before calling this function.
 * @global {number} word_length - The length of the target word, used to create the corresponding number of tiles.
 * @global {HTMLElement} tile_category - The DOM element where the letter tiles are displayed.
 * @global {HTMLElement} keyboard_container - The DOM element where the virtual keyboard is rendered.
 * @global {function} input - A function that processes user input from the virtual or physical keyboard.
 * @global {function} handleKeyup - A function that processes physical keyboard inputs.
 *
 * @throws {Error} Logs an error if `currentword` or `word_length` is not properly set.
 *
 * @example
 * // Example usage:
 * initialize();
 * // Output:
 * // - Sets up the game UI with blank tiles and a functional keyboard.
 *
 * @see input - Handles user input for typing letters.
 * @see handleKeyup - Handles physical keyboard inputs and triggers the appropriate logic.
 * 
 * @see <a href="https://www.youtube.com/watch?v=EJ3GeUDGLE4&ab_channel=GreatDayDesigns">Game Development Tutorial - Great Day Designs</a>
 * @see <a href="https://www.youtube.com/watch?v=ckjRsPaWHX8&ab_channel=KennyYipCoding">Hangman Game Tutorial - Kenny Yip Coding</a>
 *
 */
function initialize() {
    // Check if the word is set
    if (!currentword || word_length === 0) {
        console.error("Game initialization failed. Ensure the word is set properly.");
        return;
    }

    const tile_category = document.querySelector(".display");
    tile_category.innerHTML = "";

    // Create Hangman Space
    for (let i = 0; i < word_length; i++) {
        const tile = document.createElement("li");
        tile.id = i.toString();
        tile.classList.add("letter");
        tile.innerText = "";
        tile_category.appendChild(tile);
    }

    // Keyboard setup
    keyboard_container.innerHTML = ""; // Clear the keyboard container

    const rows = [
        "qwertyuiop".split(""),
        "asdfghjkl".split(""),
        "zxcvbnm".split(""),
    ];

    rows.forEach((row) => {
        const keyboard_row = document.createElement("div");
        keyboard_row.classList.add("keyboard_row");

        row.forEach((item) => {
            const button = document.createElement("button");

            if (typeof item === "string") {
                button.innerText = item.toUpperCase();
                button.dataset.key = item;
            }

            button.addEventListener("click", () => {
                input(button.dataset.key);
            });

            keyboard_row.appendChild(button);
        });

        keyboard_container.appendChild(keyboard_row);
    });

    // Add typing functionality
    document.addEventListener("keyup", handleKeyup);

    //console.log("Game initialized with word:", currentword);
}

/**
 * Handles keyup events and simulates a button click based on the key pressed.
 * 
 * <p>This function processes the `keyup` event to identify the key pressed and triggers the corresponding 
 * button's `click` event if a matching button exists. It ensures that keypresses are ignored if a popup 
 * is active or if the game is not properly initialized. This function is essential for keyboard-based 
 * interaction within the game.</p>
 * 
 * @function
 * @param {KeyboardEvent} e - The `keyup` event object containing information about the key pressed.
 * @return void
 * @throws Error if `currentword` is not defined, indicating that the game has not been initialized.
 * @see currentword
 * @since 2024-12-09
 */
function handleKeyup(e) {
    const popup = document.querySelector(".popup");

    // Ignore keypress if popup is visible
    if (popup.style.display === "flex" || popup.style.display === "block") {
        console.log("Popup is active. Ignoring keypress.");
        return;
    }

    // Ensure the game is initialized
    if (!currentword) {
        console.error("Cannot process keypress: currentword is undefined.");
        return;
    }

    const keyPressed = e.key.toLowerCase();
    console.log("Key pressed:", keyPressed);

    const button = document.querySelector(`button[data-key="${keyPressed}"]`);
    if (button) {
        button.click(); // Simulate a button click
    } else {
        console.log(`No matching button found for: ${keyPressed}`);
    }
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
 * Handles user input for guessing letters and updates the game state accordingly.
 *
 * [Long Description]
 * This function processes user guesses based on the key pressed, whether through a virtual or physical keyboard.
 * It performs the following actions:
 * 1. Prevents further action if the corresponding button for the pressed key is already disabled.
 * 2. Checks if the guessed letter exists in the target word (`currentword`):
 *    - For correct guesses:
 *      - Updates the matching tiles with the guessed letter.
 *      - Adds a "right" class to the tile and button for visual feedback.
 *      - Increments the `right_attempts` counter.
 *    - For incorrect guesses:
 *      - Marks the button with a "wrong" class.
 *      - Increments the `wrong_attempts` counter.
 *      - Updates the hangman display by calling `updatehangman`.
 * 3. Disables the key button to prevent duplicate inputs.
 * 4. Checks if the game is over by invoking `checkgameover`.
 *
 * @param {string} keyPressed - The letter key pressed by the user (case-insensitive).
 *
 * @global {string} currentword - The target word to guess.
 * @global {number} word_length - The length of the target word.
 * @global {number} right_attempts - Tracks the number of correctly guessed letters.
 * @global {number} wrong_attempts - Tracks the number of incorrect guesses.
 * @global {function} updatehangman - Updates the visual representation of the hangman based on incorrect guesses.
 * @global {function} checkgameover - Checks if the game has ended (win or lose) based on the game state.
 * @global {function} playSound - Plays sound effects for user interactions.
 *
 * @throws {Error} Throws an error if required global variables (`currentword`, `word_length`, etc.) are undefined.
 *
 * @example
 * // Example usage:
 * input("a"); // Handles the user's guess of the letter "A".
 * // If correct:
 * // - Updates tiles with "A".
 * // - Marks the button as "right".
 * // - Increments `right_attempts`.
 * // If incorrect:
 * // - Marks the button as "wrong".
 * // - Increments `wrong_attempts`.
 * // - Updates the hangman display.
 *
 * @see updatehangman - Updates the visual state of the hangman figure.
 * @see checkgameover - Evaluates whether the game has ended.
 *
 */
const input = (keyPressed) => {
    const keyButton = document.querySelector(`button[data-key="${keyPressed.toLowerCase()}"]`);

    if (keyButton.disabled) return; 


    if (currentword.includes(keyPressed.toUpperCase())) {

        for (let i = 0; i < word_length; i++) {
            if (currentword[i] === keyPressed.toUpperCase()) {
                const currTile = document.getElementById(i.toString());
            
                if (currTile) {
                    currTile.innerText = keyPressed.toUpperCase();
                    currTile.classList.add("right");
                    right_attempts++;
                    
                } 
                keyButton.classList.add("right");
            }
        }
        keyButton.classList.add("correct");
        playSound('sounds/click.wav');
    } else {
        keyButton.classList.add("wrong");
        wrong_attempts++;
        updatehangman();
        playSound('sounds/click.wav');
    }

    keyButton.disabled = true; 
    checkgameover(wrong_attempts);
};

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
 * Checks the game state to determine if the player has won or lost and handles end-of-game actions.
 *
 * [Long Description]
 * This function evaluates whether the game is over based on the number of incorrect attempts or 
 * the number of correctly guessed letters. Depending on the result:
 * 1. **Game Lost**:
 *    - If the number of incorrect attempts (`wrong_attempts`) reaches 6:
 *      - Sets the `gameover` flag to `true`.
 *      - Displays a "Game Over" message with the correct word.
 *      - Plays a "lose" sound effect.
 *      - Triggers tile animations for visual feedback.
 * 2. **Game Won**:
 *    - If the number of correctly guessed letters (`right_attempts`) equals the word length (`word_length`):
 *      - Sets the `gameover` flag to `true`.
 *      - Displays a "You Win!" message.
 *      - Plays a "win" sound effect.
 *      - Launches a confetti animation for celebration.
 *      - Triggers tile animations for visual feedback.
 *
 * This function ensures proper handling of both win and lose states and enhances the user experience
 * through sound effects, animations, and visual cues.
 *
 * @param {number} wrong_attempts - The current count of incorrect guesses by the player.
 *
 * @global {boolean} gameover - A flag indicating whether the game has ended.
 * @global {string} currentword - The word the player is trying to guess.
 * @global {number} right_attempts - The count of correctly guessed letters.
 * @global {number} word_length - The total number of letters in the target word.
 * @global {function} displaymessage - Displays a message to the player (win or lose).
 * @global {function} playSound - Plays sound effects for the game's win or lose scenarios.
 * @global {function} animateTiles - Animates the letter tiles for visual feedback.
 *
 * @example
 * // Example usage:
 * checkgameover(6); // Handles the "Game Over" scenario if the player has reached the max wrong attempts.
 * checkgameover(3); // Handles the "You Win" scenario if the player guesses all letters correctly.
 *
 * @see displaymessage - Used to show end-of-game messages.
 * @see playSound - Handles sound effects for win and lose events.
 * @see animateTiles - Animates the tiles for added feedback at the end of the game.
 * @see confetti - Creates a celebratory effect for winning the game.
 *
 */
function checkgameover(wrong_attempts) {

    if (wrong_attempts == 6) {
        gameover = true;
        console.log("bad");
        displaymessage(`Game Over! The word was: ${currentword}`);
        playSound('sounds/lose.wav');
        animateTiles();
        return;
    }
 
    if (right_attempts==word_length) {
        gameover = true;
        console.log("good!")
       displaymessage("You Win!", true, true)
       animateTiles();
       confetti({
        particleCount: 150,    // Number of confetti pieces
        spread: 70,            // Spread angle of confetti
        origin: { y: 0.6 },    // Confetti drop point
        colors: ['#bb0000', '#ffffff', '#00bb00'] // Custom colors
        });
        playSound('sounds/win.wav');
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
 *
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
    window.location.href = 'index.html';
});

window.onload = function() {
    initialize();
    loadDarkModePreference();  // Load dark mode state when the page loads
};

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
document.getElementById('darkmode-slider').addEventListener('change', toggleDarkMode);
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
    for (let i = 0; i < word_length; i++) {
        const currTile = document.getElementById(i.toString());
        if (!currTile.dataset.lock) {
            unrevealedIndices.push(i);
        }
    }
    if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrevealedIndices.length);
        return unrevealedIndices[randomIndex];
    }
    return null;
}

module.exports = {
    initialize,
    input,
    checkletater,
    checkgameover,
    updatehangman,
};