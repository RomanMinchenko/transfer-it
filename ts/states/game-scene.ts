import Utils from "../core/utils";
import GameContainer from "../game/game-container";

export default class GameScene extends Phaser.Scene {
  private view: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'Game' });
  }

  public create(): void {
    Utils.registerGame(this);
    this.view = this.add.container();
    this.resize();

    const game: Phaser.GameObjects.Container = new GameContainer(this);
    this.view.add(game);

    this.listenBrowserSignals();
    this.addUpdateToContainers();
  }

  private addUpdateToContainers(): void {
    function update(gameObj: any, delta: number, time: number): void {
      if (gameObj.list) {
        gameObj.onUpdate?.(delta, time);

        for (let i = 0; i < gameObj.list.length; i++) {
          update(gameObj.list[i], delta, time);
        }
      }
    }

    this.events.on('update', (time: number, delta: number) => {
      update(this.view, delta, time);
    });
  }

  private listenBrowserSignals(): void {
    window.onblur = (): void => {
      this.game.sound.mute = true;
    };

    window.onfocus = (): void => {
      this.game.sound.mute = false;
    };

    this.sizeCheck();

    window.addEventListener('onStarted', () => {
      this.scene.resume();
    });
  }

  private sizeCheck(): void {
    const maxCheckTime = 750;
    let startTime: number | null = null;

    let tempWidth = 0;
    let tempHeight = 0;
    let handleId: number | null = null;

    const check = (timestamp: number): void => {
      if (!startTime) {
        startTime = timestamp;
      }

      if (tempWidth !== window.innerWidth || tempHeight !== window.innerHeight) {
        this.refreshSize();

        tempWidth = window.innerWidth;
        tempHeight = window.innerHeight;
      }

      if (timestamp - startTime < maxCheckTime) {
        window.cancelAnimationFrame(handleId);
        handleId = window.requestAnimationFrame(check);
      }
    };

    window.cancelAnimationFrame(handleId);
    handleId = window.requestAnimationFrame(check);

    window.addEventListener("resize", () => {
      startTime = null;
      check(0);
    });
  }

  private refreshSize(): void {
    const blockScreenStyle: any = (<any>document.getElementsByClassName('incorrect-orientation')[0]).style;

    if (Utils.isMobileDevice() && !Utils.LP(false, true)) {
      blockScreenStyle.visibility = 'visible';
      this.scene.pause();
      this.resize();
    } else {
      blockScreenStyle.visibility = 'hidden';
      this.scene.resume();
      this.resize();
    }
  }

  private resize(): void {
    const width: number = window.innerWidth * Utils.getDPI();
    const height: number = window.innerHeight * Utils.getDPI();

    this.game.scale.resize(width, height);

    Utils.fitScale(this.view);
  }
}