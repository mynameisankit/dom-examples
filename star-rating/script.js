//Constants
const ICON_TAG = 'ion-icon';
const STAR = {
    num: 5,
    size: 'large',
    types: { 
        outline: 'star-outline',
        filled: 'star'
    },
    color: {
        filled: '#f5e10c',
        empty: 'black'
    }
};

class Rating {
    constructor(num) {
        this.CONTAINER = document.createElement('div');
        this.currentRating = this.targetRating = 0;
        this.num = num;

        //Initialize the stars
        const fragment = document.createDocumentFragment();
        for(let i = 0; i < this.num; i++) {
            const star = document.createElement(ICON_TAG);

            star.setAttribute('name', STAR.types.outline);
            star.setAttribute('size', STAR.size);
            star.style.color = STAR.color.filled;

            star.addEventListener('mouseover', () => this.targetRating = i + 1);
    
            fragment.appendChild(star);
        }
        
        this.CONTAINER.replaceChildren(fragment);

        //Method Bindings
        this.setStars = this.setStars.bind(this);

        //Events
        this.CONTAINER.addEventListener('mouseover', () => {
            this.setStars(this.targetRating);
        });

        this.CONTAINER.addEventListener('mouseleave', () => {
            this.setStars(this.currentRating);
        });

        this.CONTAINER.addEventListener('click', () => {
            if(this.currentRating === this.targetRating)
                this.currentRating = 0;
            else {
                this.currentRating = this.targetRating;
                this.setStars(this.currentRating);
            }
        });
    }

    setStars(rating) {
        for(let i = 0; i < this.num; i++) {
            const child = this.CONTAINER.children[i];
    
            if(i < rating) 
                child.setAttribute('name', STAR.types.filled);
            else if(child.getAttribute('name') === STAR.types.filled)
                child.setAttribute('name', STAR.types.outline);
        }
    }
};

const BODY = document.getElementsByTagName('body');
const ratingContainer = document.querySelectorAll('.rating-container');

ratingContainer.forEach(container => {
    const rating = new Rating(STAR.num);
    container.replaceChildren(rating.CONTAINER);
});