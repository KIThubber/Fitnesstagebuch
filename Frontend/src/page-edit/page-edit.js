"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-edit.html";

/**
 * Klasse PageEdit: Stellt die Seite zum Anlegen oder Bearbeiten einer Adresse
 * zur Verfügung.
 */
export default class PageEdit extends Page {
  /**
   * Konstruktor.
   *
   * @param {App} app Instanz der App-Klasse
   * @param {Integer} editId ID des bearbeiteten Datensatzes
   */
  constructor(app, editId) {
    super(app, HtmlTemplate);

    // Bearbeiteter Datensatz
    this._editId = editId;

    this._dataset = {
      name: "",
      image: "",
      difficulty: "",
      muscleGroup: "",
      description: "",
    };

    // Eingabefelder
    this._nameInput = null;
    this._imageInput = null;
    this._difficultyInput = null;
    this._muscleGroupInput = null;
    this._descriptionInput = null;
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
    if (this._editId) {
      this._url = `/exercise/${this._editId}`;
      this._dataset = await this._app.backend.fetch("GET", this._url);
      this._title = `${this._dataset.name} ${this._dataset.image}`;
    } else {
      this._url = `/exercise`;
      this._title = "Übung hinzufügen";
    }

    // Platzhalter im HTML-Code ersetzen
    let html = this._mainElement.innerHTML;
    html = html.replace("$NAME$", this._dataset.name);
    html = html.replace("$IMAGE$", this._dataset.image);
    html = html.replace("$DIFFICULTY$", this._dataset.difficulty);
    html = html.replace("$MUSCLEGROUP$", this._dataset.muscleGroup);
    html = html.replace("$DESCRIPTION$", this._dataset.description);

    this._mainElement.innerHTML = html;

    // Event Listener registrieren
    let saveButton = this._mainElement.querySelector(".action.save");
    saveButton.addEventListener("click", () => this._saveAndExit());

    // Eingabefelder zur späteren Verwendung merken
    this._nameInput = this._mainElement.querySelector("input.name");
    this._imageInput = this._mainElement.querySelector("input.image");
    this._difficultyInput = this._mainElement.querySelector("input.difficulty");
    this._muscleGroupInput =
      this._mainElement.querySelector("input.muscleGroup");
    this._descriptionInput =
      this._mainElement.querySelector("input.description");
  }

  /**
   * Speichert den aktuell bearbeiteten Datensatz und kehrt dann wieder
   * in die Listenübersicht zurück.
   */
  async _saveAndExit() {
    // Eingegebene Werte prüfen

    this._dataset._id = this._editId;
    this._dataset.name = this._nameInput.value.trim();
    this._dataset.image = this._imageInput.value.trim();
    this._dataset.difficulty = this._difficultyInput.value.trim();
    this._dataset.muscleGroup = this._muscleGroupInput.value.trim();
    this._dataset.description = this._descriptionInput.value.trim();

    // Datensatz speichern
    try {
      if (this._editId) {
        await this._app.backend.fetch("PUT", this._url, {
          body: this._dataset,
        });
      } else {
        await this._app.backend.fetch("POST", this._url, {
          body: this._dataset,
        });
      }
    } catch (ex) {
      this._app.showException(ex);
      return;
    }

    // Zurück zur Übersicht
    location.hash = "#/";
  }
}
