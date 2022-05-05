/* Daten aus Datenbank importieren

Testdaten*/
const data = [
  {
    name: "workout name",
    progress: "beginner",
    muscle: "arme",
    //Image: src = "test.jpeg",
    description:
      "1Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
];

//Funktion Daten hinzufügen
function addElemet() {
  //Info
  var newInfo = document.createElement("div");
  newInfo.classList.add("boxExercise");
  newInfo.innerHTML = `
        <p> <h2> ${data[0].name} </h2> </p>
        <p> <h3> <img  src="./kreis.svg" class="iconk"></img> ${data[0].progress} </h3> </p>
        <p> <h3> ${data[0].muscle} </h3> </p>
        `;

  //Bild
  /*var newImage = document.createElement("div");
  newImage.classList.add("boxExercise");
  newImage.innerHTML = `
        <p>${data[0].Image}</p>
        `;
  */

  //Beschreibung
  var newDescription = document.createElement("div");
  newDescription.classList.add("boxExercise");
  newDescription.innerHTML = `
        <p>${data[0].description}</p>
        `;

  //Hinzufügen zur DOM
  document.getElementsByClassName("boxTitel")[0].appendChild(newInfo);
  //document.getElementsByClassName("boxImage")[0].appendChild(newImage);
  document.getElementsByClassName("boxDes")[0].appendChild(newDescription);
}
/*
function addElemet() {
  if ((data[0].progress = "beginner")) {
    document.getElementByClassName("icon").style.color = "green";
  } else if ((data[0].progress = "advanced")) {
    document.getElementByClassName("icon").style.color = "yellow";
  } else data[0].progress = "expert";
  document.getElementByClassName("icon").style.color = "red";
}
*/

//script wird durchgeführt
window.onload = function () {
  console.log("");
  addElemet();
};
