class Card {
  constructor(matchInfo, image, skewClass) {
    this.matchInfo = matchInfo;
    this.matched = false;
    this.flipped = false;
    this.image = image;
    this.skewClass = skewClass;
  }
  match() {
    this.matched = true;
  }
}
