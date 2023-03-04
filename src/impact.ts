import 'phaser';

export enum Type {
  Crush, Impact
}

export enum Position {
  Top,
  Right,
  Bottom,
  Left
}

const color = 0xE28743
const opacity = 0.6

export class Impact {
  private circle: Phaser.GameObjects.Arc

  constructor(scene: Phaser.Scene, type: Type, position: Position) {
    const { width, height } = scene.scale

    const x = position === Position.Top || position === Position.Bottom
      ? width / 2
      : position == Position.Left
        ? 0
        : width

    const y = position === Position.Left || position === Position.Right
      ? height / 2
      : position == Position.Top
        ? 0
        : height

    if (type === Type.Crush) {
      const radius = width / 4 * 2.8
      this.circle = scene.add.circle(x, y, radius, color, opacity)

      return
    }

    const radius = width / 4 * 3.8
    // type == impact
    this.circle = scene.add.circle(x, y, radius, color, opacity)
  }

  destroy() {
    this.circle.destroy()
  }

}