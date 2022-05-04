/* Daten aus Datenbank importieren

Testdaten*/

//nur zum Testen
const data = [
  {
    name: "exercise 1",
    progress: "beginn",
    muscle: "arme",
  },
  {
    name: "exercise 2",
    progress: "beginn",
    muscle: "arme",
  },
  {
    name: "exercise 3",
    progress: "beginn",
    muscle: "arme",
  },
  {
    name: "exercise 4",
    progress: "beginn",
    muscle: "bauch",
  },
  {
    name: "exercise 5",
    progress: "beginn",
    muscle: "beine",
  },
];

function addElemet() {
  for (var i = 0; i < data.length; i++) {
    var newElement = document.createElement("div");
    newElement.classList.add("filterExercise");
    newElement.innerHTML = `
            <p> ${data[i].muscle} </p>
            `;

    //Hinzufügen zur DOM
    document.getElementsByClassName("filterForm")[0].appendChild(newElement);
  }
}

window.onload = function () {
  console.log("");
  addElemet();
};
