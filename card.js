class Card {
  constructor(matchInfo, image) {
    this.matchInfo = matchInfo;
    this.matched = false;
    this.flipped = false;
    this.image = image;
  }
  match() {
    this.matched = true;
  }
}
