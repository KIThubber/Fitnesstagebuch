"use strict";

import Page from "../page.js";
import HtmlTemplate from "./workout-selection.html";


export default class WorkoutSelection extends Page {
     /**
   * Konstruktor.
   *
   * @param {App} app Instanz der App-Klasse
   * @param {Integer} exerciseId ID des bearbeiteten Datensatzes
   * 
   */
   
  constructor(app, exerciseId) {
    super(app, HtmlTemplate);

    // Bearbeiteter Datensatz
    this._exerciseId = exerciseId;

    this._dataset = {
      name: "",
      image: "",
      difficulty: "",
      muscleGroup: "",
      description: "",
    };

  
  
}

async init() {
    // HTML-Inhalt nachladen
   
    
    await super.init();
    
    

    // Datensatz laden
    
    //   this._url = `/exercise/${this._exerciseId}`;
    //   this._dataset = await this._app.backend.fetch("GET", this._url);
    //   this._title = `${this._dataset.name} ${this._dataset.image}`;
    
      let { default: WorkoutAddition } = await import(
        "./workoutaddition.js"
      );

      let Additor = new WorkoutAddition(this);
      
      Additor.saveandreturnWorkoutAddition(this._exerciseId, this._app);


}
}