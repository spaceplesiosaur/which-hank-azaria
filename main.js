var player1Input = document.getElementById('player1Input');
var player2Input = document.getElementById('player2Input');
var enterGameButton = document.getElementById('enterGameButton');
var enterGameLabel = document.getElementById('enterGameLabel');
var welcomeHeaderText = document.getElementById('welcomeHeaderText');
var welcomePageScreen = document.getElementById('welcomePageScreen');
var enterPageScreen = document.getElementById('enterPageScreen');
var playGameButton = document.getElementById('playGameButton');
var gameBoardScreen = document.getElementById('gameBoardScreen');
var cardTable = document.getElementById('cardTable');
var cardTableBuffer = document.getElementById('cardTableBuffer')
var matchCounterPlayer1 = document.getElementById('matchCounterPlayer1');
var matchCounterPlayer2 = document.getElementById('matchCounterPlayer2')
var buttonParent = document.getElementById('buttonParent');
var winnerScreen = document.getElementById('winnerScreen');
var columnNamePlayer1 = document.getElementById('columnNamePlayer1');
var columnNamePlayer2 = document.getElementById('columnNamePlayer2');
var winnerHeader = document.getElementById('winnerHeader');
var winnerTime = document.getElementById('winnerTime');
var winnerMenuContainer = document.getElementById('winnerMenuContainer');
var winnerListButton = document.getElementById('winnerListButton');
var newGameButton = document.getElementById('newGameButton');
var rematchButton = document.getElementById('rematchButton');
var player1column = document.getElementById('player1column');
var player2column = document.getElementById('player2column');
var cardImage = document.getElementById('cardImage');
var playerArray = [];
var theDeck;

enterGameButton.addEventListener('click', onEnterGameButton);
playGameButton.addEventListener('click', onPlayGame);
cardTable.addEventListener('click', flipCard);
winnerListButton.addEventListener('click', highScoreMenu);
newGameButton.addEventListener('click', startNewGame);
rematchButton.addEventListener('click', rematch);

savePlayerArrayOnrefresh(playerArray);

instantiateDeck();

function savePlayerArrayOnrefresh(array) {
  var retrievedArray = JSON.parse(localStorage.getItem("playerArray")) || [];
  for (var i = 0; i < retrievedArray.length; i++) {
    array.push(retrievedArray[i])
  }
  localStorage.setItem("playerArray", JSON.stringify(array));
}

function instantiateDeck() {
  theDeck = new Deck([], [], [], [], []);
}

function onEnterGameButton() {
  checkNameField();
  fillPlayerName();
}

function fillPlayerName() {
  welcomeHeaderText.innerText = `WELCOME ${player1Input.value.toUpperCase()} AND ${player2Input.value.toUpperCase()}!`;
  columnNamePlayer1.innerText = `${player1Input.value.toUpperCase()}`;
  columnNamePlayer2.innerText = `${player2Input.value.toUpperCase()}`;
}

function checkNameField() {
  if (player1Input.value !== "" && player2Input.value !== "") {
    openWelcomeScreen();
  } else {
    enterGameLabel.classList.remove('hidden');
  }
}

function openWelcomeScreen() {
  welcomePageScreen.classList.remove('hidden');
  enterPageScreen.classList.add('hidden');
}

function onPlayGame() {
  openGameBoard();
  instantiateNewCards();
  instantiateNewCards();
  theDeck.shuffle();
  displayCards();
  theDeck.startTime = Date.now();
}

function openGameBoard() {
  gameBoardScreen.classList.remove('hidden');
  welcomePageScreen.classList.add('hidden');
  theDeck.turn = player1Input.value.toUpperCase();
}

function instantiateNewCards() {
  var matchInfo = 0;
  var picturesArray = ['./images/Blue-Raja-Mystery-Men-Hank-Azaria-b.jpg', './images/hank-agador.jpg', './images/hank-comic-book.gif', './images/Hank-cradle.jpg', './images/hank-david.jpg', './images/hank-smufs.jpg'];
  for (var cardNumber = 0; cardNumber < 5; cardNumber++) {
    matchInfo = matchInfo + 1;
    var card = new Card(matchInfo, picturesArray[matchInfo - 1], shuffleSkews());
    theDeck.cards.push(card);
  }
}

