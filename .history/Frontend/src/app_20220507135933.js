"use strict";

import Backend from "./backend.js";
import Router from "./router.js";
import "./app.css";

/**
 * Hauptklasse App: Steuert die gesamte Anwendung
 *
 * Diese Klasse erzeugt den Single Page Router zur Navigation innerhalb
 * der Anwendung und ein Datenbankobjekt zur Verwaltung der Adressliste.
 * Darüber hinaus beinhaltet sie verschiedene vom Single Page Router
 * aufgerufene Methoden, zum Umschalten der aktiven Seite.
 */
class App {
  /**
   * Konstruktor.
   */
  constructor() {
    // Datenbank-Klasse zur Verwaltung der Datensätze
    this.backend = new Backend();

    // Single Page Router zur Steuerung der sichtbaren Inhalte
    this.router = new Router([
      {
        url: "^/$",
        show: () => this._gotoList(),
      },
      {
        url: "^/new/$",
        show: () => this._gotoNew(),
      },
      {
        url: "^/edit/(.*)$",
        show: (matches) => this._gotoEdit(matches[1]),
      },
      {
        url: "^/description/(.*)$",
        show: (matches) => -this._gotoDescription(matches[1]),
      },
      {
        url: "^/workout/(.*)$",
        show: (matches) => -this._gotoWorkout(matches[1]),
      },
      {
        url: "^/workoutOverview/(.*)$",
        show: (matches) => -this._gotoWorkoutOverview(matches[1]),
      },
      //last one
      
      {
        url: ".*",
        show: () => this._gotoList(),
      },
    ]);

    // Fenstertitel merken, um später den Name der aktuellen Seite anzuhängen
    this._documentTitle = document.title;

    // Von dieser Klasse benötigte HTML-Elemente
    this._pageCssElement = document.querySelector("#page-css");
    this._bodyElement = document.querySelector("body");
    this._menuElement = document.querySelector("#app-menu");
  }

  /**
   * Initialisierung der Anwendung beim Start. Im Gegensatz zum Konstruktor
   * der Klasse kann diese Methode mit der vereinfachten async/await-Syntax
   * auf die Fertigstellung von Hintergrundaktivitäten warten, ohne dabei
   * mit den zugrunde liegenden Promise-Objekten direkt hantieren zu müssen.
   */
  async init() {
    try {
      await this.backend.init();
      this.router.start();
    } catch (ex) {
      this.showException(ex);
    }
  }

  /**
   * Übersichtsseite anzeigen. Wird vom Single Page Router aufgerufen.
   */
  async _gotoList() {
    try {
      // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
      let { default: PageList } = await import("./page-list/page-list.js");

      let page = new PageList(this);
      await page.init();
      this._showPage(page, "list");
    } catch (ex) {
      this.showException(ex);
    }
  }

  /**
   * Seite zum Anlegen einer neuen Übung anzeigen.  Wird vom Single Page
   * Router aufgerufen.
   */
  async _gotoNew() {
    try {
      // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
      let { default: PageEdit } = await import("./page-edit/page-edit.js");

      let page = new PageEdit(this);
      await page.init();
      this._showPage(page, "new");
    } catch (ex) {
      this.showException(ex);
    }
  }

  /**
   * Seite zum Bearbeiten einer Übung anzeigen.  Wird vom Single Page
   * Router aufgerufen.
   *
   * @param {Number} id ID der zu bearbeitenden Adresse
   */
  async _gotoEdit(id) {
    try {
      // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
      let { default: PageEdit } = await import("./page-edit/page-edit.js");

      let page = new PageEdit(this, id);
      await page.init();
      this._showPage(page, "edit");
    } catch (ex) {
      this.showException(ex);
    }
  }

  /**
   * Seite zum lesen einer neuen Übung.  Wird vom Single Page
   * Router aufgerufen.
   */
  async _gotoDescription(id) {
    try {
      console.log("test");

      // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
      let { default: PageDescription } = await import(
        "./page-description/page-description.js"
      );

      let page = new PageDescription(this, id);
      await page.init();
      this._showPage(page, "description");
    } catch (ex) {
      this.showException(ex);
    }
  }

   /**
   * Seite zum Bearbeiten einer Übung anzeigen.  Wird vom Single Page
   * Router aufgerufen.
   *
   * @param {Number} id ID der zu bearbeitenden Adresse
   */
  async _gotoWorkout(id) {
    
    
    try {
      // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
      let { default: WorkoutSelection } = await import(
        "./Workoutmanagement/workoutselection.js"
      );

      let page = new WorkoutSelection(this, id);
      await page.init();
      this._showPage(page, "Workout");
    } catch (ex) {
      this.showException(ex);
    }
  }

    /**
   * Seite zum Bearbeiten einer Übung anzeigen.  Wird vom Single Page
   * Router aufgerufen.
   *
   * @param {Number} id ID der zu bearbeitenden Adresse
   */
  async _gotoWorkoutOverview(id) {
    try {
      // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
      let { default: PageWorkout } = await import(
        "./page-workout/page-workout.js"
      );
  
      let page = new PageWorkout(this, id);
      await page.init();
      this._showPage(page, "workoutOverview");
    } catch (ex) {
      this.showException(ex);
    }
  }

  
//}
  /**
   * Interne Methode zum Umschalten der sichtbaren Seite.
   *
   * @param  {Page} page Objekt der anzuzeigenden Seiten
   * @param  {String} name Name zur Hervorhebung der Seite im Menü
   */
  _showPage(page, name) {
    // Fenstertitel aktualisieren
    document.title = `${this._documentTitle} – ${page.title}`;

    // Stylesheet der Seite einfügen
    this._pageCssElement.innerHTML = page.css;

    // Aktuelle Seite im Kopfbereich hervorheben
    this._menuElement
      .querySelectorAll("li")
      .forEach((li) => li.classList.remove("active"));
    this._menuElement
      .querySelectorAll(`li[data-page-name="${name}"]`)
      .forEach((li) => li.classList.add("active"));

    // Sichtbaren Hauptinhalt austauschen
    this._bodyElement.querySelector("main")?.remove();
    this._bodyElement.appendChild(page.mainElement);
  }

  /**
   * Hilfsmethode zur Anzeige eines Ausnahmefehlers. Der Fehler wird in der
   * Konsole protokolliert und als Popupmeldung angezeigt.
   *
   * @param {Object} ex Abgefangene Ausnahme
   */
  showException(ex) {
    console.error(ex);

    if (ex.message) {
      alert(ex.message);
    } else {
      alert(ex.toString());
    }
  }
}

/**
 * Anwendung starten
 */
window.addEventListener("load", async () => {
  let app = new App();
  await app.init();
});
