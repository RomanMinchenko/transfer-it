/* eslint-disable no-prototype-builtins */

import GAME_CONFIG from './game-config';
import Localization from './localization';

class Utils {
  public static scene: Phaser.Scene;
  public static font: string;
  public static S: number;
  public static INVS: number;

  private static tempTransformMatrix: Phaser.GameObjects.Components.TransformMatrix

  public static registerGame(scene: Phaser.Scene): void {
    this.scene = scene;
  }

  public static textMake(x: number, y: number, value: string, style?: any): Phaser.GameObjects.Text {
    const fontStyle = style || {
      font: `30pt ${Utils.FONT}`,
      align: 'center',
      color: '#000000'
    };
    const text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, x, y, Localization.getString(value), fontStyle);

    return text;
  }

  public static isIE(): boolean {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ") > 0 || ua.indexOf('rv:11') > 0;

    return msie;
  }

  public static getDPI(): number {
    if (Utils.isIE()) // If Internet Explorer, return version number
    {
      return 1;
    }

    if ((<any>window).screen.deviceXDPI !== undefined || (<any>window).screen.logicalXDPI !== undefined) {
      return (<any>window).screen.deviceXDPI || (<any>window).screen.logicalXDPI;
    }

    return window.devicePixelRatio || 1;
  }

  public static fitScale(container: Phaser.GameObjects.Container): void {
    const canvas: HTMLElement = document.getElementById('phaser_3_template');
    const width: number = document.body.clientWidth * Utils.getDPI();
    const height: number = document.body.clientHeight * Utils.getDPI();

    const sX: number = width / GAME_CONFIG.baseWidth;
    const sY: number = height / GAME_CONFIG.baseHeight;
    const s: number = Math.min(sX, sY);

    container.x = ((<any>canvas).width - GAME_CONFIG.baseWidth * s) * 0.5;
    container.setScale(s);
    container.y = height - GAME_CONFIG.baseHeight * s;

    const onFittedGame = new CustomEvent('onFittedGame');

    Utils.S = s;
    Utils.INVS = 1 / s;

    window.dispatchEvent(onFittedGame);
  }

  public static spineMake(x: number, y: number, key: string, animationName?: string): any {
    const spine: any = (<any>this.scene).make.spine({
      x: x,
      y: y,
      key: key,
      animationName: animationName
    });

    return spine;
  }

  public static spriteMake(x: number, y: number, frameName: string): Phaser.GameObjects.Sprite {
    const sprite: Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      x,
      y,
      this.getAtlas(frameName),
      frameName
    );

    return sprite;
  }

  public static getAtlas(frameName: string): string {
    const data: any = (<any>this.scene.textures).list;

    for (const key in data) {
      for (const keyFrame in data[key].frames) {
        if (data[key].frames.hasOwnProperty(keyFrame) && keyFrame === frameName) {
          return data[key].key;
        }
      }
    }

    console.warn(`FrameName '${frameName}' wasn't found in any of the atlases!`);
  }

  public static isMobileDevice(): boolean {
    let check = false;

    (function (a): void {
      // eslint-disable-next-line no-useless-escape
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor || (<any>window).opera);

    return check;
  }

  public static LP(l: any, p: any): any {
    if (window.innerHeight < window.innerWidth) {
      return l;
    }

    return p;
  }

  static get WIDTH(): number {
    return GAME_CONFIG.baseWidth;
  }

  static get HEIGHT(): number {
    return GAME_CONFIG.baseHeight;
  }

  static get FULL_HEIGHT(): number {
    const height: number = document.body.clientHeight * Utils.getDPI();

    return height;
  }

  static get FULL_WIDTH(): number {
    const width: number = document.body.clientWidth * Utils.getDPI();

    return width;
  }

  static get additionalHeight(): number {
    const height: number = document.body.clientHeight * Utils.getDPI();

    return height - GAME_CONFIG.baseHeight * Utils.S;
  }

  static get additionalWidth(): number {
    const width: number = document.body.clientWidth * Utils.getDPI();

    return (width - GAME_CONFIG.baseWidth * Utils.S) * 0.5;
  }

  static get centerView(): any {
    const y: number = Utils.additionalHeight + (Utils.HEIGHT * 0.5) * Utils.S;
    const x: number = Utils.additionalWidth + (Utils.WIDTH * 0.5) * Utils.S;

    return { x, y };
  }

  static get leftOffset(): number {
    return Utils.additionalWidth / Utils.S;
  }

  static get topOffset(): number {
    return Utils.additionalHeight / Utils.S;
  }

  static get FONT(): string {
    return this.font;
  }

  static set FONT(value: string) {
    this.font = value;
  }

  public static lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  public static separate(x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public static toLocal(
    toContainer: Phaser.GameObjects.Container,
    sourceVec: { x: number, y: number }, //any object with x and y properties
    fromContainer?: Phaser.GameObjects.Container //container of sourceVec positions, optional, default - world
  ): Phaser.Math.Vector2 {
    if (!fromContainer) {
      return toContainer.getWorldTransformMatrix()
        .applyInverse(sourceVec.x, sourceVec.y);
    }

    if (!this.tempTransformMatrix) {
      this.tempTransformMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    }

    this.tempTransformMatrix.copyFrom(fromContainer.getWorldTransformMatrix());
    this.tempTransformMatrix.invert();

    const resultVec = this.tempTransformMatrix.applyInverse(sourceVec.x, sourceVec.y);

    return toContainer.getWorldTransformMatrix()
      .applyInverse(resultVec.x, resultVec.y, resultVec);
  }
}

export default Utils;
