import LANGUAGES from "./languages";
import SaveManager from "./save-manager";

let strings: any = {};

class Localization {
  private static curLang: string;
  private static scene: Phaser.Scene;

  public static registerGame(scene: Phaser.Scene): void {
    this.scene = scene;
  }

  public static getLanguage(): string {
    return this.curLang;
  }

  public static setLanguage(value: any): void {
    if (value === '') {
      this.curLang = (navigator.language || (<any>navigator).userLanguage).slice(0, 2);
    } else {
      this.curLang = value.type || value;
    }

    if (langExists(this.curLang) === false) {
      this.curLang = 'en';
    }

    SaveManager.getInstance().langData = this.curLang;

    this.scene.load.json('lang', `locales/locale_${this.curLang}.json`);

    this.scene.load.on('complete', () => {
      strings = this.scene.cache.json.get('lang');
    });
  }

  public static getString(value: string): string {
    const text: string = strings[value] || value;

    return text;
  }

  // eslint-disable-next-line complexity
  public static fitText(text: Phaser.GameObjects.Text, width: number, height: number): void {
    if (!(<any>text).originSize) {
      (<any>text).originSize = text.style.fontSize.replace(/\D/g, '');
    }

    text.style.fontSize = (<any>text).originSize + 'pt';

    if (width > 0 && height > 0) {
      let size: any = (<any>text).originSize;

      while ((text.width > width || text.height > height) && size > 4) {
        size = size - 1;
        text.style.setFontSize(`${size}pt`);
      }
    }
  }
}

function langExists(lang: string): boolean {
  for (const key in LANGUAGES) {
    if (lang === LANGUAGES[key].type) {
      return true;
    }
  }

  return false;
}

export default Localization;
