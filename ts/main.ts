import 'phaser';
import * as Loader from 'webfontloader';
import GAME_CONFIG from './core/game-config';
import PreloaderScene from './states/preloader-scene';
import GameScene from './states/game-scene';
import Utils from './core/utils';

const FontsLoader = {};
const googleFonts: string[] = [];
const localFonts: string[] = ['uniform'];

(<any>FontsLoader).load = (callback: any): void => {
  const config = {
    active: (): void => {
      if (document.readyState === 'complete') {
        callback();
      } else {
        window.addEventListener('load', () => {
          callback();
        });
      }

      console.log('Fonts loaded');
    },
    fontactive: (): void => {
      localFonts.forEach((name: string) => activateFonts(name));
    },
    custom: {
      families: localFonts
    }
  };

  if (googleFonts.length > 0) {
    (<any>config).google = {
      families: googleFonts
    };
  } else {
    localFonts.forEach((name: string) => activateFonts(name));
  }

  Loader.load(config);
};

function activateFonts(familyName: string): void {
  const element: HTMLStyleElement = document.createElement('style');

  document.head.appendChild(element);

  const sheet: CSSStyleSheet = element.sheet;
  
  const styles: string = `@font-face {
    font-family: "${familyName}";
    src: url("fonts/${familyName}.woff");
    format("woff"); }\n`;
  sheet.insertRule(styles, 0);

}

class Main extends Phaser.Game {
  constructor(GAME_CONFIG: any) {
    super(GAME_CONFIG);

    this.canvas.id = 'phaser_3_template';

    this.scene.add('Game', GameScene);
    this.scene.add('Preloader', PreloaderScene, true);
  }
}

window.addEventListener('load', () => {
  let isLoaded: boolean = false;

  const startLoad = (): void => {
    isLoaded = true;

    (<any>document.getElementsByClassName('incorrect-orientation')[0]).style.visibility = 'hidden';

    (<any>FontsLoader).load(
      () => {
        new Main(GAME_CONFIG);
      });
  };

  if (Utils.isMobileDevice() && Utils.LP(true, false)) {
    const blockScreen = document.getElementsByClassName('incorrect-orientation')[0];
    const style: any = (<any>blockScreen).style;
    style.visibility = 'visible';

    window.addEventListener('resize', () => {

      if (isLoaded === false && Utils.LP(false, true)) {
        document.location.reload();
      }
    });
  } else {
    startLoad();
  }
});
