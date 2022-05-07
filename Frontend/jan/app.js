// Error statt neuer Globaler Variable
"use strict";

import database from "../../Backend/src/database";


class App{
    constructor() {
        // Datenbank-Klasse zur Verwaltung der Datensätze
        this.database = new Database();

        // Single Page Workout
        this.workout = new Workout([
            {
                // Übersicht über vorhandene Workouts (indexWorkoutOverview)
                url: "^/$",
                show: () => this._gotoList()
            },{
                // Erstelle neues Workout
                url: "^/new/$",
                show: () => this._gotoNew()
            },{
                // Bearbeite ein vorhandenes Workout (löschen und hinzufügen von Workouts)
                url: "^/edit/(.*)$",
                show: matches => this._gotoEdit(matches[1]),
            },{
                url: ".*",
                show: () => this._gotoList()
            },
        ]);

        // Fenstertitel merken, um später den Name der aktuellen Seite anzuhängen
        this._documentTitle = document.title;

        // Von dieser Klasse benötigte HTML-Elemente
        this._pageCssElement = document.querySelector("#page-css");
        this._bodyElement = document.querySelector("body");
        this._menuElement = document.querySelector("#app-menu");
    }
    // Initialisierung bei Start
    async init() {
        await this.database.init();
        this.workout.start();
    }

    /**
     * Übersichtsseite der Workouts anzeigen
     */
     async _gotoList() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: PageList} = await import("../src/page-list/page-list");

            let page = new PageList(this);
            await page.init();
            this._showPage(page, "list");
        } catch (ex) {
            this._showException(ex);
        }
    }

    /**
     * Neues Workout anlegen
     */
    async _gotoNew() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: PageEdit} = await import("../src/page-edit/page-edit");

            let page = new PageEdit(this);
            await page.init();
            this._showPage(page, "new");
        } catch (ex) {
            this._showException(ex);
        }
    }

    /**
     * Seite zum Bearbeiten einer Workouts anzeigen.  
     * @param {Number} id ID der zu bearbeitenden Workouts
     */
    async _gotoEdit(id) {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: PageEdit} = await import("../src/page-edit/page-edit");

            let page = new PageEdit(this, id);
            await page.init();
            this._showPage(page, "edit");
        } catch (ex) {
            this._showException(ex);
        }
    }
}