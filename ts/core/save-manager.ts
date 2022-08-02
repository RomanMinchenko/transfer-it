import GAME_CONFIG from "./game-config";

class SaveManager {
  private static instance: SaveManager;

  private lang: string;

  constructor() {
    if (SaveManager.instance) {
      return;
    }

    SaveManager.instance = this;

    const storageData: any = localStorage.getItem(GAME_CONFIG.STORAGE_KEY);

    if (storageData === null || storageData === undefined) {
      this.lang = '';

      this.save();
    } else {
      this.restore();
    }
  }

  public static getInstance(): SaveManager {
    if (!this.instance) {
      this.instance = new SaveManager();
    }

    return this.instance;
  }

  public clearAll(): void {
    this.langData = '';
  }

  public get langData(): string {
    return this.lang;
  }

  public set langData(value: string) {
    this.lang = value;

    this.save();
  }

  private save(): void {
    const data: string = JSON.stringify({
      lang: this.lang,
    });

    const hash: string = this.hash(data);

    localStorage.setItem(GAME_CONFIG.STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(GAME_CONFIG.STORAGE_KEY + 'h', JSON.stringify(hash));
  }

  private restore(): void {
    const data: any = JSON.parse(localStorage.getItem(GAME_CONFIG.STORAGE_KEY));
    const hash: any = JSON.parse(localStorage.getItem(GAME_CONFIG.STORAGE_KEY + 'h'));

    if (data === '' || hash !== this.hash(data)) {
      return;
    }

    const save: any = JSON.parse(data);

    this.langData = save.lang;

    this.save();
  }

  private hash(data: string): string {
    let hash: number = 0;

    if (data.length === 0) {
      return hash.toString();
    }

    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash |= 0;
    }

    return hash.toString();
  }
}

export default SaveManager;