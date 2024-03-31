import '../types/html.d';
import {Joke, JokeSettings} from '../joke';
import $ from 'jquery';
import containerHTML from '../html/joke-fresh_glass.html';
import {Vector} from '../lib/vector';
import {debugEnabled} from '../common';

/**
 * **Свежая трава**
 *
 * Предложение потрогать траву
 * @author Идея: Magia
 * @author Kozhilya
 */
export class FreshGrassJoke extends Joke<FreshGrassJokeSettings> {
  id = 'fresh_grass';

  title = 'Свежая трава';

  description = 'Предложение потрогать траву';

  _settings = new FreshGrassJokeSettings();

  container: JQuery<HTMLDivElement>;

  intervalIndex: NodeJS.Timeout;

  movement: Movement;

  /**
   * Запуск шутки
   */
  start(): void {
    $(() => this.init());
  }

  /**
   * Основная загрузка шутки
   */
  init() {
    const $body = $(document.body);

    document.body.style.setProperty(
        '--fresh-grass-body-top',
        `-${window.scrollY}px`,
    );

    this.container = $(containerHTML);
    this.container.hide(0);
    $body.append(this.container);
    this.container.fadeIn(500);

    this.fleeingGrass();
  }

  /**
   * Отладка
   * @param {string} str
   */
  debug(str: string): void {
    if (!debugEnabled) return;

    $('small', this.container).html(`<pre>${str}</pre>`);
  }

  /**
   * Анимация убегания травы от пользователя
   */
  fleeingGrass(): void {
    this.movement = new Movement(this.settings);

    const $img = $('img.april-fools__joke__fresh-grass__image', this.container);

    $img.on('mousedown', () => {
      this.close();
    });

    $(window).on('mousemove', (e) => {
      this.movement.mouse = new Vector(e.clientX - window.innerWidth / 2,
          e.clientY - window.innerHeight / 2);
    });

    this.intervalIndex = setInterval(() => {
      const img = $img[0].getBoundingClientRect();
      this.movement.step(img);

      // this.debug(this.movement.debugLines.join('\n'));

      $img.css('transform', this.movement.state.position.toTransform());
    }, Math.floor(1000 * this.movement.dt));
  }

  /**
   * Закрыть окно
   */
  close(): void {
    clearInterval(this.intervalIndex);

    this.container.fadeOut({
      duration: 500,
      // eslint-disable-next-line
      // @ts-ignore
      complete: () => {
        this.container.remove();

        scrollTo(0,
            -parseInt(document.body.style.getPropertyValue(
                '--fresh-grass-body-top')));
      },
    });
  }
}

type MovementData = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
};

/**
 * Класс обработки движения
 */
class Movement {
  settings: FreshGrassJokeSettings;
  state: MovementData;
  mouse: Vector;
  dt: number;
  last: MovementData;
  debugLines: string[];
  forces: { [key in string]: Vector };

  /**
   * Конструктор
   * @param {FreshGrassJokeSettings} settings
   */
  constructor(settings: FreshGrassJokeSettings) {
    this.settings = settings;
    this.state = {
      position: new Vector(),
      velocity: Vector.fromLengthAngle(Math.random() * 2 * Math.PI,
          Math.random() *
          (this.settings.maxVelocity - this.settings.minVelocity) +
          this.settings.minVelocity),
      acceleration: new Vector(),
    };
    this.mouse = new Vector();
    this.dt = 1.0 / this.settings.tickPerSecond;
  }

  /**
   * Координата движения
   */
  get position() {
    return this.state.position;
  }

  /**
   * Скорость движения
   */
  get velocity() {
    return this.state.velocity;
  }

  /**
   * Ускорение движения
   */
  get acceleration() {
    return this.state.acceleration;
  }

  /**
   * Произвести вычисление
   * @param {DOMRect} img Изображение
   */
  step(img: DOMRect) {
    this.last = this.state;
    this.debugLines = [];
    this.forces = {};

    // Обработка сил
    this.processForces();
    this.processMovement();
    this.processCollisions(img);
  }

