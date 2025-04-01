/**
 * This script handles the opening and closing of the "Guide," "Settings," and "Hints” buttons.
 * 
 * - Each link (`guideLink`, `settingsLink`, `hintsLink`) opens its corresponding modal when clicked.
 * - Each modal can be closed via a close button or by clicking outside the modal.
 */


//creates the modals and buttons
const guideLink = document.getElementById("guide-link");
const settingsLink = document.getElementById("settings-link");
const hintsLink = document.getElementById("hints-link")

const guideModal = document.getElementById("guide-modal");
const settingsModal = document.getElementById("settings-modal");
const hintsModal = document.getElementById("hints-modal");


const closeGuideButton = document.getElementById("close-guide");
const closeSettingsButton = document.getElementById("close-settings");
const closeHintsButton = document.getElementById("close-hints");

/**
 * Adds an event listener to the `guideLink` element to handle click events.
 * 
 * <p>When the `guide` element is clicked:</p>
 *   <ul>
 *       <li>Prevents the default behavior of navigating to a new page.</li>
 *       <li>Displays the guide modal by changing its `display` style to `flex`.</li>
 *   </ul>
 * @return void - The assigned function does not return any value.
 * @see guideModal
 */

guideLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    guideModal.style.display = "flex"; // Show modal
});

/**
 * <p>Adds an event listener to close the `guideLink` element.</p>
 * 
 * <p>When the close guide button is clicked, it closes the modal window</p>
 * @return void - The assigned function does not return any value.
 * @see guideModal
 */

closeGuideButton.addEventListener("click", () => {
    guideModal.style.display = "none"; // Hide modal
});

/**
 * <p>Adds an event listener to the window to handle click events for closing the Settings modal.</p>
 * 
 * <p>When a click event occurs outside the modal window:</p>
 *    <ul>
 *        <li>Checks if the click target is the `settingsModal` element.</li>
 *        <li>If the target is outside the window, hides the modal by setting its display style to `none`.</li>
 *    </ul>
 * @return void - The assigned function does not return any value.
 * @see guideModal
 */

window.addEventListener("click", (event) => {
    if (event.target === guideModal) {
        guideModal.style.display = "none"; // Hide modal
    }
});

/**
 * <p>Adds an event listener to the `settingLink` element to handle click events.</p>
 * 
 * <p>When the `settings` element is clicked:</p>
 *    <ul>
 *        <li>Prevents the default behavior of navigating to a new page.</li>
 *        <li>Displays the guide modal by changing its `display` style to `flex`.</li>
 *   </ul>
 * @return void - The assigned function does not return any value.
 * @see settingsModal
 */
settingsLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    settingsModal.style.display = "flex"; // Show modal
});

/**
 * <p>Adds an event listener to close the `settingsLink` element.</p>
 * 
 * <p>When the close settings button is clicked, it closes the modal window</p>
 * @return void - The assigned function does not return any value.
 * @see settingsModal
 */
closeSettingsButton.addEventListener("click", () => {
    settingsModal.style.display = "none"; // Hide modal
});

/**
 * <p>Adds an event listener to the window to handle click events for closing the Settings modal.</p>
 * 
 * <p>When a click event occurs outside the modal window:</p>
 *    <ul>
 *        <li>Checks if the click target is the `settingsModal` element.</li>
 *        <li>If the target is outside the window, hides the modal by setting its display style to `none`.</li>
 *    </ul>
 * @return void - The assigned function does not return any value.
 * @see settingsModal
 */
window.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none"; // Hide modal
    }
});

/**
 * <p>Adds an event listener to the `hintsLink` element to handle click events.</p>
 * 
 * <p>When the `hints` element is clicked:</p>
 *    <ul>
 *        <li>Prevents the default behavior of navigating to a new page.</li>
 *        <li>Displays the guide modal by changing its `display` style to `flex`.</li>
 *    </ul>
 * @return void - The assigned function does not return any value.
 * @see hintsModal
 */
hintsLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    hintsModal.style.display = "flex"; // Show modal
});

/**
 * <p>Adds an event listener to close the `hintsLink` element.</p>
 * 
 * <p>When the close hints button is clicked, it closes the modal window</p>
 * @return void - The assigned function does not return any value.
 * @see hintsModal
 */
closeHintsButton.addEventListener("click", () => {
    hintsModal.style.display = "none"; // Hide modal
});

/**
 * <p>Adds an event listener to the window to handle click events for closing the Hints modal.</p>
 * 
 * <p>When a click event occurs outside the modal window:</p>
 *    <ul>
 *        <li>Checks if the click target is the `hintsModal` element.</li>
 *        <li>If the target is outside the window, hides the modal by setting its display style to `none`.</li>
 *    </ul>
 * @return void - The assigned function does not return any value.
 * @see hintsModal
 */
window.addEventListener("click", (event) => {
    if (event.target === hintsModal) {
       hintsModal.style.display = "none"; // Hide modal
    }
});