/* 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”). */
const baseURL = "https://deckofcardsapi.com";
axios
  .get(`${baseURL}/api/deck/new/draw/?count=1`)
  .then((resp) => {
    console.log('value',resp.data.cards[0].value);
    console.log('suit',resp.data.cards[0].suit);
  })
  .catch((err) => {
    console.log(err);
  });

/* 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
Once you have the card, make a request to the same API to get one more card from the same deck. */
const drawnCards = {};
axios
.get(`${baseURL}/api/deck/new/draw/?count=1`)
.then(resp => {
    drawnCards[`${resp.data.cards[0].value}`] = resp.data.cards[0].suit;
    const deckId = resp.data.deck_id
    return axios.get(`${baseURL}/api/deck/${deckId}/draw/?count=1`)
})
.then(resp => {
    drawnCards[`${resp.data.cards[0].value}`] = resp.data.cards[0].suit;
    for (const [key, value] of Object.entries(drawnCards)) {
        console.log(`value: ${key}, suit: ${value}`);
    }
})
.catch(err => console.log(err));

/* 3. Build an HTML page that lets you draw cards from a deck. 
When the page loads, go to the Deck of Cards API to create a new deck, 
and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck. */
let deckID;
const cardBtn = document.querySelector('.card-btn');
const cardPile = document.querySelector('.card-pile');

document.addEventListener("DOMContentLoaded", (e) => {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => deckID = resp.data.deck_id)
    .catch(err => console.log(err));
    startDraw();
});

function startDraw() {
    const btn = document.createElement('button');
    btn.innerText = 'Draw Card';
    cardBtn.append(btn);
    btn.addEventListener('click', drawCard)
}

function drawCard() {
    axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then(resp => {
        const card = document.createElement('img');
        card.setAttribute("src", resp.data.cards[0].image);
        const ranNum = Math.random();
        const deg = ranNum < 0.5 ? ranNum * -30 : ranNum * 30;
        card.setAttribute("style",`transform:rotate(${deg}deg);`);
        cardPile.append(card);
    })
    .catch(err => console.log(err));
}

