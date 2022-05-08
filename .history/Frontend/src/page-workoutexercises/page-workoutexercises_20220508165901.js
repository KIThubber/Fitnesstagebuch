"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-workoutexercises.html";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
export default class PageWorkoutExercise extends Page {
  /**
   * Konstruktor.
   *
   * @param {App} app Instanz der App-Klasse
   * @param {workoutId} workoutId
   */
  constructor(app,workoutId) {
    super(app, HtmlTemplate);




    this._workoutId = workoutId;
    
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
    let answer = confirm(
        "dataasas"
        //test.exercises[index]
      );
      if (!answer) return;

    await super.init();
    this._title = "Übersicht";

    this._url = `/workout/${this._workoutId}`;
    
    

    // Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
    let data = await this._app.backend.fetch("GET", this._url);

    

    this._emptyMessageElement =
      this._mainElement.querySelector(".empty-placeholder");

    if (data.exercises.length) {
      this._emptyMessageElement.classList.add("hidden");
    }

    // Je Datensatz einen Listeneintrag generieren
    let olElement = this._mainElement.querySelector("ol");

    let templateElement = this._mainElement.querySelector(".list-entry");
    let templateHtml = templateElement.outerHTML;
    templateElement.remove();

    for (let index in data.exercises) {
      // Platzhalter ersetzen
      let dataset = data[index];
      let html = templateHtml;

      html = html.replace("$ID$", dataset._id);
      html = html.replace("$NAME$", dataset.name);
      html = html.replace("$IMAGE$", dataset.image);
      html = html.replace("$DIFFICULTY$", dataset.difficulty);
      html = html.replace("$MUSCLEGROUP$", dataset.muscleGroup);
      html = html.replace("$DESCRIPTION$", dataset.description);

      // Element in die Liste einfügen
      let dummyElement = document.createElement("div");
      dummyElement.innerHTML = html;
      let liElement = dummyElement.firstElementChild;
      liElement.remove();
      olElement.appendChild(liElement);

      // Event Handler registrieren
    //   liElement
    //     .querySelector(".action.edit")
    //     .addEventListener(
    //       "click",
    //       () => (location.hash = `#/edit/${dataset._id}`)
    //     );
    //   liElement
    //     .querySelector(".action.delete")
    //     .addEventListener("click", () => this._askDelete(dataset._id));

    //   liElement
    //     .querySelector(".action.description")
    //     .addEventListener(
    //       "click",
    //       () => (location.hash = `#/description/${dataset._id}`)
    //     );
    //   liElement
    //     .querySelector(".action.addToWorkout")
    //     .addEventListener(
    //       "click",
    //       () => (location.hash = `#/workout/${dataset._id}`)
    //     );
    }
  }

  /**
   * Löschen der übergebenen Adresse. Zeigt einen Popup, ob der Anwender
   * die Adresse löschen will und löscht diese dann.
   *
   * 
   */
//   async _askDelete(id) {
//     // Sicherheitsfrage zeigen

//     let answer = confirm(
//       "Soll die ausgewählte Übung wirklich gelöscht werden?"
//     );
//     if (!answer) return;

//     // Datensatz löschen
//     try {
//       this._app.backend.fetch("DELETE", `/exercise/${id}`);
//     } catch (ex) {
//       this._app.showException(ex);
//       return;
//     }

//     // HTML-Element entfernen
//     this._mainElement.querySelector(`[data-id="${id}"]`)?.remove();

//     if (this._mainElement.querySelector("[data-id]")) {
//       this._emptyMessageElement.classList.add("hidden");
//     } else {
//       this._emptyMessageElement.classList.remove("hidden");
//     }
//   }
}
