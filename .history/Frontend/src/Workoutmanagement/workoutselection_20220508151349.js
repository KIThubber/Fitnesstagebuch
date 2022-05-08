"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-workouthinzufuegen.html";


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
    
    let answer = confirm(
        "swaglord"
        //test.exercises[index]
      );
      if (!answer) return;

    // Datensatz laden
    
    this._url = `/exercise/${this._exerciseId}`;
    this._dataset = await this._app.backend.fetch("GET", this._url);
    //this._title = `${this._dataset.name} ${this._dataset.image}`;
   
    

    let { default: WorkoutOverviewhinzufuegen } = await import(
        "./page-workouthinzufuegen.js"
      );

    let page = new WorkoutOverviewhinzufuegen(this._app,this._dataset);

  

    await page.init();

    liElement
    .querySelector(".action.addToWorkout")
    .addEventListener(
        "click",
        () => (location.hash = `#/workout`)
    );
        
         


    //   let { default: WorkoutAddition } = await import(
    //     "./workoutaddition.js"
    //   );


      
    //   let Additor = new WorkoutAddition(this);
    //   Additor.saveandreturnWorkoutAddition(this._dataset, this._app);


}
}