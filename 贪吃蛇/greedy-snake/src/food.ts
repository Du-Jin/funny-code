import Common from './common'
class Food {
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('food') as HTMLElement;
  }
  // 获取食物的x坐标
  get X() {
    return Math.floor(this.element.offsetLeft / Common.CEIL_SIZE);
  }
  // 获取食物的y坐标
  get Y() {
    return Math.floor(this.element.offsetTop / Common.CEIL_SIZE);
  }
  // 食物被吃后需要新建食物（改变food元素的位置）
  change() {
    let newX = 10 * Math.floor(Math.random() * (Common.N - 1));
    let newY = 10 * Math.floor(Math.random() * (Common.N - 1));
    this.element.style.left = `${newX}px`;
    this.element.style.top = `${newY}px`;
  }
}

// 测试代码
// const food = new Food();
// console.log(food.X, food.Y);


export default Food;