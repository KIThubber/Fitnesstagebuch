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

    //await this._createDemoData();
    await this._createDemoExercises();
    await this._createDemoWorkouts();
  }

  async _createDemoExercises() {
    let exercises = this.database.collection("exercises");
    // <p></p>
    if ((await exercises.estimatedDocumentCount()) === 0) {
      exercises.insertMany([
        // dummy
        // {
        //   name: "",
        //   image: "Musterbild",
        //   difficulty: "",
        //   muscleGroup: "",
        //   description: "<p>1. </p><p>2. </p><p>3. </p><p>4.</p>",
        // },

        {
          name: "Bankdrücken mit Langhantel",
          image: "Musterbild",
          difficulty: "Mittel",
          muscleGroup: "Brust",
          description:
            "<p>1. Legen Sie sich mit den Füßen auf dem Boden flach auf die Bank. Mit gestreckten Armen die Stange lösen.</p><p>2. Senken Sie die Stange auf Ihre mittlere Brust.</p><p>3. Heben Sie die Stange, bis Sie Ihre Ellbogen gesperrt haben.</p>",
        },
        {
          name: "Schrägbankdrücken mit Langhantel",
          image: "Musterbild",
          difficulty: "Mittel",
          muscleGroup: "Brust",
          description:
            "<p>1. Positionieren Sie die Bank zwischen 30 und 45 Grad.</p><p>2. Legen Sie sich mit den Füßen auf dem Boden flach auf die Bank. Mit gestreckten Armen die Stange lösen.</p><p>3. Senken Sie die Stange auf Ihre mittlere Brust</p><p>4. Heben Sie die Stange (langsam und kontrolliert) an, bis Sie Ihre Ellbogen gestreckt haben.</p>",
        },
        {
          name: "Kreuzheben",
          image: "Musterbild",
          difficulty: "Fortgeschritten",
          muscleGroup: "Rücken",
          description: "<p>1. Stellen Sie sich mit dem Mittelfuß unter die Stange und greifen Sie die Stange mit den Händen etwa schulterbreit auseinander.</p><p>2. Beugen Sie Ihre Knie und heben Sie dann die Stange an, indem Sie Ihren Rücken strecken. Es ist wichtig, den Rücken gerade zu halten.</p><p>3. Stehen Sie zu Ihrer vollen Höhe und halten Sie.</p><p>4.Senken Sie die Stange auf den Boden, indem Sie Ihre Knie beugen und Ihren Rücken gerade halten.</p>",
        },
        {
          name: "Langhantelrudern vorgebeugt",
          image: "Musterbild",
          difficulty: "Mittel",
          muscleGroup: "Rücken",
          description: "<p>1. Greifen Sie eine Langhantel mit einem schulterbreiten pronierten oder supinierten Griff.</p><p>2. Beuge dich an deinen Hüften nach vorne, während du einen flachen Rücken behältst.</p><p>3. Ziehen Sie das Gewicht in Richtung Oberbauch.</p><p>4. Senken Sie das Gewicht kontrolliert ab und wiederholen Sie den Vorgang.</p>",
        },
        {
          name: "Squat",
          image: "Musterbild",
          difficulty: "Fortgeschritten",
          muscleGroup: "Beine",
          description: "<p>1. Stellen Sie sich mit den Füßen schulterbreit auseinander. Behalten Sie die natürliche Wölbung in Ihrem Rücken bei, drücken Sie Ihre Schulterblätter zusammen und heben Sie Ihre Brust an.</p><p>2. Greifen Sie die Stange über Ihre Schultern und stützen Sie sie auf Ihrem oberen Rücken ab. Lösen Sie die Stange, indem Sie Ihre Beine strecken, und treten Sie einen Schritt zurück.</p><p>3. Beugen Sie Ihre Knie, während Sie das Gewicht senken, ohne die Form Ihres Rückens zu verändern, bis sich Ihre Hüften unter Ihren Knien befinden.</p><p>4. Heben Sie die Stange zurück in die Ausgangsposition, heben Sie sie mit den Beinen an und atmen Sie oben aus.</p>",
        },
        {
          name: "Wadenheben im Sitzen",
          image: "Musterbild",
          difficulty: "Leicht",
          muscleGroup: "Beine",
          description: "<p>1. Machen Sie es sich auf der Maschine bequem und legen Sie dann Ihre Unterschenkel unter den gepolsterten Hebel. Stellen Sie Ihre Zehen und Fußballen auf die Fußstützen.</p><p>2. Verhindern Sie, dass das Gewicht nach vorne rutscht, indem Sie die Griffe greifen, und lösen Sie den Sicherheitsbügel. Senken Sie das Gewicht, bis Ihre Waden gestreckt sind.</p><p>3.Drücken Sie Ihre Fersen nach oben, um den gepolsterten Hebel anzuheben und die kontrahierte Position zu halten, und senken Sie sich dann langsam wieder in die Ausgangsposition ab. Wiederholen.</p>",
        },
        {
          name: "Ausfallschritt Kettlebell",
          image: "Musterbild",
          difficulty: "Leicht",
          muscleGroup: "Beine",
          description: "<p>1. Stellen Sie sich aufrecht hin, die Füße leicht auseinander und halten Sie eine Kettlebell in einer Hand.</p><p>2. Bringen Sie dasselbe Bein wie den Arm, der die Kettlebell hält, vor sich, gehen Sie in die Hocke, bis Ihr Oberschenkel parallel zum Boden ist, und halten Sie Ihren Rücken gerade.</p><p>3. Zurück in die Ausgangsposition und wiederholen.</p>",
        },
        {
          name: "Beinpresse",
          image: "Musterbild",
          difficulty: "Mittel",
          muscleGroup: "Beine",
          description: "<p>1. Stellen Sie Ihre Beine schulterbreit auf die Plattform.</p><p>2. Lassen Sie das Gewicht los und strecken Sie Ihre Beine vollständig aus, ohne Ihre Knie zu sperren.</p><p>3. Senken Sie das Gewicht ab, bis sich Ihre Beine in einem 90°-Winkel befinden (aber lassen Sie NICHT zu, dass sich Ihr Gesäß und Ihr unterer Rücken vom Polster abheben. Dadurch wird Ihr unterer Rücken in eine runde Position gebracht, was sehr gefährlich ist.)</p><p>4. Drücken Sie das Gewicht zurück in die Ausgangsposition.</p>",
        },
        {
            name: "Bizepscurls",
            image: "Musterbild",
            difficulty: "Leicht",
            muscleGroup: "Arme",
            description: "<p>1. Stellen Sie Ihre Beine schulterbreit auf die Plattform und curlen sie was das Zeug hält.<p>",
          },
      ]);
    }
  }

  async _createDemoWorkouts() {
    let workouts = this.database.collection("workouts");
    if ((await workouts.estimatedDocumentCount()) === 0) {
      workouts.insertMany([
        {
          name: "Push",
          exercises: [
            {
              name: "Bankdrücken mit Langhantel",
                image: "Musterbild",
                difficulty: "Mittel",
                muscleGroup: "Brust",
                description:
                  "<p>1. Legen Sie sich mit den Füßen auf dem Boden flach auf die Bank. Mit gestreckten Armen die Stange lösen.</p><p>2. Senken Sie die Stange auf Ihre mittlere Brust.</p><p>3. Heben Sie die Stange, bis Sie Ihre Ellbogen gesperrt haben.</p>",
              },
              {
                name: "Schrägbankdrücken mit Langhantel",
                image: "Musterbild",
                difficulty: "Mittel",
                muscleGroup: "Brust",
                description:
                  "<p>1. Positionieren Sie die Bank zwischen 30 und 45 Grad.</p><p>2. Legen Sie sich mit den Füßen auf dem Boden flach auf die Bank. Mit gestreckten Armen die Stange lösen.</p><p>3. Senken Sie die Stange auf Ihre mittlere Brust</p><p>4. Heben Sie die Stange (langsam und kontrolliert) an, bis Sie Ihre Ellbogen gestreckt haben.</p>",
            },
          ],
        },
        {
          name: "Pull",
          exercises: [
            {
              name: "Kreuzheben",
              image: "Musterbild",
              difficulty: "Fortgeschritten",
              muscleGroup: "Rücken",
              description: "<p>1. Stellen Sie sich mit dem Mittelfuß unter die Stange und greifen Sie die Stange mit den Händen etwa schulterbreit auseinander.</p><p>2. Beugen Sie Ihre Knie und heben Sie dann die Stange an, indem Sie Ihren Rücken strecken. Es ist wichtig, den Rücken gerade zu halten.</p><p>3. Stehen Sie zu Ihrer vollen Höhe und halten Sie.</p><p>4.Senken Sie die Stange auf den Boden, indem Sie Ihre Knie beugen und Ihren Rücken gerade halten.</p>",
            },
            {
              name: "Langhantelrudern vorgebeugt",
              image: "Musterbild",
              difficulty: "Mittel",
              muscleGroup: "Rücken",
              description: "<p>1. Greifen Sie eine Langhantel mit einem schulterbreiten pronierten oder supinierten Griff.</p><p>2. Beuge dich an deinen Hüften nach vorne, während du einen flachen Rücken behältst.</p><p>3. Ziehen Sie das Gewicht in Richtung Oberbauch.</p><p>4. Senken Sie das Gewicht kontrolliert ab und wiederholen Sie den Vorgang.</p>",
            
            },
          ],
        },
        {
          name: "Legs",
          exercises: [
            {
              name: "Squat",
              image: "Musterbild",
              difficulty: "Fortgeschritten",
              muscleGroup: "Beine",
              description: "<p>1. Stellen Sie sich mit den Füßen schulterbreit auseinander. Behalten Sie die natürliche Wölbung in Ihrem Rücken bei, drücken Sie Ihre Schulterblätter zusammen und heben Sie Ihre Brust an.</p><p>2. Greifen Sie die Stange über Ihre Schultern und stützen Sie sie auf Ihrem oberen Rücken ab. Lösen Sie die Stange, indem Sie Ihre Beine strecken, und treten Sie einen Schritt zurück.</p><p>3. Beugen Sie Ihre Knie, während Sie das Gewicht senken, ohne die Form Ihres Rückens zu verändern, bis sich Ihre Hüften unter Ihren Knien befinden.</p><p>4. Heben Sie die Stange zurück in die Ausgangsposition, heben Sie sie mit den Beinen an und atmen Sie oben aus.</p>",
              },
              {
                name: "Wadenheben im Sitzen",
                image: "Musterbild",
                difficulty: "Leicht",
                muscleGroup: "Beine",
                description: "<p>1. Machen Sie es sich auf der Maschine bequem und legen Sie dann Ihre Unterschenkel unter den gepolsterten Hebel. Stellen Sie Ihre Zehen und Fußballen auf die Fußstützen.</p><p>2. Verhindern Sie, dass das Gewicht nach vorne rutscht, indem Sie die Griffe greifen, und lösen Sie den Sicherheitsbügel. Senken Sie das Gewicht, bis Ihre Waden gestreckt sind.</p><p>3.Drücken Sie Ihre Fersen nach oben, um den gepolsterten Hebel anzuheben und die kontrahierte Position zu halten, und senken Sie sich dann langsam wieder in die Ausgangsposition ab. Wiederholen.</p>",
              },
              {
                name: "Ausfallschritt Kettlebell",
                image: "Musterbild",
                difficulty: "Leicht",
                muscleGroup: "Beine",
                description: "<p>1. Stellen Sie sich aufrecht hin, die Füße leicht auseinander und halten Sie eine Kettlebell in einer Hand.</p><p>2. Bringen Sie dasselbe Bein wie den Arm, der die Kettlebell hält, vor sich, gehen Sie in die Hocke, bis Ihr Oberschenkel parallel zum Boden ist, und halten Sie Ihren Rücken gerade.</p><p>3. Zurück in die Ausgangsposition und wiederholen.</p>",
              },
              {
                name: "Beinpresse",
                image: "Musterbild",
                difficulty: "Mittel",
                muscleGroup: "Beine",
                description: "<p>1. Stellen Sie Ihre Beine schulterbreit auf die Plattform.</p><p>2. Lassen Sie das Gewicht los und strecken Sie Ihre Beine vollständig aus, ohne Ihre Knie zu sperren.</p><p>3. Senken Sie das Gewicht ab, bis sich Ihre Beine in einem 90°-Winkel befinden (aber lassen Sie NICHT zu, dass sich Ihr Gesäß und Ihr unterer Rücken vom Polster abheben. Dadurch wird Ihr unterer Rücken in eine runde Position gebracht, was sehr gefährlich ist.)</p><p>4. Drücken Sie das Gewicht zurück in die Ausgangsposition.</p>",
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
  
}

export default new DatabaseFactory();
