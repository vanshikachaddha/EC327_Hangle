/**
 * Adds click event listeners to buttons to handle page redirection.
 * <p>
 * This code assigns event listeners to two different buttons with IDs <code>button1</code> and <code>button2</code>.
 * When clicked, these buttons redirect the user to specific pages:
 * </p>
 * <ul>
 *     <li><u>button 1:</u> Redirects the user to <code>3_multihangman.html</code>.</li>
 *     <li><u>button 2:</u> Redirects the user to <code>3_multihangle.html</code>.</li>
 * </ul>
 *
 * @example:
 * <pre>
 * <button id="button1">Hangman</button>
 * <button id="button2">Hangle</button>
 * </pre>
 *
 * @event click - Triggered when either button is clicked.
 * @return void - The assigned function does not return any value.
 * @see window.location
 * @see document.getElementById
 */
document.getElementById("button1").addEventListener("click", () => {
    window.location.href = '3_multihangman.html'; 
});

document.getElementById('button2').addEventListener('click', () => {
    window.location.href = '3_multihangle.html';
});
