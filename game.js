class Game {
  constructor(snake, ghostSnake, food, gridSize) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = new ScoreCard();
    this.gridSize = gridSize;
    this.isGameOver = false;
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  turnGhostSnakeLeft() {
    this.ghostSnake.turnLeft();
  }

  isHitToGhost() {
    const snakeLocation = this.snake.location;
    return snakeLocation.some(part => isPointOnLine(this.ghostSnake.location, part));
  }

  isOver() {
    const isSnakeCrossedGrid = this.snake.hasCrossedBoundaries(this.gridSize);
    const isEatenItself = this.snake.hasEatenItself()
    return isSnakeCrossedGrid || isEatenItself || this.isHitToGhost();
  }
  
  update() {
    if (this.snake.isHeadAt(this.food.position)) {
      this.food.generateNew();
      this.snake.grow();
      this.scoreCard.updateDefault();
    }
    if(this.ghostSnake.isHeadAt(this.food.position)) {
      this.food.generateNew();
      this.ghostSnake.grow();
    }
  }

  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    this.update()
  }

  getStatus() {
    const snake = {
      location: this.snake.location,
      species: this.snake.species,
      previousTail: this.snake.tail
    };
    const food = {
      location: this.food.position,
      previousLocation: this.food.previousFoodLocation
    };
    const ghostSnake = {
      location: this.ghostSnake.location, 
      species: this.ghostSnake.species,
      previousTail: this.ghostSnake.tail
    }
    return {
      snake,
      ghostSnake,
      food,
      score: this.scoreCard.points
    };
  }
}
