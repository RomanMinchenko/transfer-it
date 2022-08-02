import 'phaser/plugins/spine/dist/SpinePlugin';

declare const SpinePlugin: any;
const BASE_WIDTH: number = 720;
const BASE_HEIGHT: number = 1280;

const GAME_CONFIG: any = {
  baseWidth: BASE_WIDTH,
  baseHeight: BASE_HEIGHT,
  width: BASE_WIDTH > window.innerWidth ? window.innerWidth : BASE_WIDTH,
  height: BASE_HEIGHT > window.innerHeight ? window.innerHeight : BASE_HEIGHT,
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: SpinePlugin, start: true, sceneKey: 'spine', mapping: 'spine' }
    ]
  },
  STORAGE_KEY: 'phaser_3_template'
};

export default GAME_CONFIG;