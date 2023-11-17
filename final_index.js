const clickEl = document.querySelectorAll('.cell');

const singPlayer1 = 0;
const singPlayer2 = 1;
const pointWin = 3;
const renderCirclePictureHTML = `
<img src="./assets/img/circle.png" class="player1">
`
const renderMultiPictureHTML =`
    <img src="./assets/img/multi.png" class="player1">
`
const state = {
    stop: false,
    flag: false,
    arry:[
        [,,],
        [,,],
        [,,]
    ],
    pointPlayer1: 0,
    pointPlayer2: 0,
}

// render
const render = (clickedEl, direction = '') => {
    const selectWraper = clickedEl.closest('.wraper');
    if (direction === 'Left' || direction === 'Right') {
        selectWraper.classList.add(`winerDiameter${direction}`);
    } else if (direction !== 'column') {
        const hilightRow = clickedEl.closest('.row');
        hilightRow.classList.add('winer');
    } else {
        const columnNum = +event.target.className.substr(-1);
        if ( columnNum === 1) {
            selectWraper.classList.add(`winerColumn${columnNum}`);
            return;
        } else if (columnNum === 2) {
            selectWraper.classList.add(`winerColumn${columnNum}`);
            return;
        } else if ( columnNum === 3) {
            selectWraper.classList.add(`winerColumn${columnNum}`);
            return;
        }
    }
}

// reset points
const resetPoints = () => {
    state.pointPlayer1 = 0;
    state.pointPlayer2 = 0;
}

// check cell
const checkCell = (i, j) => {
    if (state.arry[i][j] === undefined) {
        return 0;
    } else {
        return 1;
    }
}

// add point player
const addPoints = (i, j) => {
    if (checkCell(i,j) === 1) {
        if (state.arry[i][j] === singPlayer1) {
            state.pointPlayer1++;
        } else if (state.arry[i][j] === singPlayer2) {
            state.pointPlayer2++;
        }
    } else {
        resetPoints();
    }
}

// search in row Function
const searchRow = clickedEl => {
    for (let i = 0; i < state.arry.length; i++){
        for (let j = 0; j < state.arry.length; j++) {
            addPoints(i, j);
        }
        if (state.pointPlayer1 === pointWin){
            render(clickedEl);
            state.stop = !state.stop;
        } else if (state.pointPlayer2 === pointWin){
            render(clickedEl);
            state.stop = !state.stop;
        } else {
            resetPoints();
        }
    }
    resetPoints();
}

// search in column Function
const searchColumn = clickedEl => {

    for (let j = 0; j < state.arry.length; j++) {
        for (let i = 0; i < state.arry.length; i++) {
            addPoints(i, j);
        }
        if (state.pointPlayer1 === pointWin) {
            render(clickedEl, 'column');
            state.stop = !state.stop;
        } else if (state.pointPlayer2 === pointWin) {
            render(clickedEl, 'column');
            state.stop = !state.stop;
        } else {
            resetPoints();
        }
    };
    resetPoints();
}

// search left Diameter in function
const searchLeftDiameter = clickedEl => {
    for (let i = 0; i < state.arry.length; i++) {
        addPoints(i, i);
    }
    if (state.pointPlayer1 === pointWin) {
        render(clickedEl, 'Left');
        state.stop = !state.stop;
    } else if (state.pointPlayer2 === pointWin) {
        render(clickedEl, 'Left');
        state.stop = !state.stop;

    } else {
        resetPoints();
    }
    resetPoints();
}

// search right Diameter in function
const searchRightDiameter = clickedEl => {
    for (let i = 2, j = 0; i >= 0; i--, j++) {
        addPoints(i, j);
    }
    if (state.pointPlayer1 === pointWin ) {
        render(clickedEl, 'Right');
        state.stop = !state.stop;
    } else if (state.pointPlayer2 === pointWin ) {
        render(clickedEl, 'Right');
        state.stop = !state.stop;
    } else {
        resetPoints();
        return;
    }
    resetPoints();
}

// main Search
const mainSearch = clickedEl => {
    // for search in row
    searchRow(clickedEl);
        
    // for search in column
    searchColumn(clickedEl);
            
    // for search in left Diameter
    searchLeftDiameter(clickedEl);
            
    // for search in right Diameter
    searchRightDiameter(clickedEl);
}

const clickHandler = event => {
    if (state.stop === true) {
        return;
    }
    const clickedEl = event.target;
    const columnNum = (+event.target.className.substr(-1,1)) - 1;
    const rowNum = (+clickedEl.closest('.row').className.substr(-1,1)) - 1;
    state.flag = !state.flag;
    
    if (state.flag === true) {

        // for player 1 with multiple sign
        state.arry[rowNum][columnNum] = singPlayer1;
        clickedEl.insertAdjacentHTML('beforeend', renderMultiPictureHTML);
        mainSearch(clickedEl);
    } else {

        // for player 2 with circle sign
        state.arry[rowNum][columnNum] = singPlayer2;
        clickedEl.insertAdjacentHTML('beforeend', renderCirclePictureHTML);
        mainSearch(clickedEl);
    }
}

clickEl.forEach(cell => {
    cell.addEventListener('click', clickHandler);
});