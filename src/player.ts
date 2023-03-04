
export class Player {
  private scene: Phaser.Scene

  private player: Phaser.GameObjects.Arc

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    this.player = this.scene.add.circle(400, 400, 10, 0x00FF00)
    this.player.setDepth(100)
    this.scene.physics.add.existing(this.player);
    this.player.body
  }

  setDirection(x: number, y: number) {
    this.scene.physics.moveTo(this.player, x, y, 150)
  }

  destroy() {
    this.player.destroy()
  }

}