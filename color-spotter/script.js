const SETTINGS = {
    cell: {
        styles: {
            border: '1px solid white',
            boxSizing: 'border-box'
        },
    },
    board: {
        height: 600,
        width: 600
    }
};

function getRandomColors() {
    const ratio = 0.618033988749895;

    const hue = (Math.random() + ratio) % 1;
    const saturation = Math.round(Math.random() * 100) % 85;
    const lightness = Math.round(Math.random() * 100) % 85;

    const color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    const oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    };
}

function getRandomNumber(limit) {
    return Math.floor(((Math.random() * 10 * limit) % limit));
}

class ColorSpotter {
    constructor() {
        const CONTAINER = document.createElement('div');
        CONTAINER.style.border = '5px solid black';
        CONTAINER.style.backgroundColor = 'gray';

        this.CONTAINER = CONTAINER;
        this.currOdd = { row: 0, col: 0 };
        this.timer = null;
        this.score = 0;
        this.size = 4;

        //Method Bindings
        this.createBoard = this.createBoard.bind(this);
        this.clearTimers = this.clearTimers.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.createBoard();

        this.CONTAINER.addEventListener('click', e => {
            e.preventDefault();

            if (this.timer !== null)
                return;

            this.CONTAINER.className = 'shake';
            this.timer = setTimeout(() => {
                this.CONTAINER.className = '';
                this.timer = null;
            }, 800);
        });
    }

    clearTimers() {
        if (this.timer !== null)
            clearInterval(this.timer);

        this.timer = null;
    }

    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();

        e.target.removeEventListener('click', this.handleClick);
        this.score++;
        this.size++;

        this.createBoard();

        return;
    }

    createBoard() {
        //Get Color
        const { color, oddColor } = getRandomColors();

        const fragment = document.createDocumentFragment();

        this.currOdd = {
            row: getRandomNumber(this.size),
            col: getRandomNumber(this.size)
        };

        const score = document.createElement('div');
        score.appendChild(document.createElement('p'));
        score.children[0].innerHTML = `Score : ${this.score}`;
        score.children[0].style.textAlign = 'center';
        fragment.appendChild(score);

        for (let i = 0; i < this.size; i++) {
            const currRow = document.createElement('row');
            currRow.style.display = 'flex';

            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement('div');

                for (let prop in SETTINGS.cell.styles)
                    cell.style[prop] = SETTINGS.cell.styles[prop];

                cell.style.height = `${Math.floor(SETTINGS.board.height / this.size)}px`;
                cell.style.width = `${Math.floor(SETTINGS.board.width / this.size)}px`;

                if (i === this.currOdd.row && j === this.currOdd.col) {
                    cell.style.backgroundColor = oddColor;

                    //Add Event to odd cell
                    cell.addEventListener('click', this.handleClick);
                }
                else
                    cell.style.backgroundColor = color;

                currRow.appendChild(cell);
            }

            fragment.appendChild(currRow);
        }

        this.CONTAINER.replaceChildren(fragment);

        return;
    }
}

const container = document.querySelector('.color-spotter');
container.replaceChildren(new ColorSpotter().CONTAINER);