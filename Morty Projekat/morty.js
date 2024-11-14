const URL = "https://rickandmortyapi.com/api/character";
const container = document.querySelector(".container");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
let currentPage = 1;

function getCharacters(page = 1) {
  fetch(`${URL}?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      showCharacters(data);
      updatePagination(data.info);
    });
}

function showCharacters(data) {
  console.log(data?.results);
  const newCharactersArray = data?.results.slice(0, 20);

  container.innerHTML = "";

  newCharactersArray.forEach((e) => {
    const mortyDiv = document.createElement("div");
    const mortyImage = document.createElement("img");
    const mortyText = document.createElement("p");
    const mortyButton = document.createElement("button");
    const infoBox = document.createElement("div");

    mortyButton.innerHTML = "Like";
    mortyImage.setAttribute("src", e.image);
    mortyText.innerHTML = e.name;

    infoBox.style.position = "absolute";
    infoBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    infoBox.style.color = "white";
    infoBox.style.padding = "10px";
    infoBox.style.borderRadius = "5px";
    infoBox.style.display = "none";

    infoBox.innerHTML = `Name: ${e.name} <br> Status: ${e.status} <br> Species: ${e.species} <br> Gender: ${e.gender}`;

    mortyDiv.style.position = "relative";
    mortyDiv.append(mortyImage, mortyText, mortyButton, infoBox);

    const likedCharacters =
      JSON.parse(localStorage.getItem("likedCharacters")) || {};
    if (likedCharacters[e.id]) {
      mortyButton.style.backgroundColor = "green";
    }

    mortyImage.addEventListener("mouseenter", function () {
      infoBox.style.display = "block";
    });

    mortyImage.addEventListener("mouseleave", function () {
      infoBox.style.display = "none";
    });

    mortyButton.addEventListener("click", function () {
      if (mortyButton.style.backgroundColor === "green") {
        mortyButton.style.backgroundColor = "";
        delete likedCharacters[e.id];
      } else {
        mortyButton.style.backgroundColor = "green";
        likedCharacters[e.id] = true; // Add to localStorage
      }

      // Save the updated state to localStorage
      localStorage.setItem("likedCharacters", JSON.stringify(likedCharacters));
    });

    container.append(mortyDiv);
  });
}

function updatePagination(info) {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === info.pages;
}

const counter = document.querySelector(".counter");

nextButton.addEventListener("click", function () {
  if (currentPage < 42) {
    currentPage++;
    getCharacters(currentPage);
    counter.textContent = currentPage;
  }
});

prevButton.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    getCharacters(currentPage);
    counter.textContent = currentPage;
  }
});

window.addEventListener("load", () => getCharacters(currentPage));
