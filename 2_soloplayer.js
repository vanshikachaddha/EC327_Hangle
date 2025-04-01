/**
 * Adds click event listeners to buttons to handle page redirection.
 * <p>
 * This code assigns event listeners to 3 different buttons with IDs <code>button1</code>, <code>button2</code> and <code>button3</code>.
 * When clicked, these buttons redirect the user to specific pages:
 * </p>
 * <ul>
 *     <li><u>button 1:</u> Redirects the user to <code>3_easymode.html</code>.</li>
 *     <li><u>button 2:</u> Redirects the user to <code>3_medmode.html</code>.</li>
 *     <li><u>button 3:</u> Redirects the user to <code>3_hardmode.html</code>.</li>
 * </ul>
 *
 * @example:
 * <pre>
 * <button id="button1">Easy</button>
 * <button id="button2">Medium</button>
 * <button id="button3">Hard</button>
 * </pre>
 *
 * @event click - Triggered when either button is clicked.
 * @return void - The assigned function does not return any value.
 * @see window.location
 * @see document.getElementById
 */

document.getElementById('button1').addEventListener('click', () => {
    window.location.href = '3_easymode.html';
});

document.getElementById('button2').addEventListener('click', () => {
    window.location.href = '3_medmode.html'; 
});

document.getElementById('button3').addEventListener('click', () => {
    window.location.href = '3_hardmode.html';
});