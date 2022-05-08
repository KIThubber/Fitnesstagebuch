"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-workout.html";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
//export default class WorkoutSelection extends Page {
export default class WorkoutOverview extends Page {
  /**
   * Konstruktor.
   *
   * @param {App} app Instanz der App-Klasse
   */
  constructor(app) {
    super(app, HtmlTemplate);

    this._emptyMessageElement = null;
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
    this._title = "Workout";

    // Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
    // let data = await this._app.backend.fetch("GET", "/workoutOverview");
    let data = await this._app.backend.fetch("GET", "/workout");
    this._emptyMessageElement =
      this._mainElement.querySelector(".empty-placeholder");

    if (data.length) {
      this._emptyMessageElement.classList.add("hidden");
    }

    // Je Datensatz einen Listeneintrag generieren
    let olElement = this._mainElement.querySelector("ol");

    let templateElement = this._mainElement.querySelector(".list-entry");
    let templateHtml = templateElement.outerHTML;
    templateElement.remove();

    for (let index in data) {
      // Platzhalter ersetzen
      let dataset = data[index];
      let html = templateHtml;

      html = html.replace("$ID$", dataset._id);
      html = html.replace("$NAME$", dataset.name);

      //Element in die Liste einfügen
      let dummyElement = document.createElement("div");
      dummyElement.innerHTML = html;
      let liElement = dummyElement.firstElementChild;
      liElement.remove();
      olElement.appendChild(liElement);

      liElement
        .querySelector(".action.showExcercises")
        .addEventListener(
          "click",
          () => (location.hash = `#/workoutExerciseOverview/${dataset._id}`)
        );
      // }
    }
  }
}
