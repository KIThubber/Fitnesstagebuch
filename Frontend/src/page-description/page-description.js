"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-description.html";

/**
 * Klasse PageDescription: Stellt die Seite zum Durchlesen der Übung dar
 */
export default class PageDescription extends Page {
  /**
   * Konstruktor.
   *
   * @param {App} app Instanz der App-Klasse
   * @param {Integer} descriptionId ID des bearbeiteten Datensatzes
   */
  constructor(app, descriptionId) {
    super(app, HtmlTemplate);

    // Bearbeiteter Datensatz
    this._descriptionId = descriptionId;
  }

  /**
   * HTML-Inhalt und anzuzeigende Daten laden.
   *
   * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit
   * dem <main>-Element aus der nachgeladenen HTML-Datei versorgt. Dieses
   * Element wird dann auch von der App-Klasse verwendet, um die Seite
   * anzuzeigen. Hier muss daher einfach mit dem üblichen DOM-Methoden
   * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte
   * zu beeinflussen.
   *
   * HINWEIS: In dieser Version der App wird mit dem üblichen DOM-Methoden
   * gearbeitet, um den finalen HTML-Code der Seite zu generieren. In größeren
   * Apps würde man ggf. eine Template Engine wie z.B. Nunjucks integrieren
   * und den JavaScript-Code dadurch deutlich vereinfachen.
   */

  async init() {
    // HTML-Inhalt nachladen
    await super.init();

    // Bearbeiteten Datensatz laden
    if (this._descriptionId) {
      this._url = `/exercise/${this._descriptionId}`;
      this._dataset = await this._app.backend.fetch("GET", this._url);
      this._title = `${this._dataset.name} ${this._dataset.image}`;
    } else {
      this._url = `/exercise`;
      this._title = "Beschreibung";
    }

    // Platzhalter im HTML-Code ersetzen
    let html = this._mainElement.innerHTML;
    html = html.replace("$NAME$", this._dataset.name);
    html = html.replace("$IMAGE$", this._dataset.image);
    html = html.replace("$DIFFICULTY$", this._dataset.difficulty);
    html = html.replace("$MUSCLEGROUP$", this._dataset.muscleGroup);
    html = html.replace("$DESCRIPTION$", this._dataset.description);

    this._mainElement.innerHTML = html;
  }
}