  /**
   * Обработка сил
   */
  processForces() {
    // Притяжение к центру
    this.forces.gravity = Vector.fromLengthAngle(
        this.last.position.angle + Math.PI,
        this.settings.gravity,
    );

    // Коррекция скорости
    if (this.last.velocity.length < this.settings.minVelocity) {
      this.forces.correction = Vector.fromLengthAngle(
          this.last.velocity.angle,
          this.settings.correctionForce *
          Math.pow(this.last.velocity.length - this.settings.minVelocity, 2),
      );
    } else if (this.last.velocity.length > this.settings.maxVelocity) {
      this.forces.correction = Vector.fromLengthAngle(
          this.last.velocity.angle + Math.PI,
          this.settings.correctionForce *
          Math.pow(this.last.velocity.length - this.settings.maxVelocity, 2),
      );
    }

    // Отталкивание от мыши
    const toMouseVector = this.mouse.add(this.last.position.reverse());
    if (toMouseVector.length < this.settings.keepDistance &&
        toMouseVector.length > 0) {
      this.forces.running = Vector.fromLengthAngle(
          toMouseVector.angle + Math.PI,
          this.settings.mouseForceMax -
          Math.pow(
              Math.abs(toMouseVector.length / this.settings.keepDistance - 1),
              this.settings.mouseForcePow),
      );
    }
  }

  /**
   * Обработка движения
   */
  processMovement() {
    // Ускорение
    this.debugLines.push('Forces:');
    let acceleration: Vector = new Vector();

    for (const [name, force] of Object.entries(this.forces)) {
      acceleration = acceleration.add(force);
      this.debugLines.push(`  [${name}] ${force}`);
    }

    acceleration = acceleration.multiply(1 / this.settings.mass);

    this.state = {
      position: this.last.position,
      velocity: this.last.velocity,
      acceleration: acceleration,
    };

    this.state.velocity = this.velocity.add(
        this.acceleration.multiply(this.dt));
    this.state.position = this.position.add(
        this.velocity.multiply(this.dt));

    this.debugLines.push(`acceleration: ${this.acceleration}`);
    this.debugLines.push(`velocity: ${this.velocity}`);
    this.debugLines.push(`position: ${this.position}`);
  }

  /**
   * Обработка столкновения с границами окна
   * @param {DOMRect} img Изображение
   */
  processCollisions(img: DOMRect) {
    const limitX = (window.innerWidth - img.width) / 2;
    const limitY = (window.innerHeight - img.height) / 2;

    if (this.position.x < -limitX) {
      // Left
      this.position.x = -2 * limitX - this.position.x;
      this.velocity.x = -this.velocity.x * this.settings.collisionElasticity;
    }

    if (this.position.x > limitX) {
      // Right
      this.position.x = 2 * limitX - this.position.x;
      this.velocity.x = -this.velocity.x * this.settings.collisionElasticity;
    }

    if (this.position.y < -limitY) {
      // Top
      this.position.y = -2 * limitY - this.position.y;
      this.velocity.y = -this.velocity.y * this.settings.collisionElasticity;
    }

    if (this.position.y > limitY) {
      // Bottom
      this.position.y = 2 * limitY - this.position.y;
      this.velocity.y = -this.velocity.y * this.settings.collisionElasticity;
    }
  }

  /**
   * Нормально распределённая случайная величина
   * @param {number} mean
   * @param {number} stdev
   * @return {number}
   * @private
   */
  private randomGaussian(mean: number = 0, stdev: number = 1): number {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
  }
}

/**
 * Класс настроек для шутки "Свежая трава"
 */
export class FreshGrassJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 100;

  /**
   * Расстояние, на котором трава начнёт убегать
   */
  keepDistance: number = 200;

  /**
   * Максимальная скорость картинки (в пикселях в секунду)
   */
  maxVelocity: number = 500;

  /**
   * Минимальная скорость картинки (в пикселях в секунду)
   */
  minVelocity: number = 20;

  /**
   * Количество отметок времени за секунду
   */
  tickPerSecond: number = 50;

  /**
   * Сила притяжения в центр
   */
  gravity: number = 20;

  /**
   * Сила исправления скорости
   */
  correctionForce: number = 0.8;

  /**
   * Максимальная сила отталкивания от курсора
   */
  mouseForceMax: number = 5000;

  /**
   * Степень увеличения силы отталкивания от курсора
   */
  mouseForcePow: number = 5;

  /**
   * Общая масса картинки
   */
  mass: number = 1;

  /**
   * Доля скорости, сохраняемой при столкновении со стеной
   */
  collisionElasticity: number = 0.9;
}
