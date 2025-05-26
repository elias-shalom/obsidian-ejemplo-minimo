import { Plugin } from "obsidian";
import { ExampleSettingTab } from "./settings/example-setting-tab";
import {
	DEFAULT_SETTINGS,
	ExamplePluginSettings,
} from "./types/interfaces";

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  async onload(): Promise<void>{

    try {
      await this.loadStyles();

      await this.loadSettings();

      this.addSettingTab(new ExampleSettingTab(this.app, this));

      console.log("Hello World! This is my first plugin!");
      this.addRibbonIcon("dice", "Sample Plugin", () => {
          console.log("This is my first plugin!");
      });
    } catch (error) {
      console.error("Error al cargar el plugin:", error);
    }
      
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /**
  * Carga los estilos CSS del plugin
  * @returns Promesa que se resuelve cuando los estilos se han cargado
  */
  private async loadStyles(): Promise<void> {
    try {
      const cssPath = this.app.vault.adapter.getResourcePath(
        '.obsidian/plugins/obsidian-agenda/styles/styles.css'
      );
      const response = await fetch(cssPath);

      if (response.ok) {
        const cssContent = await response.text();
        const style = document.createElement("style");
        style.textContent = cssContent;
        document.head.appendChild(style);
        console.info("Archivo CSS cargado correctamente.");
      } else {
        console.error("Error al cargar el archivo CSS:", response.statusText);
      }
    } catch (error) {
      console.error(`Error al cargar estilos CSS: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  onunload() {
      console.log('Descargando mi plugin');
      // Limpiar recursos si es necesario
  }

}
