

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

        this._dataset = {
        name: "",
        exercises: [""],
        };


    }



    async saveandreturnWorkoutAddition(exerciseId, app){

        url = `/exercise/${exerciseId}`;
        this._dataset = await app.backend.fetch("GET", url);
        //this._title = `${this._dataset.name} ${this._dataset.image}`;

        exerciseId 
        	

    }
}