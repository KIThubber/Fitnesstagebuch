/* Daten aus Datenbank importieren

Testdaten*/
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
    newElement.classList.add("boxExercise");
    newElement.innerHTML = `
          <p> <h2> ${data[i].name} </h2> </p>
          <p> <h3>${data[i].progress} </h3> </p>
          <p> <h3>${data[i].muscle} </h3> </p>
          `;

    //Hinzufügen zur DOM
    document.getElementsByClassName("boxForm")[0].appendChild(newElement);
  }
}

window.onload = function () {
  console.log("");
  addElemet();
};
