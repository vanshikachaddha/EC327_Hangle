let darkmode = localStorage.getItem('darkmode')// initializes localStorage object and stores the object in web storage API
const darkmode_slider = document.getElementById("darkmode-slider"); 

/**
 * <p>Enables dark mode by applying the 'darkmode' class to the document body
 * and storing the user's preference in local storage.</p>
 *
 * <p>This function performs the following actions:</p>
 *  <u>
 *   <li>Adds the 'darkmode' class to the `document.body`, changing the appearance of the page.
 *   <li>Saves the user's preference for dark mode in the browser's `localStorage` 
 *   with the key 'darkmode' and value 'active'.
 * </u>
 *
 * @example:
 * enableDarkmode(); // Activates dark mode for the page
 * 
 * @return void - The assigned function does not return any value.
 * @see <a href="https://www.w3schools.com/jsref/met_storage_getitem.asp">https://www.w3schools.com/jsref/met_storage_getitem.asp</a>
 * @see<a href="https://www.youtube.com/watch?v=_gKEUYarehE">https://www.youtube.com/watch?v=_gKEUYarehE</a> 
 */
const enableDarkmode = () =>{
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}


/**
 * <p>disables dark mode by applying the 'darkmode' class to the document body
 * and storing the user's preference in local storage.</p>
 *
 * <p>This function performs the following actions:</p>
 *  <u>
 *   <li>Adds the 'darkmode' class to the `document.body`, changing the appearance of the page.
 *   <li>Saves the user's preference for dark mode in the browser's `localStorage` 
 *   with the key 'darkmode' and value null.
 * </u>
 *
 * @example:
 * disableDarkmode(); // disables dark mode for the page
 * 
 * @return void - The assigned function does not return any value.
 * @see <a href="https://www.w3schools.com/jsref/met_storage_getitem.asp">https://www.w3schools.com/jsref/met_storage_getitem.asp</a>
 * @see<a href="https://www.youtube.com/watch?v=_gKEUYarehE">https://www.youtube.com/watch?v=_gKEUYarehE</a> 
 */
const disableDarkmode = () =>{
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}


if(darkmode ==="active") enableDarkmode();//enables darkmode

/**
 * <p>adds an event listener to darkmode slider to toggle the darkmode. 
 * It checks th current state of darkmode. if darkmode is not enabled it enables the darkmode
 * and vicevesa. This all occurs when the slider changes.</p>
 *
 * <p>This function performs the following actions:</p>
 * <ul>
 *     <li><u>Enables dark mode:</u> Calls <code>enableDarkmode</code> if the current mode is not active.</li>
 *     <li><u>Disables dark mode:</u> Calls <code>disableDarkmode</code> if the current mode is active.</li>
 * </ul>
 *
 * @event change - Triggered when the state of the dark mode slider changes.
 * @return void - The assigned function does not return any value.
 * @see enableDarkmode
 * @see disableDarkmode
 * @see localStorage
 */

darkmode_slider.addEventListener("change", () => {
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
});