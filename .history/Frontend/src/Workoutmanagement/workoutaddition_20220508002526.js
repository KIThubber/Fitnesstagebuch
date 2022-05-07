

export default class WorkoutAddition{

/**
   * Konstruktor.
   *
   * 
   * @param {Integer} workoutId ID des bearbeiteten Datensatzes
   * 
   */
    
    constructor(workoutId){

        this._workoutId = workoutId;
        
        this._url = `/workout/${workoutId}`;

        this._dataset = {
        name: "",
        exercises: [""],
        };


    }



    async saveandreturnWorkoutAddition(exercisedataset, app){

        //url = `/exercise/${exerciseId}`;
        //this._dataset = await app.backend.fetch("GET", url);
        //this._title = `${this._dataset.name} ${this._dataset.image}`;

    this._app = app;     
    this._dataset._id = this._workoutId;
    this._dataset.name = this.name;
    this._dataset.exercises = this._dataset.exercises.push(exercisedataset);
   

    // Datensatz speichern
    try {
      if (this._workoutId) {
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