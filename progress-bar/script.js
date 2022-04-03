const SETTINGS = {
    container: {
        style: {
            width: '400px',
            height: '25px',
            backgroundColor: 'gray'
        },
    },
    progressBar: {
        style: {
            width: '0%',
            height: '100%',
            backgroundColor: 'orange'
        },
    }
};

function appleStyles(elem, stylesheet) {
    for(let prop in stylesheet)
        elem.style[prop] = stylesheet[prop];

    return;
}

class ProgressBar {
    constructor(simulationTime) {
        this.simulationTime = simulationTime;

        this.CONTAINER = document.createElement('div');
        appleStyles(this.CONTAINER, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            overflow: 'hidden'
        });
        
        this.progressBar = document.createElement('div');
        appleStyles(this.progressBar, SETTINGS.progressBar.style);

        this.inQueue = 0;

        //Method Bindings
        this.createButton = this.createButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.simulateProgressBar = this.simulateProgressBar.bind(this);

        const buttonContainer = document.createElement('div');
        appleStyles(buttonContainer, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });

        const progressBarContainer = document.createElement('div');
        appleStyles(progressBarContainer, SETTINGS.container.style);
        progressBarContainer.replaceChildren(this.progressBar);

        buttonContainer.appendChild(this.createButton());
        this.CONTAINER.replaceChildren(buttonContainer, progressBarContainer);
    }

    createButton() {
        const button = document.createElement('button');
        button.innerHTML = `Run : ${this.inQueue}`;

        button.addEventListener('click', this.handleClick);

        return button;
    }

    simulateProgressBar() {
        const progressBar = this.progressBar;

        const timerId = setInterval(() => {
            const currWidth = parseInt(progressBar.style.width);

            if(currWidth >= 100) {
                this.inQueue--;
                clearInterval(timerId);

                const newButton = this.createButton();
                this.CONTAINER.children[0].replaceChildren(newButton);
                progressBar.style.width = '0%';

                if(this.inQueue)
                    this.simulateProgressBar();

                return;
            }

            progressBar.style.width = `${currWidth + (5/this.simulationTime)}%`;
        }, 100);

        return;
    }

    handleClick() {
        this.inQueue++;

        //If there are no bars in progress, then start
        //a new one
        if(this.inQueue === 1) 
            this.simulateProgressBar();
        
        const newButton = this.createButton();
        this.CONTAINER.children[0].replaceChildren(newButton);
        
        return;
    }
};

const container = document.querySelector('.progress-bar');
container.replaceChildren(new ProgressBar(1).CONTAINER);