import Snake from './snake';
import Food from './food';
import Common from './common';

const map = new Map();  // key为按键，value为方向
map.set('ArrowUp', 'up');
map.set('ArrowDown', 'down');
map.set('ArrowLeft', 'left');
map.set('ArrowRight', 'right');

class Game {
  snake: Snake;
  levelElement: HTMLElement;
  scoreElement: HTMLElement;
  food: Food;
  isLive: boolean;
  constructor() {

    this.snake = new Snake();
    this.scoreElement = document.getElementById('score');
    this.levelElement = document.getElementById('level');
    this.food = new Food();
    this.isLive = true;
  }

  private moveSnake = ()=>{
    const level : number = Number.parseInt(this.levelElement.innerText);
    let timer = setInterval(()=>{
      this.snake.step();
      this.checkScore();
      this.checkTouchWall();
      if (this.snake.checkTouchSelf()) {
        this.isLive = false;
      }
      if (this.isLive === false) {
        let gameStatusEle = document.getElementById('game-status');
        gameStatusEle.innerText = 'game failed!';
        clearInterval(timer);
      }
    }, 300 - 20*(level-1));
  }
  private checkScore = ()=>{
    const foodX = this.food.X;
    const foodY = this.food.Y;
    const snakeHeadX = this.snake.X;
    const snakeHeadY = this.snake.Y;
    if (foodX === snakeHeadX && foodY === snakeHeadY) {  // 吃到食物了
      // 更新分数
      const newScore = Number.parseInt(this.scoreElement.innerText) + 1;
      this.scoreElement.innerText = String(newScore);
      // 更新level
      if (newScore % 10 === 0) {
        const newLevel = Number.parseInt(this.levelElement.innerText) + 1;
        if (newLevel <= 10) {
          this.levelElement.innerText = String(newLevel);
        }
      }
      // 蛇身体增长一节
      this.snake.grow();
      // 更新食物
      this.food.change();
    }
  };
  // 碰墙检测
  private checkTouchWall = ()=>{
    const snakeHeadX = this.snake.X;
    const snakeHeadY = this.snake.Y;
    if (snakeHeadX >= Common.N || snakeHeadX < 0 ||
        snakeHeadY >= Common.N || snakeHeadY < 0) {
      this.isLive = false;
    }
  }
  public play = ()=>{
    let self = this;
    this.moveSnake();
    function keyDownHandler(event: KeyboardEvent) : void {
      let key = event.key;
      // 现在是垂直方向，只能左右按键改变方向
      // 现在是水平方向，则只能垂直方向按键改变方向
      if ((self.snake.direction === 'up' || self.snake.direction === 'down') &&
          (key === 'ArrowLeft' || key === 'ArrowRight')) {
        self.snake.direction = map.get(key);
      }
      if ((self.snake.direction === 'left' || self.snake.direction === 'right') &&
          (key === 'ArrowUp' || key === 'ArrowDown')) {
        self.snake.direction = map.get(key);
      }
    }
    let fn = Common.debounceDecorator(keyDownHandler, 100)
    // 加延迟。避免用户迅速按下两个键（比如当前左移动，用户按下上键又立即按下右键）
    document.addEventListener('keydown', fn);
  }
}

export default Game;