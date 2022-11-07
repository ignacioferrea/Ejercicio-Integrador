function Card(heading, description, image) {
    this.heading = heading,
    this.description = description,
    this.image = image

    this.appendTo = function () {
        let card = document.createElement('a')
        card.classList.add('card')
        card.href = 'https://sony.com'
        
        card.innerHTML = 
        `
            <article class="card__article">
                <div class="card__image-container">
                    <img
                        class="card__image"
                        src="${image}"
                        alt="${heading}"
                    />
                </div>
                <div class="card__content">
                    <h2 class="card__heading">${heading}</h2>
                    <div class="card__description">
                        <p>${description}</p>
                    </div>
                </div>
            </article>
        ` 
    }
}

const elemCardsContainer = document.getElementsByClassName('cards-container')[0]
console.log(elemCardsContainer)


const card1 = new Card(
    'Celular', 
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    'img/productos/apple-iphone-11-pro-max.jpg'
)

const card2 = new Card(
    'Drone', 
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    'img/productos/dji-mavic-2-pro.jpg'
)

console.log(card1)
console.log(card2)

