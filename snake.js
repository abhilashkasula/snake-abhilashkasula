const isHeadOutOfGrid = function([headX, headY], NUM_OF_COLS, NUM_OF_ROWS) {
  const isHeadXOutOfCols = headX < 0 || headX >= NUM_OF_COLS;
  const isHeadYOutOfRows = headY < 0 || headY >= NUM_OF_ROWS;
  return isHeadXOutOfCols || isHeadYOutOfRows;
};

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  get tail() {
    return this.previousTail;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  grow() {
    this.positions.unshift(this.previousTail);
  }

  hasCrossedBoundaries({NUM_OF_COLS, NUM_OF_ROWS}) {
    const head = this.positions[this.positions.length - 1];
    return isHeadOutOfGrid(head, NUM_OF_COLS, NUM_OF_ROWS);
  }

  hasEatenItself() {
    const head = this.positions[this.positions.length - 1];
    const body = this.positions.slice(0, -1);
    return isPointOnLine(body, head);
  }

  isHeadAt(point) {
    const head = this.positions[this.positions.length - 1];
    return head.every((coordinate, index) => coordinate === point[index]);
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }
}
