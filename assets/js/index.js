import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
window.addEventListener("DOMContentLoaded", event => {

    // create squares main area
    const mainGrid = document.createElement('div');
    mainGrid.setAttribute('class', 'grid');
    document.body.appendChild(mainGrid);

    // implement game
    game(event);

    // add reset button
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('id', 'reset-game');
    buttonElement.innerText = 'Reset Game';
    const h1Element = document.getElementsByTagName('h1')[0];
    h1Element.after(buttonElement);

    // add reset button listener
    buttonElement.addEventListener('click', event => {
        window.location.reload();
    });
});


function game(event) {
    const mainGrid = document.getElementsByClassName('grid')[0];
    // add each square in the main area
    for (let i = 0; i < board.numRows; i += 1) {
        for (let j = 0; j < board.numCols; j += 1) {
            const cell = document.createElement('div');
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            cell.setAttribute('class', 'cell');
            cell.setAttribute('id', `${i}${j}`);
            // cell.style.gridArea = `${i + 1} / ${j + 1}`;
            mainGrid.appendChild(cell);
        }
    }

    // click square and play the game
    const clickSquare = event => {
        if (!event.target.dataset.row) {
            return
        }
        const cellValue = board.makeHit(event.target.dataset.row, event.target.dataset.col);

        if (cellValue) {
            event.target.style.backgroundColor = 'green';
            event.target.innerText = cellValue;
        } else {
            event.target.style.backgroundColor = 'red';
        }

        if (board.isGameOver()) {
            const winningMessageElement = document.createElement('div');
            winningMessageElement.innerText = 'YOU WIN!';
            const h1Element = document.getElementsByTagName('h1')[0];
            h1Element.after(winningMessageElement);
            mainGrid.removeEventListener('click', clickSquare);
        }
    }
    mainGrid.addEventListener("click", clickSquare);
}
