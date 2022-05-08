Fittnesstagebuch
==============================

Inhaltsverzeichnis
------------------

 1. [Kurzbeschreibung](#kurzbeschreibung)
 1. [Start mit Docker Compose](#start-mit-docker-compose)
 1. [Überarbeitung Backend](#überarbeitung-backend)
 1. [Überarbeitung Frontend](#überarbeitung-frontend)
 1. [Starten der Seite](#starten-der-seite)

Kurzbeschreibung
----------------

Bei unserer Anwendung handelt es sich um einen Fitness-Tracker, dieser ermöglicht
dem Nutzer seine individuellen Workouts zusammenzustellen. Dafür kann der Nutzer
sich vorgefertigte Übungen zu seinem Workout hinzufügen, aber auch selbst Übungen
anlegen. Das Fitnesstagebuch basiert auf der "Adressbuch (Single Page App)" aus
den Vorlesungsunterlagen und wurde entsprechend geändert, um Excercises und Workouts
speichern zu können.

Bei dem Fitnesstagebuch handelt es sich um eine Single Page App, welche den Inhalt
dynamisch anpassen kann. Hierzu haben wir page-edit JavaSript Dateien verwendet,
welche den Inhalt der Main Methode anpassen können.
Filterfunktion und Löschfunktion funktionieren leider nur separiert, nicht aber wenn man beides implementiert.
(FYI: Z00481XT=LeonDebatin=KIThubber)

Start mit Docker Compose
------------------------
Um Änderungen innerhalb der Laufzeit zu sehen, haben wir uns für Docker entschieden.
Zum starten der Anwendung muss zunächst ein Docker-Container erstellt werden

```sh
docker-compose -f docker-compose.dev.yml up
```

Überarbeitung Backend
------------------------
Im Backend wurden folgende Änderungen durchgeführt
Verwaltung von Excercises, Workouts und 

### database.js
In database.js sind die Vorlagen der Excercises und Workouts gespeichert

### API
In der API wurde die Schnittstelle zur Datenbank aufgebaut, dafür wurden die jeweiligen
HTTP-Befehle definiert für die jeweiligen Enitäten.

### Controller
Die Excercise und Workout-Controler wurden für die Seite neu angelegt.

Überarbeitung Frontend
------------------------
### Übersichtsseite

Die Übersichtsseite ist die Startseite des Fitnesstagebuchs, hier können alle 
bereits angelegten Übungen eingesehen werden. Zudem können die Übungen hier nach der 
Muskelgruppe sortiert werden.

![Startseite](startseite.png?raw=true)

Zu einer Übung kann hier 
* `Info`: Die Informationen angezeigt werden, leitet weiter auf excercise
* `zu Workout hinzufügen`: Öffnet eine Maske in der man die bestehenden Workouts sieht, per Klick 
    auf "hinzufügen" werden diese im Workout angezeigt
* `Bearbeiten`: Öffnet eine Maske, wie in addExcercise
* `Löschen`: Löscht die Übung aus der Datenbank

### Excercise
Kompakte Infos zur Übung und deren Durchführung.
Hier gibt es zu jeder Übung eine Übersicht zur Muskelgruppe, der Schwierigkeit und einer 
detailierten Beschreibung, zur Ausführung der Übung.

![Excercise](excercise.png?raw=true)

### Übung hinzufügen (new)

Auf der Seite AddExcercise kann eine neue Übung angelegt werden.
Dafür müssen die folgenden Felder ausgefüllt werden.
* `name`: Name der Übung
* `image`: Link zu Bild
* `difficulty`: Schwierigkeitsgrad (Leicht, Mittel, Fortgeschritten)
* `muscleGroup`: Muskelgruppe (Beine, Arme, Brust, ...)
* `description`:Beschreibung der Durchführung

Anschließend mit drücken des "Speichern"-Buttons wird die Übung an die Mongo-DB
geschickt und kann künftig mit in ein Workout aufgenommen werden.

![addWorkout](addWorkout.png?raw=true)

### WorkoutOverview
Auf der Seite WorkoutOverview findet man eine Übersicht über die bereits angelegten Workouts.
Per Klick auf `Zeige Exercises` gelangt man auf die Seite Workout.

![workoutOverview](workoutOverview.png?raw=true)

### Workout
Zeigt die einzelnen Übungen, die sich in einem Workout befinden an

![workout](workout.png?raw=true)

Starten der Seite
------------------------
Einsehen der Webseite, nur lokal möglich, dafür geben Sie im Browser folgenden Link ein: 
```sh
http://localhost:8080/#/
```
