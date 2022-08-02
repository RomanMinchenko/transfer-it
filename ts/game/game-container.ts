import Localization from "../core/localization";
import Utils from "../core/utils";

export default class GameContainer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  private init(): void {
    this.initBg();
    this.initSprite();
    this.initSpine();
    this.initText();
  }

  private initBg(): void {
    const bg: Phaser.GameObjects.Sprite = Utils.spriteMake(0, 0, 'bg.jpg');
    bg.setScale(Math.max(Utils.FULL_WIDTH / bg.width, Utils.FULL_HEIGHT / bg.height));
    bg.x = Utils.WIDTH * 0.5;
    bg.y = Utils.HEIGHT * 0.5 - Utils.additionalHeight * 0.5;
    this.add(bg);
  }

  private initSprite(): void {
    const crab: Phaser.GameObjects.Sprite = Utils.spriteMake(0, 0, 'crab.png');
    crab.x = Utils.WIDTH * 0.5 + 150;
    crab.y = Utils.HEIGHT - 170;
    crab.setScale(0.5);
    this.add(crab);
  }

  private initSpine(): void {
    const spine: any = Utils.spineMake(0, 0, 'demos.spineboy');
    spine.setScale(0.3);
    spine.setToSetupPose();
    spine.play('idle', true);
    spine.preUpdate(0, 0);
    spine.x = Utils.WIDTH * 0.5 - 150;
    spine.y = Utils.HEIGHT - 100;
    this.add(spine);
  }

  private initText(): void {
    const style = {
      font: '60pt uniform'
    };

    const text: Phaser.GameObjects.Text = Utils.textMake(Utils.WIDTH * 0.5, Utils.HEIGHT * 0.5, 'play........................................', style);
    text.x = Utils.WIDTH * 0.5;
    text.y = Utils.HEIGHT * 0.5;
    text.setOrigin(0.5);
    Localization.fitText(text, 300, 50);
    text.setResolution(1.5);
    this.add(text);

  }
}