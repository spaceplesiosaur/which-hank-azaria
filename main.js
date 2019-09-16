var player1Input = document.getElementById('player1Input');
var enterGameButton = document.getElementById('enterGameButton');
var enterGameLabel = document.getElementById('enterGameLabel');
var welcomeHeaderText = document.getElementById('welcomeHeaderText');
var welcomePageScreen = document.getElementById('welcomePageScreen');
var enterPageScreen = document.getElementById('enterPageScreen');
var playGameButton = document.getElementById('playGameButton');
var gameBoardScreen = document.getElementById('gameBoardScreen');
var cardTable = document.getElementById('cardTable');
var matchCounterPlayer1 = document.getElementById('matchCounterPlayer1');
var buttonParent = document.getElementById('buttonParent');
var winnerScreen = document.getElementById('winnerScreen');
var columnNamePlayer1 = document.getElementById('columnNamePlayer1');
var winnerHeader = document.getElementById('winnerHeader');
var winnerTime = document.getElementById('winnerTime');
var picturesArray = ['./images/Blue-Raja-Mystery-Men-Hank-Azaria-b.jpg', './images/hank-agador.jpg', './images/hank-comic-book.gif', './images/Hank-cradle.jpg', './images/hank-david.jpg', './images/hank-smufs.jpg']
// var cardsArray = [];
var deckArray = [];

// player1Input.addEventListener('keyup', checkNameField);
// playGameButton.addEventListener('click', enterGameButtonRules);
enterGameButton.addEventListener('click', onEnterGameButton);
playGameButton.addEventListener('click', onPlayGame);
// playGameButton.addEventListener('click', openGameBoard);
// playGameButton.addEventListener('click', instantiateNewCards);
// playGameButton.addEventListener('click', instantiateMatchCards);
// playGameButton.addEventListener('click', instantiateDeck);
cardTable.addEventListener('click', flipCard);
// playGameButton.addEventListener('click', displayCards);



function onEnterGameButton() {
  console.log("onEnter ran");
  checkNameField();
  // enterGameButtonRules();
  fillPlayerName();
  // openWelcomeScreen();
}

function fillPlayerName() {
  console.log(player1Input.value);
  welcomeHeaderText.innerText = `WELCOME ${player1Input.value.toUpperCase()} AND PLAYER 2 NAME!`;
  columnNamePlayer1.innerText = `${player1Input.value.toUpperCase()}`;
  winnerHeader.innerText = `CONGRATULATIONS, ${player1Input.value.toUpperCase()} WINS!`

}

function checkNameField() {
  console.log("checkNameField ran");
  if (player1Input.value !== "") {
    // enterGameButton.disabled = false;
    openWelcomeScreen();
  } else {
    // enterGameButton.disabled = true;
    enterGameLabel.classList.remove('hidden');
    // enterGameButton.innerText = "Please enter a name";
    // enterGameButton.classList.add('.enterPage-button-playGameButton-error')
  }
}

// function enterGameButtonRules() {
//   if (enterGameButton.disabled === true) {
//     enterGameLabel.classList.remove('hidden');
//   }
// }

function openWelcomeScreen() {
  welcomePageScreen.classList.remove('hidden');
  enterPageScreen.classList.add('hidden');

}

// function onPlayGame() {
//   openGameBoard();
//   instantiateNewCards()
//   displayCards(instantiateNewCards());
// }
function onPlayGame() {
  openGameBoard();
  instantiateDeck();
  instantiateNewCards();
  instantiateMatchCards();
  // shuffleDeck(cardsArray);
  // shuffleDeck(deckArray[0].cards);
  deckArray[0].shuffle();
  displayCards();
  // instantiateDeck();
}

function openGameBoard() {
  gameBoardScreen.classList.remove('hidden');
  welcomePageScreen.classList.add('hidden');
}

function instantiateNewCards() {
  var matchInfo = 0;
  for (var cardNumber = 0; cardNumber < 5; cardNumber++) {
    matchInfo = matchInfo + 1;
    var card = new Card(matchInfo, picturesArray[matchInfo-1], shuffleSkews());
    deckArray[0].cards.push(card);
  }
}

// function instantiateNewCards() {
//   var matchInfo = 0;
//   for (var cardNumber = 0; cardNumber < 5; cardNumber++) {
//     matchInfo = matchInfo + 1;
//     var card = new Card(matchInfo, picturesArray[matchInfo-1], shuffleSkews());
//     cardsArray.push(card);
//   }
// }

function instantiateMatchCards() {
  var matchInfo = 0;
  for (var cardNumber = 0; cardNumber < 5; cardNumber++) {
    matchInfo = matchInfo + 1;
    var card = new Card(matchInfo, picturesArray[matchInfo-1], shuffleSkews());
    deckArray[0].cards.push(card);
    // displayCards(card);
  }
}

// function instantiateMatchCards() {
//   var matchInfo = 0;
//   for (var cardNumber = 0; cardNumber < 5; cardNumber++) {
//     matchInfo = matchInfo + 1;
//     var card = new Card(matchInfo, picturesArray[matchInfo-1], shuffleSkews());
//     cardsArray.push(card);
//     // displayCards(card);
//   }
// }

