import { sample_word } from "./sampleWordBank.js";
let currentword;
let new_hint;

const getRandomWord = () => {
    const { word, hint } = sample_word[Math.floor(Math.random() * sample_word.length)];
    new_hint = hint.replace(/\.$/, ""); // Process hint if necessary
    currentword = word.toUpperCase();
};

// Test to ensure getRandomWord sets correct word and hint
getRandomWord(); 

if (
    sample_word.some(entry => entry.word.toUpperCase() === currentword) &&
    sample_word.some(entry => entry.hint.replace(/\.$/, "") === new_hint)
)  {
    console.log("Test Passed: getRandomWord function works!");
} 
else if (sample_word.some(entry => entry.word.toUpperCase() === currentword) &&
           sample_word.some(entry => entry.hint.replace(/\.$/, "") !== new_hint))
        {
    console.log("Test Failed: Word matches however hint doesn't match");
}
else if (sample_word.some(entry => entry.word.toUpperCase() !== currentword) &&
           sample_word.some(entry => entry.hint.replace(/\.$/, "") === new_hint))
        {
    console.log("Test Failed: Word doesn't match however hint matches");
}
else {
    console.log("Test Failed: Word doesn't match and hint doesn't match");
}
