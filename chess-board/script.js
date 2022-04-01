const SETTINGS = {
    cell: {
        color1: 'white',
        color2: 'black',
        highlighted: 'orange',
        styles: {
            height: '50px',
            width: '50px',
            border: '1px solid black',
        }
    },
    grid: {
        styles: {
            display: 'flex',
            flexDirection: 'column',
        },
    }
};

function applyStyles(elem, stylesheet) {
    for (let prop in stylesheet)
        elem.style[prop] = stylesheet[prop];

    return;
}

class ChessBoard {
    constructor() {
        this.CONTAINER = document.createElement('div');

        applyStyles(this.CONTAINER, SETTINGS.grid.styles);

        for (let i = 0; i < 8; i++) {
            const row = document.createElement('div');
            row.style.display = 'flex';

            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                const backgroundColor = ((i + j) % 2 === 0) ? SETTINGS.cell.color1 : SETTINGS.cell.color2;
                applyStyles(cell, { ...(SETTINGS.cell.styles), backgroundColor });
                row.appendChild(cell);
            }

            this.CONTAINER.append(row);
        }

        //Method Bindings
        this.resetBoard = this.resetBoard.bind(this);

        //Add Events
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const [rowIdx, colIdx] = [i, j];
                const cell = this.CONTAINER.children[i].children[j];

                cell.addEventListener('click', () => {
                    this.resetBoard();

                    const dir = [[1, 1], [-1, -1], [-1, 1], [1, -1]];

                    function isValid(row, col) {
                        return (row >= 0 && row < 8 && col >= 0 && col < 8);
                    }

                    for (let currDir of dir) {
                        let [currRow, currCol] = [rowIdx, colIdx];

                        while (isValid(currRow, currCol)) {
                            const currCell = this.CONTAINER.children[currRow].children[currCol];
                            currCell.style.backgroundColor = SETTINGS.cell.highlighted;

                            currRow += currDir[0];
                            currCol += currDir[1];
                        }
                    }
                });
            }
        }
    }

    resetBoard() {
        for (let i = 0; i < 8; i++) {
            const row = this.CONTAINER.children[i];
            for (let j = 0; j < 8; j++) {
                const cell = this.CONTAINER.children[i].children[j];
                const backgroundColor = ((i + j) % 2 === 0) ? SETTINGS.cell.color1 : SETTINGS.cell.color2;
                applyStyles(cell, { ...(SETTINGS.cell.styles), backgroundColor });
            }
        }

        return;
    }
}

const container = document.querySelector('.chess-board');
container.replaceChildren(new ChessBoard().CONTAINER);