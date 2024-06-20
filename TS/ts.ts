



// let number:number = 4;
// const constanta:number = 3.14;
// let string:string = "tatar loxu";
// let arr:string[] = ["black", "lives", "matters", "maybe"]
// let func:()=>void = ()=>{

// }

// const a:number = 2;const b:string = "Bebra";
// const c:()=>void = function grow(){};let g:string[] = ["Bebra", "Ocean", "Grow"];
// class Point {x:number; y:number;};
// let point:Point = new Point();point.x = 1;
// point.y = 2;
// class Rect {
//     x1:number    y1:number
//    public x2:number    y2:number
//     private readonly MAX_COORD = 1000;
//     constructor(x:number, y:number){
//         this.x1 = x        this.y1 = y
//         this.x2 = x        this.y2 = y
//     }
//     square(){        return Math.abs(this.x1 - this.x2) * Math.abs(this.y1 - this.y2)
//     }}
// let rect1:Rect = new Rect(10, 20);rect1.x1 = 5
// rect1.x2 = 6
// rect1.square()

// --------------------------------------------------------------------------------------
//   class User {    private _name: string;
//     private readonly _login: string;    private _password: string;
//     private readonly _grade: number;    static count: number = 0;
//     constructor(name: string, login: string, password: string, grade: number) {
//         this._name = name;        this._login = login;
//         this._password = password;        this._grade = grade;
//         User.count++;    }
//     get name(): string {
//         return this._name;    }
//     set name(value: string) {
//         this._name = value;    }
//     get login(): string {
//         return this._login;    }
//     get password(): string {
//         return '*'.repeat(this._password.length);    }
//     set password(value: string) {
//         this._password = value;    }
//     showInfo(): void {
//         console.log(`Name: ${this._name}, Login: ${this._login}`);    }
//     eq(user: User): boolean {
//         return this._grade === user._grade;    }
//     lt(user: User): boolean {
//         return this._grade < user._grade;    }
//     gt(user: User): boolean {
//         return this._grade > user._grade;    }
// }
// class SuperUser extends User {    private _role: string;
//     static count: number = 0;
//     constructor(name: string, login: string, password: string, role: string, grade: number) {        super(name, login, password, grade);
//         this._role = role;        SuperUser.count++;
//     }
//     get role(): string {        return this._role;
//     }
//     set role(value: string) {        this._role = value;
//     }
//     showInfo(): void {        super.showInfo();
//         console.log(`Role: ${this._role}`);    }
//     get grade(): string {
//         return 'Неизвестное свойство grade';    }
//     set grade(value: number) {
//         console.log('Неизвестное свойство grade');    }
// }

// -------------------------------------------------------------
// k2



abstract class Publisher {
    title: string
    author: string
    pubYear: number
    copies: number
  
    static count: number = 0
  
    constructor() {
      Publisher.count++
    }
  
    //метод получения
    get getTitle() {
      return this.title
    }
  
    //метод изменения
    set setTitle(value: string) {
      this.title = value
    }
  
    get getAuthor() {
      return this.author
    }
  
    set setAuthor(value: string) {
      this.author = value
    }
  
    get getPubYear() {
      return this.pubYear
    }
  
    set setPubYear(value: number) {
      this.pubYear = value
    }
  
    get getCopies() {
      return this.copies
    }
  
