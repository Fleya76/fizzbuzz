/** Constant related to the Fizz Buzz logic */
const FIZZ_CLASS = 'fizz';
const BUZZ_CLASS = 'buzz';
const FIZZBUZZ_CLASS = 'fizzBuzz';

/** Constant related to the createCards params */
const CONTAINER_ID = "content"
const ITEMS_TO_ADD_PER_ITERATION = 100;

/** Variable to count the total of items */
let cardsNumber = 1;

/** 
 * Description: Function to know if the number from param can be divided by 3, 5 or both. 
 * Param: number should be a Number.
 * Return: If this number can be divided by the rules defined above, return a string otherwise returns the number.
*/
const fizzBuzzFilter = (number) => {
    if (number % 3 === 0 && number % 5 === 0) {
        return FIZZBUZZ_CLASS;
    } else if (number % 3 === 0) {
        return FIZZ_CLASS;
    } else if (number % 5 === 0) {
        return BUZZ_CLASS;
    }
    return number;
}

/** 
 * Description: Function to create some cards in the container with the FizzBuzz rules. 
 * Params: container should be an existing ID in the HTML, shouldBeAdded is the number of items to create, and startedBy is the current number of items in the HTML.
 * Return: The total of the current items after modification or an error if the params is wrong.
*/
const createCards = ({ container = CONTAINER_ID, shouldBeAdded = ITEMS_TO_ADD_PER_ITERATION, startedBy = 1 }) => {
    const parentDiv = document.getElementById(container);

    // Error handler from parameters
    if(!parentDiv) {
        console.error(`This container with the ID "${container}" doesn't exist in the HTML, please verify if this value is correct.`)
        return;
    } 
    if(shouldBeAdded < 0) {
        console.error(`The number of items to add per iteration (shouldBeAdded) must be a positive number but the set value is ${shouldBeAdded}.`)
        return;
    }

    // Loop to create card 
    const totalCount = startedBy + shouldBeAdded;
    for (let index = startedBy; index < totalCount; index++) {
        const newCard = document.createElement('div');
        newCard.className = 'card';
        // call fizzBuzzFilter function to put the fizzBuzz rules.
        const parsedNumberByFizzBuzz = fizzBuzzFilter(index);

        // If fizzBuzzFilter return a string (fizz|buzz|fizzBuzz) add this value in the card class to have a better design.
        if (typeof parsedNumberByFizzBuzz === 'string') {
            newCard.classList.add(parsedNumberByFizzBuzz);
        }
        newCard.textContent = parsedNumberByFizzBuzz;
        parentDiv.appendChild(newCard);
    }

    return totalCount;
}

/** 
 * Description: Function to know if we have a scrollBar in this page. 
 * Return: A boolean.
*/
const hasScrollbar = () => {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    return bodyHeight > windowHeight;
}


/** 
 * Description: Loop to create the first cards if the page is empty. Check if container id exists to avoid infinite loop.
*/
while (!hasScrollbar() && document.getElementById(CONTAINER_ID)) {
    cardsNumber = createCards({ startedBy: cardsNumber });
}

/** 
 * Description: EventListener connected to the scroll logic to add some new cards and have an infinite gallery.
 */
window.addEventListener('scroll',  () => {
    // If the visible height of the window + the number of pixel scrolled is upper than the total height of the body we can determinate that we are at the bottom.
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        cardsNumber = createCards({ startedBy: cardsNumber });

        /** Easter Egg - Thanks to read my code, have a good day ;) */
        if(document.body.offsetHeight > 5000 && document.body.offsetHeight < 5500){
            alert("Le barbecue, en gros, c'est un appareil qui te permet de manger des saucisses pratiquement crues mais avec les doigts bien cuits.")
        }
    }
});