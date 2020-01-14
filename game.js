const isFoodAteBySnake = function(snakeLocation, foodLocation) {
  return snakeLocation.some(part =>
    part.every((coordinate, index) => coordinate === foodLocation[index])
  );
};

class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
    this.isGameOver = false;
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  turnGhostSnakeLeft() {
    this.ghostSnake.turnLeft();
  }

  update() {
    this.food.generateNew();
    this.snake.grow();
    this.scoreCard.updateDefault();
  }

  moveSnake() {
    this.snake.move();
    const snakeLocation = this.snake.location;
    const foodLocation = this.food.position;
    this.isGameOver = this.snake.hasCrossedBoundaries();
    if (isFoodAteBySnake(snakeLocation, foodLocation)) {
      this.update();
    }
  }

  moveGhostSnake() {
    this.ghostSnake.move();
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
      score: this.scoreCard.points,
      isGameOver: this.isGameOver
    };
  }
}
