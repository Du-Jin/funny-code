class Common {
  static CEIL_SIZE = 10;  // 每个小单元格为10px
  static N = 30;  // 可移动区域为30*30的网格
  static debounceDecorator (fn : (event: KeyboardEvent)=>void, delay: number) {
    let timer : number;
    return function(event: KeyboardEvent) {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(()=>{
        fn(event);
      }, delay);  // typescript下setTimeout函数返回类型比较奇怪，所以改用window.setTimeout，返回类型为number，为timer ID
    }
  }
}
export default Common;