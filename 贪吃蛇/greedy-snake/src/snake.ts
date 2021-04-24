import Common from './common';

type Direction = 'up' | 'down' | 'left' | 'right';

class Snake {
  element: HTMLElement;    // 整个蛇的元素
  head: HTMLElement;       // 蛇的头部
  direction: Direction;    // 当前移动方向
  constructor() {
    this.element = document.getElementById('snake') as HTMLElement;
    this.head = document.getElementById('snake-head') as HTMLElement;
    this.head.style.left = '0px';
    this.head.style.top = '0px';
    this.direction = 'right';
  }
  get X() : number{
    const res = Math.floor(this.head.offsetLeft / Common.CEIL_SIZE);
    return res;
  }
  get Y() : number{
    const res = Math.floor(this.head.offsetTop / Common.CEIL_SIZE);
    return res;
  }
  stepLeft() : void {
    const headNewX = this.head.offsetLeft - Common.CEIL_SIZE;
    this.head.style.left = `${headNewX}px`;
  }
  stepRight() : void {
    const headNewX = this.head.offsetLeft + Common.CEIL_SIZE;
    this.head.style.left = `${headNewX}px`;
  }
  stepUp() : void {
    const headNewY = this.head.offsetTop - Common.CEIL_SIZE;
    this.head.style.top = `${headNewY}px`;
  }
  stepDown() : void {
    const headNewY = this.head.offsetTop + Common.CEIL_SIZE;
    this.head.style.top = `${headNewY}px`;
  }
  step = ()=>{
    this.refreshBody();
    switch (this.direction) {
      case 'up' : {
        this.stepUp();
        break;
      }
      case 'down': {
        this.stepDown();
        break;
      }
      case 'left': {
        this.stepLeft();
        break;
      }
      case 'right': {
        this.stepRight();
        break;
      }
      default: {
        const exhaustiveCheck : never = this.direction;
        break;
      }
    }
  }
  // 蛇头移动一格后，后面也需要跟上（实际就是从最后一节开始，让每节等于前一节的位置）
  private refreshBody(): void {
    let bodySections = this.element.children;
    if (bodySections.length <= 1) {  // 只有蛇头，没有其他部分，不需要补齐
      return;
    }
    for (let i = bodySections.length-1; i > 0; i--) {
      const next = bodySections[i-1] as HTMLElement;
      let current = bodySections[i] as HTMLElement;
      const nextX = next.offsetLeft;
      const nextY = next.offsetTop;
      current.style.left = `${nextX}px`;
      current.style.top = `${nextY}px`;
    }
  }
  // 当吃到食物后身体增长一节
  grow(): void {
    // 根据当前最后一节的位置和移动方向确定新节的位置
    const currLastSection = this.element.lastElementChild as HTMLElement;
    let newSection = document.createElement('div');
    newSection.id = 'snake-body';
    let newSecX = currLastSection.offsetLeft;
    let newSecY = currLastSection.offsetTop;
    switch (this.direction) {
      case 'up': {  // 向上方向，新节在最后一节的下面一格位置
        newSecY += Common.CEIL_SIZE;
        break;
      }
      case 'down': {  // 向下方向，新节在最后一节的上面一格位置
        newSecY -= Common.CEIL_SIZE;
        break;
      }
      case 'left': {  // 向左方向，新节在最后一节的右边一格位置
        newSecX += Common.CEIL_SIZE;
        break;
      }
      case 'right': { // 向右方向，新节在最后一节的左边一格位置
        newSecX -= Common.CEIL_SIZE;
        break;
      }
      default: {
        const exhaustiveCheck : never = this.direction;
        break;
      }
    }
    newSection.style.left = `${newSecX}px`;
    newSection.style.top = `${newSecY}px`;
    this.element.appendChild(newSection);
  }
  // 判断头部有没有撞到自己的身体
  checkTouchSelf = ()=>{
    let bodySections = this.element.children;
    for (let i = bodySections.length-1; i > 0; i--) {
      let sec = bodySections[i] as HTMLElement;
      if (this.X * Common.CEIL_SIZE === sec.offsetLeft &&
          this.Y * Common.CEIL_SIZE === sec.offsetTop) {
        return true;
      }
    }
    return false;
  }
}

export default Snake;