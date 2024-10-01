import { Component, inject, computed } from "@angular/core";
import { Settings } from "../../../../services/models";
import { SettingService } from "../../../../services/settingService.service";

type Switch = {
  name: string;
  label: string;
  action: keyof Settings;
};

@Component({
  selector: "app-dropdown",
  standalone: true,
  imports: [],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.css",
})
export class DropdownComponent {
  private settingService = inject(SettingService);
  switch_list: Switch[] = [
    { name: "translation", label: "Traduzione", action: "showTranslation" },
    { name: "apparatus", label: "Apparato", action: "showApparatus" },
    { name: "notes", label: "Note", action: "showNotes" },
  ];
  settings = computed<Settings>(() => this.settingService.getSettings());

  handleSettings(key: keyof Settings) {
    this.settingService.setSettings(key);
    //console.log(this.settings());
  }
}
