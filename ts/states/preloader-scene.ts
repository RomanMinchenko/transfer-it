import Localization from '../core/localization';
import SaveManager from '../core/save-manager';
import Utils from '../core/utils';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  public preload(): void {
    const atlases = ['assets', 'bg'];
    const sounds = ['test.mp3'];
    const spines = ['demos'];

    Utils.FONT = 'Baloo 2';
    Localization.registerGame(this);
    Localization.setLanguage(SaveManager.getInstance().langData);
    SaveManager.getInstance().clearAll();

    atlases.forEach((name) => {
      this.load.setPath('textures/');
      this.load.multiatlas(name, `${name}.json`);
    });

    sounds.forEach(sound => {
      this.load.setPath('audio/');
      this.load.audio(sound, [`${sound}.mp3`]);
    });

    spines.forEach(spine => {
      this.load.setPath('spines/');
      (<any>this.load).spine(`${spine}`, `${spine}.json`, [`${spine}.atlas`], true);
    });

    this.load.on('complete', () => {
      this.loadComplete();
    });

  }

  private loadComplete(): void {
    this.scene.start('Game');
  }
}
