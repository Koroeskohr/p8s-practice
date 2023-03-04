import 'phaser';
import Sequence from 'phaser3-rex-plugins/plugins/sequence';
import SequencePlugin from 'phaser3-rex-plugins/plugins/sequence-plugin';
import { Player } from './player';
import { generateScenario, Scenario } from './scenario';

export default class Demo extends Phaser.Scene {
  private player: Player
  constructor() {
    super('demo');
  }

  preload() {
    this.load.image('arena', 'assets/arena.jpg');
    this.load.image('charge', 'assets/charge.png');
  }

  create() {
    const arena = this.add.image(400, 400, 'arena');
    arena.setScale(6, 6)

    this.player = new Player(this)

    const sc = new Scenario(this)

    const seq = new Sequence();
    const events = generateScenario()

    seq.load(events, sc)
    seq.start()
  }

  update(time: number, delta: number): void {
    console.log('update')
    this.player.setDirection(this.game.input.mousePointer.x, this.game.input.mousePointer.y)
  }

}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 800,
  scene: Demo,
  plugins: {
    global: [{
      key: 'rexSequence',
      plugin: SequencePlugin,
      start: true
    }]
  },
  physics:{
    default: "arcade",
    arcade: {
      debug: false
    }
  },
};

const game = new Phaser.Game(config);
