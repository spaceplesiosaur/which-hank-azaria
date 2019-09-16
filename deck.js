class Deck {
  constructor(cards, matchedCards, selectedCards) {
    this.cards = cards;
    this.matchedCards = matchedCards;
    this.selectedCards = selectedCards;
    this.matches = 0;
  }
  shuffle() {

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
    this.matches = this.matchedCards.length;
    }
  }
}