// function shuffleDeck(array) {
//   for (var i = array.length -1; i >= 0; i--) {
//     var randomIndex = Math.floor(Math.random() * (i + 1));
//     var chosenArrayItem = array[i];
//     var randomArrayItem = array[randomIndex];
//     array[i] = randomArrayItem;
//     array[randomIndex] = chosenArrayItem;
//   }
// }
//Fisher-Yates Shuffle

function shuffleSkews() {
  var randomSkew = Math.floor(Math.random() * 4);
  console.log(randomSkew);
  if (randomSkew === 0) {
    return 'skewLeft';
  }
  if (randomSkew === 1) {
    return 'skewRight';
  }
  if (randomSkew === 2) {
    return 'slightSkew';
  }
  if (randomSkew === 3) {
    return 'noSkew';
  }
}

function instantiateDeck() {
  var deck = new Deck([], [], [], Date.now());
  deckArray.push(deck);
}

// function instantiateDeck() {
//   var deck = new Deck(cardsArray, [], []);
//   deckArray.push(deck);
// }

function displayCards() {
  for (var i = 0; i < deckArray[0].cards.length; i++) {
    cardTable.insertAdjacentHTML('beforeend', htmlToAddCards(deckArray[0].cards[i]));
  }

}

// function displayCards() {
//   for (var i = 0; i < cardsArray.length; i++) {
//     cardTable.insertAdjacentHTML('beforeend', htmlToAddCards(cardsArray[i]));
//   }
//
// }

function flipCard(event) {
  console.log(event);
  if (!event.target.class === 'figure-card-image') {
    return
  }
  if (deckArray[0].selectedCards.length === 2) {
    return;
  }
  var cardHTMLId = parseInt(event.target.parentNode.parentNode.id);
  var cardToFlip = findCardInfoById(cardHTMLId);
  cardToFlip.flipped = true;
  flippedRules(cardToFlip, event);
  matchCards();
  console.log("SELECTED CARDS", deckArray[0].selectedCards);
  console.log("MATCHED CARDS ARRAY", deckArray[0].matchedCards);
  setTimeout(flipCardBack, (2 * 1000), cardToFlip, event);
  setTimeout(flippedRules, (2.1 * 1000), cardToFlip, event);
  setTimeout(updateMatchCount, (2.2 * 1000));
  openWinnerScreen();
  // event.target.src = cardToFlip.image;
}

function flippedRules(card, eventSpot) {
  if (card.flipped === true) {
    eventSpot.target.src = card.image;
    addToSelected(card);
  } else {
    eventSpot.target.src = "./images/hankAzariaBWphoto.jpg"
    removeFromSelected();
    //need to be more sophisticated than a pop?
  }
}

function matchCards() {
  if ((deckArray[0].selectedCards.length % 2) === 0) {
    deckArray[0].checkSelectedCards();
  }
}

function updateMatchCount() {
  matchCounterPlayer1.innerText = `${deckArray[0].matches/2}`;
}

function findCardInfoById(htmlId) {
  for (var i = 0; i < deckArray[0].cards.length; i++) {
    if (deckArray[0].cards[i].matchInfo === htmlId) {
      return deckArray[0].cards[i];
    }
  }
}

// function findCardInfoById(htmlId) {
//   for (var i = 0; i < cardsArray.length; i++) {
//     if (cardsArray[i].matchInfo === htmlId) {
//       return cardsArray[i];
//     }
//   }
// }

function addToSelected(card) {
  deckArray[0].selectedCards.push(card);
}

function removeFromSelected() {
  deckArray[0].selectedCards.pop();
}

// function limitTwoCards() {
//   if (deckArray[0].selectedCards.length === 2) {
//     return;
//   }
// }

function flipCardBack(card, eventSpot) {
  if (card.matched === true) {
    eventSpot.target.classList.add('hidden');
    card.flipped = false;
  } else {
    card.flipped = false;
  }
}

function openWinnerScreen() {
  if (deckArray[0].matches/2 === 5) {
    winnerScreen.classList.remove('hidden');
    gameBoardScreen.classList.add('hidden');
    deckArray[0].endTime = Date.now();
    deckArray[0].totalTime = (deckArray[0].endTime - deckArray[0].startTime);
    winnerTime.innerHTML = `It took you ${deckArray[0].totalTime/60} minutes and ${deckArray[0].totalTime%60} seconds.`
  }
}

function htmlToAddCards(card) {
  return `<section class="cardTable-section-cardContainer ${card.skewClass}" id="${card.matchInfo}">
    <figure class="cardContainer-figure-card">
      <img src="./images/hankAzariaBWphoto.jpg" class="figure-card-image"></img>
    </figure>
  </section>`
}

// <section class="cardTable-section-cardContainer">
//   <figure class="cardContainer-figure-card">
//     <img src="./images/hankAzariaBWphoto.jpg" class="figure-card-image"></img>
//   </figure>
// </section>
//instantiate new cards twice.  use a for loop that runs 5 times.
//each card gets a matchedInfo number. 0++.
//each card gets an image.  The images will be in a global array. They will assigned when arguments are put in as pictureArray[matchedInfoNumber -1]

//match method - takes argument, and if it's matched info fits the clicked on's matched info, they both get pushed into a matched array.  and are hidden

//matches this round is just the array length / 2

//if matched array, which is on the deck, = 10, send out congrats message
