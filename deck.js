class Deck {
  constructor(cards, matchedCards, selectedCards, startTime, player1Name) {
    this.cards = cards;
    this.matchedCards = matchedCards;
    this.selectedCards = selectedCards;
    this.matches = 0;
    this.startTime = startTime;
    this.endTime = 0;
    this.totalTime = 0;
    this.player1Name = player1Name;
  }
  shuffle() {
      for (var i = this.cards.length -1; i >= 0; i--) {
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
      this.matchedCards.push(array[i]);
      // this.matches = this.matchedCards.length;
    }
    this.matches = this.matchedCards.length;
  }
}
