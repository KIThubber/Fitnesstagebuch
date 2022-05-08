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
anlegen.

Single Page App

Start mit Docker Compose
------------------------

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

### Controller

Überarbeitung Frontend
------------------------
### Übersichtsseite

Die Übersichtsseite ist die Startseite des Fitnesstagebuchs, hier können alle 
bereits angelegten Übungen eingesehen werden. Zudem können die Übungen hier nach der 
Muskelgruppe sortiert werden.

![Startseite](startseite.png?raw=true)

Die Übungen werden dabei aus dem Backend über die page-edit ausgelesen und aufgespielt

### Übung hinzufügen (new)

Hier kann eine neue Übung angelegt werden
- name (Name der Übung)
- image (Link zu Bild)
- difficulty (Schwierigkeitsgrad): Leicht, Mittel, Fortgeschritten
- muscleGroup (Muskelgruppe): Beine, Arme, Brust, ...
- Description (Beschreibung der Durchführung)

Anschließend mit drücken des "Speichern"-Buttons wird die Übung an die Mongo-DB
geschickt und kann künftig mit in ein Workout aufgenommen werden.

![addWorkout](addWorkout.png?raw=true)

### WorkoutOverview
Übersicht über bereit angelegte Workouts

![workoutOverview](workoutOverview.png?raw=true)
Hier werden die Daten mittels der page-workoutExcercises eigelesen

Starten der Seite
------------------------
Einsehen der Webseite, nur lokal möglich, dafür geben Sie im Browser folgenden Link ein: 
```sh
http://localhost:8080/#/
```
Hier können dann die Übungen eingesehen werden.