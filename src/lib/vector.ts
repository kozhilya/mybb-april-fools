import {d2} from '../common';

/**
 * Класс вектора
 */
export class Vector {
  /**
   * Координата X
   */
  x: number;

  /**
   * Координата Y
   */
  y: number;

  /**
   * Конструктор вектора
   * @param {number} x Координата X
   * @param {number} y Координата Y
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Угол наклона вектора
   */
  get angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Угол наклона вектора
   * @param {number} angle
   */
  set angle(angle: number) {
    const length = this.length;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  /**
   * Длина вектора
   */
  get length() {
    return Math.distance(this.x, this.y);
  }

  /**
   * Длина вектора
   * @param {number} length
   */
  set length(length: number) {
    const angle = this.angle;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  /**
   * Сумма векторов
   * @param {Vector} a Первый вектор
   * @param {Vector} b Второй вектор
   * @return {Vector} Вектор суммы
   */
  static addVectors(a: Vector, b: Vector): Vector {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  /**
   * Скалярное умножение векторов
   * @param {Vector} a Первый вектор
   * @param {Vector} b Второй вектор
   * @return {number} Скалярное произведение векторов
   */
  static dotProduct(a: Vector, b: Vector): number {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Создать вектор по углу наклона и длине
   * @param {number} angle Угол наклона
   * @param {number} length Длина
   * @return {Vector} Вектор суммы
   */
  static fromLengthAngle(angle: number, length: number): Vector {
    const v = new Vector();
    v.length = length;
    v.angle = angle;
    return v;
  }

  /**
   * Нахождение противоположного вектора
   * @return {Vector} Противоположный вектор
   */
  reverse(): Vector {
    return new Vector(-this.x, -this.y);
  }

  /**
   * Прибавить вектор
   * @param {Vector} a Второе слагаемое
   * @return {Vector} Вектор суммы
   */
  add(a: Vector): Vector {
    return Vector.addVectors(this, a);
  }

  /**
   * Умножение вектора на число
   * @param {number} a Скаляр
   * @return {Vector} Вектор-результат
   */
  multiply(a: number): Vector {
    return new Vector(a * this.x, a * this.y);
  }

  /**
   * Преобразование в CSS-преобразование
   * @return {string} CSS-преобразование
   */
  toTransform(): string {
    return `translate(${this.x}px, ${this.y}px)`;
  }

  /**
   * Строковое представление
   * @return {string}
   */
  toString(): string {
    return d2`Vector(x=${this.x}, y=${this.y}, ` +
        d2`length=${this.length}, angle=${this.angle})`;
  }
}

declare global {
  interface Math {
    /**
     * Расчёт длины вектора
     * @param {number} x Координата X вектора
     * @param {number} y Координата X вектора
     * @return {number} Длина вектора
     */
    distance(x: number, y: number): number;
  }
}

Math.distance = (x, y) => Math.sqrt(x * x + y * y);
