/**
 * OWNER: Jay Shukla
 * EMAIL: jayshukla23@gmail.com
 */

var keyList = new Map();
/* 
    Map Description 
    Keys: 1, 2, 3, 4, 5, 6, 7, 8, 9, *, 0, #

    Values: Object {
                multi: the key can feed in multiple characters
                charset: the list of characters that the key can feed
                clicks: number of times they key is pressed
            }
*/

// Initializing key objects
keyList.set('1', {
    type: 'multi',
    charset: '1!@#$%^&',
    clicks: 0
});
keyList.set('2', {
    type: 'multi',
    charset: '2abc',
    clicks: 0
});
keyList.set('3', {
    type: 'multi',
    charset: '3def',
    clicks: 0
});
keyList.set('4', {
    type: 'multi',
    charset: '4ghi',
    clicks: 0
});
keyList.set('5', {
    type: 'multi',
    charset: '5jkl',
    clicks: 0
});
keyList.set('6', {
    type: 'multi',
    charset: '6mno',
    clicks: 0
});
keyList.set('7', {
    type: 'multi',
    charset: '7pqrs',
    clicks: 0
});
keyList.set('8', {
    type: 'multi',
    charset: '8tuv',
    clicks: 0
});
keyList.set('9', {
    type: 'multi',
    charset: '9wxyz',
    clicks: 0
});
keyList.set('0', {
    type: 'multi',
    charset: '0 ',
    clicks: 0
});
keyList.set('*', {
    type: 'single',
    charset: '*',
    clicks: 0
});
keyList.set('#', {
    type: 'single',
    charset: '#',
    clicks: 0
});

// Global declarations
var screenInput, enteredChars, resetClicks;
var previousKey = null;

// Assigning event handlers
var assignHandlers = function() {
    var keys = document.querySelectorAll('.key');

    for(var i=0; i<keys.length; i++) {
        // Adding handler to onclick event for each key
        keys[i].addEventListener('click', readInput);                       
    }

    // Adding handler for onkeyup event to accept keyboard entry
    window.addEventListener('keyup', function(event){        
        for(var i=0; i<keys.length; i++) {
            // Comparing the key button value to the key pressed on the keyboard
            if(keys[i].value == event.key) {
                keys[i].click(); // Triggering the click event on button
            }                                           
        }
        // Check for Backspace key press
        if(event.keyCode == 8) { // 8 is key code for Backspace
            // Removing last character of string present in screen           
            document.querySelector('#result').value = document.querySelector('#result')                                                                 .value
                                                      .substring(0, document.querySelector('#result').value.length - 1);
            // Updating the hidden field
            document.querySelector('#enteredChars').value = document.querySelector('#result').value;
        }
    });
}

// Reading input
var readInput = function(event) {

    // Clearing the timeout duration for function resetClicks()
    clearTimeout(resetClicks);

    // Wait for 1000ms (1s) and then request new character
    resetClicks = setTimeout(defaultClicks, 1000);

    var keyVal = event.target.value; // Finding the key which was pressed

    var screen = document.querySelector('#result'); // The text box where characters will be displayed
    screenInput = screen.value; // Taking the characters present on the text box

    var currentKey = keyList.get(keyVal); // Fetch the right map entry

    // Check whether a different button is pressed
    if(previousKey!=keyVal) {
        defaultClicks(); // Reset the value of clicks for all keys
        previousKey = keyVal; // Update previous key
    }

    if(currentKey.clicks == 0) {
        keepEnteredChars(); // Backup of the entered string from the text box
    }        
    typeCharacter(currentKey, screen, enteredChars); // Type the respective character/digit
    
}

/* 
    Typing out the character
    Parameters: 
        key: the key which was pressed/clicked
        screen: the input (text box) element
        input: the string to which new characters will be appended to

*/
function typeCharacter(key, screen, input) {     
    // Multi character keys
    if(key.type == 'multi') {        
        // Iterating through the list of characters for that key
        var currChar = key.charset[key.clicks % key.charset.length];
        key.clicks++; // Updating number of clicks for the key
        screen.value = input + currChar; // Displaying it on the input field
    }
    // Single character keys
    else { 
        screen.value += key.charset; // Displaying it on the input field
        keepEnteredChars(); // Updating the backup string too
    }
}

// Back up of the entered characters/digits from input field
function keepEnteredChars() {    
    document.querySelector('#enteredChars').value = screenInput; // Updating the hidden field
    enteredChars = screenInput; // Updating the global variable
}

// Reset the number of clicks to zero
function defaultClicks() {    
    // Iterating through the key map values
    for(key of keyList.values()) {        
        key.clicks = 0;  // Reset the number of clicks for each key  
    }
    keepEnteredChars(); // Update the hidden field, and the global variable
}