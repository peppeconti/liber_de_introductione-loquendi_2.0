import { Injectable } from "@angular/core";
import { Settings } from "./models";

@Injectable({
  providedIn: "root",
})
export class SettingService {
  private settings: Settings = {
    showTranslation: false,
    showApparatus: true,
    showNotes: true,
  };

  getSettings() {
    return this.settings;
  }

  setSettings(key: keyof Settings) {
    this.settings[key] = !this.settings[key];
  }
}
