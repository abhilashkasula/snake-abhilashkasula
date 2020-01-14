class ScoreCard {
  constructor() {
    this.score = 0;
  }

  get points() {
    return this.score;
  }

  updateDefault() {
    this.score += 1;
  }
}