function shuffleSkews() {
  var randomSkew = Math.floor(Math.random() * 4);
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

function displayCards() {
  for (var i = 0; i < theDeck.cards.length; i++) {
    cardTable.insertAdjacentHTML('beforeend', htmlToAddCards(theDeck.cards[i]));
  }
  console.log(theDeck.cards);
}

function flipCard(event) {
  if (!event.target.class === 'figure-card-image') {
    return
  }
  if (theDeck.selectedCards.length === 2) {
    return;
  }
  var cardHTMLId = parseInt(event.target.parentNode.parentNode.id);
  var cardToFlip = findCardInfoById(cardHTMLId);
  cardToFlip.flipped = true;
  flippedRules(cardToFlip, event);
  matchCards();
  setTimeout(flipCardBack, (2 * 1000), cardToFlip, event);
  setTimeout(flippedRules, (2.1 * 1000), cardToFlip, event);
  setTimeout(updateMatchCount, (2.2 * 1000));
  openWinnerScreen();
}

function flippedRules(card, eventSpot) {
  if (card.flipped === true) {
    eventSpot.target.src = card.image;
    addToSelected(card);
    theDeck.turnCounter++;
  } else {
    eventSpot.target.src = "./images/hankAzariaBWphoto.jpg"
    removeFromSelected();
  }
}

function showWhoseTurn() {
  if (theDeck.turn === player1Input.value.toUpperCase()) {
    player1column.classList.add('gameBoard-section-scoreColumn-active');
    player2column.classList.remove('gameBoard-section-scoreColumn-active');
  }
  if (theDeck.turn === player2Input.value.toUpperCase()) {
    player2column.classList.add('gameBoard-section-scoreColumn-active');
    player1column.classList.remove('gameBoard-section-scoreColumn-active');
  }
}

function matchCards() {
  if ((theDeck.selectedCards.length % 2) === 0) {
    theDeck.checkSelectedCards();
    theDeck.determinePlayer(player1Input.value.toUpperCase(), player2Input.value.toUpperCase());
  }
}

function updateMatchCount() {
  matchCounterPlayer1.innerText = `${theDeck.player1matchedCards.length/2}`;
  matchCounterPlayer2.innerText = `${theDeck.player2matchedCards.length/2}`;
}

function findCardInfoById(htmlId) {
  for (var i = 0; i < theDeck.cards.length; i++) {
    if (theDeck.cards[i].matchInfo === htmlId) {
      return theDeck.cards[i];
    }
  }
}

function addToSelected(card) {
  theDeck.selectedCards.push(card);
}

function removeFromSelected() {
  theDeck.selectedCards.pop();
}

function flipCardBack(card, eventSpot) {
  if (card.matched === true) {
    eventSpot.target.classList.add('hidden');
  } else {}
  card.flipped = false;
  showWhoseTurn();
}

function openWinnerScreen() {
  if (theDeck.matches / 2 === 5) {
    winnerScreen.classList.remove('hidden');
    gameBoardScreen.classList.add('hidden');
    theDeck.endTime = Date.now();
    theDeck.totalTime = (theDeck.endTime - theDeck.startTime);
    winnerTime.innerHTML = `It took you ${Math.floor((theDeck.totalTime/1000)/60)} minutes and ${Math.floor((theDeck.totalTime/1000) % 60)} seconds.`;
    determineWinner();
    winnerHeader.innerText = `CONGRATULATIONS, ${theDeck.winner} WINS!`
    saveWinnerInfo();
    arrangeAllWinnerInfo();
  }
}

function determineWinner() {
  if (theDeck.player1matchedCards.length > 2) {
    theDeck.winner = player1Input.value.toUpperCase();
  }
  if (theDeck.player2matchedCards.length > 2) {
    theDeck.winner = player2Input.value.toUpperCase();
  }
}

function highScoreMenu() {
  if (JSON.parse(localStorage.getItem("playerArray")).length === 0) {
    winnerMenuContainer.insertAdjacentHTML('afterBegin', htmlWinnerListDefault());
  } else {
    arrangeAllWinnerInfo();
  }
  winnerMenuContainer.classList.toggle('hidden');
}

function saveWinnerInfo() {
  var playerInfo = {
    name: theDeck.winner,
    time: theDeck.totalTime
  }
  var retrievedPlayerArray = JSON.parse(localStorage.getItem("playerArray")) || [];
  retrievedPlayerArray.push(playerInfo);
  localStorage.setItem("playerArray", JSON.stringify(retrievedPlayerArray));
}

function arrangeAllWinnerInfo() {
  var retrievedPlayerArray = JSON.parse(localStorage.getItem("playerArray"));
  var sortedArray = retrievedPlayerArray.sort(function(a, b) {
    return a.time - b.time
  });
  var rank = 0
  winnerMenuContainer.innerHTML = "";
  for (var i = 0; i < sortedArray.length; i++) {
    var rank = rank + 1;
    winnerMenuContainer.insertAdjacentHTML('beforeend', htmlToAddWinnerList(sortedArray[i], rank));
    if (sortedArray.length > 5) {
      sortedArray.pop();
    }
  }
}

function rematch() {
  enterPageScreen.classList.remove('hidden');
  winnerScreen.classList.add('hidden');
  instantiateDeck();
  cardTable.innerHTML = "";
  updateMatchCount();
  player1column.classList.add('gameBoard-section-scoreColumn-active');
  player2column.classList.remove('gameBoard-section-scoreColumn-active');
}

function startNewGame() {
  rematch();
  player1Input.value = "";
  player2Input.value = "";
}

function htmlToAddCards(card) {
  return `<section class="cardTable-section-cardContainer ${card.skewClass}" id="${card.matchInfo}">
    <figure class="cardContainer-figure-card">
      <img src="./images/hankAzariaBWphoto.jpg" class="figure-card-image" alt="back-of-card" id="cardImage"></img>
    </figure>
  </section>`
}

function htmlToAddWinnerList(info, ranking) {
  return `<section class="winnderMenu-section-container">
    <p class="gameBoard-scoreColumn-heavyText">${info.name}</p>
    <p class="gameBoard-scoreColumn-lightText">#${ranking} Top Player</p>
    <div class="gameBoard-scoreColumn-line"></div>`
}

function htmlWinnerListDefault() {
  return `<section class="winnerMenu-section-container">
    <p class="gameBoard-scoreColumn-heavyText">This could be you!</p>
    <p class="gameBoard-scoreColumn-lightText">#1 Top Player</p>
    <div class="gameBoard-scoreColumn-line"></div>
  </section>`
}
