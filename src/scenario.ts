import { Impact, Position, Type } from './impact';

export const generateScenario = () => {
  const [ impactCrushFirst, impactCrushSecond ] = Phaser.Math.Between(0, 1) ? [ Type.Impact, Type.Crush ] : [ Type.Crush, Type.Impact ]
  const leftRightFirst = Phaser.Math.Between(0, 1) ? Position.Left : Position.Right
  const topBottomSecond = Phaser.Math.Between(0, 1) ? Position.Top : Position.Bottom

  return [
    ['charge', 'vertical'],
    ['wait', 2],
    ['impact', leftRightFirst, impactCrushFirst],
    ['wait', 2],
    ['charge', 'horizontal'],
    ['wait', 2],
    ['impact', topBottomSecond, impactCrushSecond],
    ['wait', 5],
    ['charge', 'vertical'],
    ['wait', 2],
    ['impact', leftRightFirst, impactCrushFirst],
    ['wait', 2],
    ['charge', 'horizontal'],
    ['wait', 2],
    ['impact', topBottomSecond, impactCrushSecond]
  ]
}

export class Scenario extends Phaser.Events.EventEmitter {
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    super()

    this.scene = scene
  }

  charge(direction: 'vertical' | 'horizontal') {
    const charge = this.scene.add.image(400, 400, 'charge')
    if (direction === 'horizontal') {
      charge.setRotation(90 * Phaser.Math.DEG_TO_RAD)
    }

    this.scene.time.delayedCall(1500, () => { charge.destroy() })

  }

  impact(position: Position, type: Type) {
    const impact = new Impact(this.scene, type, position)

    this.scene.time.delayedCall(1500, () => { impact.destroy() })
  }

  wait(delay) {
    this.scene.time.delayedCall(delay * 1000, this.complete, [], this)
    return this
  }

  complete() {
    this.emit('complete')
  }

}