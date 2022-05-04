"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Adressen. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Adressen werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class ExerciseService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._exercises = DatabaseFactory.database.collection("exercises");
    }

    /**
     * Adressen suchen. Unterstützt wird lediglich eine ganz einfache Suche,
     * bei der einzelne Felder auf exakte Übereinstimmung geprüft werden.
     * Zwar unterstützt MongoDB prinzipiell beliebig komplexe Suchanfragen.
     * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
     *
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async search(query) {
        let cursor = this._exercises.find(query, {
            sort: {
                name: 1,
                
            }
        });

        return cursor.toArray();
    }

    /**
     * Speichern einer neuen Adresse.
     *
     * @param {Object} exercise Zu speichernde Adressdaten
     * @return {Promise} Gespeicherte Adressdaten
     */
    async create(exercise) {
        exercise = exercise || {};

        let newExercise = {
            name:           exercise.name           || "",
            image:          exercise.image          || "",
            difficulty:     exercise.difficulty     || "",
            muscleGroup:    exercise.muscleGroup    || "",
            description:    exercise.description    || "",
        };

        let result = await this._exercises.insertOne(newExercise);
        return await this._exercises.findOne({_id: result.insertedId});
    }

    /**
     * Auslesen einer vorhandenen Adresse anhand ihrer ID.
     *
     * @param {String} id ID der gesuchten Adresse
     * @return {Promise} Gefundene Adressdaten
     */
    async read(id) {
        let result = await this._exercises.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Aktualisierung einer Adresse, durch Überschreiben einzelner Felder
     * oder des gesamten Adressobjekts (ohne die ID).
     *
     * @param {String} id ID der gesuchten Adresse
     * @param {[type]} exercise Zu speichernde Adressdaten
     * @return {Promise} Gespeicherte Adressdaten oder undefined
     */
    async update(id, exercise) {
        let oldExercise = await this._exercises.findOne({_id: new ObjectId(id)});
        if (!oldExercise) return;

        let updateDoc = {
            $set: {},
        }

        if (exercise.name) updateDoc.$set.name = exercise.name;
        if (exercise.image)  updateDoc.$set.image  = exercise.image;
        if (exercise.difficulty)      updateDoc.$set.difficulty      = exercise.difficulty;
        if (exercise.muscleGroup)      updateDoc.$set.muscleGroup      = exercise.muscleGroup;
        if (exercise.description)      updateDoc.$set.description      = exercise.description;

        await this._exercises.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._exercises.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen einer Adresse anhand ihrer ID.
     *
     * @param {String} id ID der gesuchten Adresse
     * @return {Promise} Anzahl der gelöschten Datensätze
     */
    async delete(id) {
        let result = await this.exercises.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
