"use strict";

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */
class DatabaseFactory {
  /**
   * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
   * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
   * auch gleich die Verbindung hergestellt.
   *
   * @param {String} connectionUrl URL-String mit den Verbindungsdaten
   */
  async init(connectionUrl) {
    // Datenbankverbindung herstellen
    this.client = new MongoClient(connectionUrl);
    await this.client.connect();
    this.database = this.client.db("adressbook");

    await this._createDemoData();
    await this._createDemoExercises();
    await this._createDemoWorkouts();
  }

  async _createDemoExercises() {
    let exercises = this.database.collection("exercises");

    if ((await exercises.estimatedDocumentCount()) === 0) {
      exercises.insertMany([
        {
          name: "Bankdrücken",
          image: "Musterbild",
          difficulty: "schwer",
          muscleGroup: "Brust",
          description:
            "Lege dich auf eine Flachbank. Positioniere deine Beine etwa schulterbreit auf dem Boden. Greife eine Langhantel etwas breiter als schulterbreit und fixiere deine Schultern. Drücke die Hantel.",
        },
        {
          name: "Kreuzheben",
          image: "Musterbild",
          difficulty: "schwer",
          muscleGroup: "Rücken",
          description: "Ziehe eine Langhantel.",
        },
      ]);
    }
  }

  async _createDemoWorkouts() {
    let exercises = this.database.collection("workouts");
    if ((await exercises.estimatedDocumentCount()) === 0) {
      exercises.insertMany([
        {
          name: "Willy",
          exercises: [
            {
              name: "Kreuzheben",
              image: "Musterbild",
              difficulty: "schwer",
              muscleGroup: "Rücken",
              description: "Ziehe eine Langhantel.",
            },
          ],
        },
      ]);
    }
  }

  /**
   * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
   * Produktivanwendung natürlich nicht machen, aber so sehen wir
   * wenigstens gleich ein paar Daten.
   */
  async _createDemoData() {
    let addresses = this.database.collection("addresses");

    if ((await addresses.estimatedDocumentCount()) === 0) {
      addresses.insertMany([
        {
          first_name: "Willy",
          last_name: "Tanner",
          phone: "+49 711 564412",
          email: "willy.tanner@alf.com",
        },
        {
          first_name: "Michael",
          last_name: "Knight",
          phone: "+49 721 554194",
          email: "michael@knight-rider.com",
        },
        {
          first_name: "Fox",
          last_name: "Mulder",
          phone: "+49 721 553181",
          email: "mulder@xfiles.com",
        },
        {
          first_name: "Dana",
          last_name: "Scully",
          phone: "+49 721 572287",
          email: "scully@xfiles.com",
        },
        {
          first_name: "Elwood",
          last_name: "Blues",
          phone: "+49 721 957338",
          email: "elwood@blues-brothers.com",
        },
      ]);
    }
  }
}

export default new DatabaseFactory();
