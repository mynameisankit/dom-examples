//Constants
const SETTINGS = {
    grid: {
        cell: {
            styles: {
                height: '50px',
                width: '50px',
                backgroundColor: 'black',
                border: '1px solid gray'
            }
        }
    },
    palette: {
        styles: {
            display: 'flex'
        },
        cell: {
            styles: {
                height: '50px',
                width: '50px',
                border: '1px solid gray'
            }
        },
        colors: [
            'red',
            'white',
            'black',
            'yellow',
            'green',
            'blue',
            'pink',
            'orange',
            'violet',
            'magenta'
        ],
    },
};

class PixelArtGrid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.CONTAINER = document.createElement('div');
        this.CONTAINER.style.display = 'flex';
        this.CONTAINER.style.flexDirection = 'column';

        //Create Colouring Grid
        const grid = document.createElement('div');
        grid.style.display = 'flex';
        grid.style.flexDirection = 'column';

        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement('div');
            row.style.display = 'flex';

            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('div');

                //Add Styles
                for (let prop in SETTINGS.grid.cell.styles)
                    cell.style[prop] = SETTINGS.grid.cell.styles[prop];

                row.appendChild(cell);
            }

            grid.appendChild(row);
        }

        //Create Palette
        const palette = document.createElement('div');
        
        //Add Styles
        for (let prop in SETTINGS.palette.styles)
            palette.style[prop] = SETTINGS.palette.styles[prop];
        
        for(let color of SETTINGS.palette.colors) {            
            const cell = document.createElement('div');
            
            //Add Styles
            for (let prop in SETTINGS.palette.cell.styles)
                cell.style[prop] = SETTINGS.palette.cell.styles[prop];

            cell.style.backgroundColor = color;
            
            palette.appendChild(cell);
        }

        //State
        this.currentPaint = SETTINGS.grid.cell.styles.backgroundColor;
        this.isColoring = false;

        grid.addEventListener('mouseleave', () => this.isColoring = false);

        //Add Events
        for(let i = 0; i < palette.children.length; i++) {
            const child = palette.children[i];
            child.addEventListener('click', () => this.currentPaint = child.style.backgroundColor);
        }

        for(let i = 0; i < grid.children.length; i++) {
            const currRow = grid.children[i];
            for(let j = 0; j < currRow.children.length; j++) {
                const cell = currRow.children[j];

                cell.addEventListener('mouseover', e => {
                    e.preventDefault();

                    if(this.isColoring)
                        cell.style.backgroundColor = this.currentPaint;
                });

                cell.addEventListener('mousedown', e => {
                    e.preventDefault();

                    if(e.which === 3)
                        return;

                    this.isColoring = true;
                    cell.style.backgroundColor = this.currentPaint;
                });

                cell.addEventListener('mouseup', e => {
                    e.preventDefault();
                    this.isColoring = false;
                });
            }
        }

        this.CONTAINER.replaceChildren(...[grid, palette]);
    }
};

const container = document.querySelector('.pixel-art-grid');
container.replaceChildren(new PixelArtGrid(10, 10).CONTAINER);