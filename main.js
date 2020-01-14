const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = "grid";
const SCORE_BOARD_ID = "scoreBoard";

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + "_" + rowId;
const getScoreBoard = () => document.getElementById(SCORE_BOARD_ID);

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const eraseGrid = function() {
  const grid = getGrid();
  document.body.removeChild(grid);
};

const drawGameOverScreen = function() {
  eraseGrid();
  const gameOver = document.createElement("div");
  gameOver.innerText = "Game Over";
  gameOver.className = "gameOver";
  document.body.appendChild(gameOver);
};

const eraseTail = function(snake) {
  const [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = function(food) {
  const [colId, rowId] = food.location;
  const cell = getCell(colId, rowId);
  cell.classList.add("food");
};

const eraseFood = function(food) {
  const [colId, rowId] = food.previousLocation;
  const cell = getCell(colId, rowId);
  cell.classList.remove("food");
};

const updateScore = function(score) {
  const scoreCard = document.getElementById("score");
  scoreCard.innerText = score;
};

const updateSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const updateFood = function(food) {
  eraseFood(food);
  drawFood(food);
};

const updateAndDrawGame = function(game) {
  game.moveSnake();
  game.moveGhostSnake();
  const { food, snake, score, isGameOver, ghostSnake } = game.getStatus();
  if (isGameOver) {
    clearInterval(interval);
    return drawGameOverScreen();
  }
  updateSnake(snake);
  updateSnake(ghostSnake);
  updateFood(food);
  updateScore(score);
};

const createScoreBoard = function() {
  const scoreBoard = getScoreBoard();
  const scoreCard = document.createElement("span");
  scoreCard.id = "score";
  scoreBoard.innerText = "Score:";
  scoreBoard.appendChild(scoreCard);
};

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const attachEventListeners = game => {
  document.body.onkeydown = () => game.turnSnakeLeft();
};

const setup = game => {
  attachEventListeners(game);
  createGrids();
  createScoreBoard();
  updateAndDrawGame(game);
};
let interval;

const randomlyTurnSnake = game => {
  let x = Math.random() * 100;
  if (x > 50) {
    game.turnGhostSnakeLeft();
  }
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), "snake");
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), "ghost");
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5, [0, 0]);
  const scoreCard = new ScoreCard(0);
  const game = new Game(snake, ghostSnake, food, scoreCard);
  setup(game);
  interval = setInterval(updateAndDrawGame, 200, game);
  setInterval(randomlyTurnSnake, 200, game);
};
