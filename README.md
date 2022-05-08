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

Start mit Docker Compose
------------------------

-- Infos zu Backend --

Überarbeitung Backend
------------------------
-- Infos zu Backend --

Überarbeitung Frontend
------------------------
# Übersichtsseite

Hier sind alle bereitsangelegten Übungen
Startseite des Fitnesstagebuchs

![Screenshot 1](screenshot1.png?raw=true)

# Übung hinzufügen (new)

Hier kann eine neue Übung angelegt werden
- name (Name der Übung)
- image (Link zu Bild)
- difficulty (Schwierigkeitsgrad): Leicht, Mittel, Fortgeschritten
- muscleGroup (Muskelgruppe): Beine, Arme, Brust, ...
- Description (Beschreibung der Durchführung)

Anschließend mit drücken des "Speichern"-Buttons wird die Übung an die Mongo-DB
geschickt und kann künftig mit in ein Workout aufgenommen werden.

# WorkoutOverview
Übersicht über Workouts

Starten der Seite
------------------------
Einsehen der Webseite, nur lokal
```sh
http://localhost:8080/#/
```
