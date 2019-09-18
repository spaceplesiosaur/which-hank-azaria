class Deck {
  constructor(cards, matchedCards, selectedCards, player1matchedCards, player2matchedCards) {
    this.cards = cards;
    this.matchedCards = matchedCards;
    this.selectedCards = selectedCards;
    this.matches = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.totalTime = 0;
    this.turn = "";
    this.player1matchedCards = player1matchedCards;
    this.player2matchedCards = player2matchedCards;
    this.winner = "";
    this.turnCounter = 0;
  }
  shuffle() {
    for (var i = this.cards.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var chosenArrayItem = this.cards[i];
      var randomArrayItem = this.cards[randomIndex];
      this.cards[i] = randomArrayItem;
      this.cards[randomIndex] = chosenArrayItem;
    }
  }
  checkSelectedCards() {
    if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
      this.moveToMatched(this.selectedCards);
      return true;
    } else {
      return false;
    }
  }
  moveToMatched(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].match();
      this.moveToPlayerMatched(array[i]);
      this.matchedCards.push(array[i]);
    }
    this.matches = this.matchedCards.length;
  }
  determinePlayer(player1, player2) {
    if (this.turnCounter % 4 === 0) {
      this.turn = player1;
    } else {
      this.turn = player2;
    }
  }
  moveToPlayerMatched(arrayItem) {
    if (this.turn === player1Input.value.toUpperCase()) {
      this.player1matchedCards.push(arrayItem);
    }
    if (this.turn === player2Input.value.toUpperCase()) {
      this.player2matchedCards.push(arrayItem);
    }
  }
}