    set setCopies(value: number) {
      this.copies = value
    }
  }
  
  //наследуем от Publisher и типизируем интерфейс Reception
  class Book extends Publisher implements Reception {
    pages: number
    delivery(item: Publisher) {
  
    }
    recieve(item: Publisher) {
  
    }
  }
  class Magazine extends Publisher implements Reception {
    issue: number
    delivery(item: Publisher) {
  
    }
    recieve(item: Publisher) {
  
    }
  }
  
  interface Reception {
    delivery(item: Publisher): void
    recieve(item: Publisher): void
  }
  
  class Reader extends Publisher implements Reception {
    firstName: string
    lastName: string
    items: Publisher[]
  
    //get + set
  
    get getFirstName() {
      return this.firstName
    }
  
    set setFirstName(value: string) {
      this.firstName = value
    }
  
    get getLastName() {
      return this.lastName
    }
  
    set setLastName(value: string) {
      this.lastName = value
    }
    delivery(item: Publisher) {
      //если у читателей максимальное число изданий, выдача невозможна
      if (Publisher.count == this.items.length || this.copies == 0) return
      this.copies = this.copies - 1
    }
    recieve(item: Publisher) {
      this.copies = this.copies + 1
    }
  }
  
  class Library extends Publisher {
    items: Publisher[]
  
    addPublisher(item: Publisher) {
      this.items.push(item)
    }
    removePublisher(item: Publisher) {
      this.items.pop()
    }
  
  }
  
  //КТ3
  class Ploter {
    plotterState: PlotterState
  
    drawLine(prt: Printer, from: Position, to: Position, color: LineColor): void {
      prt(`...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${color} цвет.`);
    }
  
    calcNewPosition(distance: Distance, angle: Angle, current: Position): Position {
      const angle_in_rads = angle * (Math.PI / 180.0) * 1.0;
      const x = current.x + distance * Math.cos(angle_in_rads);
      const y = current.y + distance * Math.sin(angle_in_rads);
      //Возращаем новую позицию
      const position = { x: Math.round(x), y: Math.round(y) }
      this.plotterState.position = position
      return position
    }
    move(prt: Printer, distance: Distance, state: PlotterState): PlotterState {
      let newPosition = this.calcNewPosition(distance, state.angle, state.position);
      if (state.carriageState === CarriageState.DOWN) {
        this.drawLine(prt, state.position, newPosition, state.color);
      } else {
        prt(`Передвигаем на ${distance} от точки (${state.position.x}, ${state.position.y})`);
      }
      const retState = { ...state };
      retState.position = newPosition;
      this.plotterState = retState;
      return retState;
    }
    turn(prt: Printer, angle: Angle, state: PlotterState): PlotterState {
      prt(`Поворачиваем на ${angle} градусов`);
      const newAngle = (state.angle + angle) % 360.0;
      const retState = { ...state };
      retState.angle = newAngle;
      this.plotterState = retState;
      return retState;
  
    }
    carriageUp(prt: Printer, state: PlotterState): PlotterState {
      prt("Поднимаем каретку");
      const retState = { ...state };
      retState.carriageState = CarriageState.UP;
      this.plotterState = retState;
      return retState;
    }
    carriageDown(prt: Printer, state: PlotterState): PlotterState {
      prt("Опускаем каретку");
      const retState = { ...state };
      retState.carriageState = CarriageState.DOWN;
      this.plotterState = retState;
      return retState;
    }
    setColor(prt: Printer, color: LineColor, state: PlotterState): PlotterState {
      prt(`Устанавливаем ${color} цвет линии.`);
      const retState = { ...state };
      retState.color = color;
      this.plotterState = retState;
      return retState;
    }
    setPosition(prt: Printer, position: Position, state: PlotterState): PlotterState {
      prt(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
      const retState = { ...state };
      retState.position = position;
      this.plotterState = retState;
      return retState;
    }
    drawTriangle(prt: Printer, size: number, state: PlotterState): PlotterState {
      state = this.carriageDown(prt, state);
      for (let i = 0; i < 3; ++i) {
        state = this.move(prt, size, state);
        state = this.turn(prt, 120.0, state);
      }
      return this.carriageUp(prt, state);
    }
    drawSquare(prt: Printer, size: number, state: PlotterState): PlotterState {
      state = this.carriageDown(prt, state);
      for (let i = 0; i < 4; ++i) {
        state = this.move(prt, size, state);
        state = this.turn(prt, 90.0, state);
      }
      return this.carriageUp(prt, state);
    }
  }
  
  
  class LogToConsole implements Logger {
    log(message: string): void {
  
    }
  }
  
  interface Logger {
    log(message: string): void;
  }
  
  /**
   * Объявление типов
   */
  
  type Point = number;
  type Distance = number;
  type Angle = number;
  type Position = { x: Point; y: Point };
  enum CarriageState {
    UP,
    DOWN
  }
  enum LineColor {
    BLACK = "чёрный",
    RED = "красный",
    GREEN = "зелёный"
  }
  type PlotterState = {
    position: Position;
    angle: Angle;
    color: LineColor;
    carriageState: CarriageState;
  };
  type Printer = (s: string) => void;
  
  const printer: Printer = console.log;
  
  function initializePlotterState(position: Position, angle: Angle, color: LineColor, carriageState: CarriageState): PlotterState {
    return {
      position: position,
      angle: angle,
      color: color,
      carriageState: carriageState
    };
  }
  
  let initPosition: Position = { x: 0.0, y: 0.0 };
  let initColor: LineColor = LineColor.BLACK;
  let initAngle: Angle = 0.0;
  let initCarriageState: CarriageState = CarriageState.UP;
  
  let plotter: Ploter = new Ploter();
  
  let plotterState = initializePlotterState(initPosition, initAngle, initColor, initCarriageState);
  
  plotter.drawTriangle(printer, 100.0, plotterState);
  plotter.setPosition(printer, {x:10.0, y:10.0}, plotterState);
  plotter.setColor(printer, LineColor.RED , plotterState);
  plotter.drawSquare(printer, 80.0, plotterState);