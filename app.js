// instantiate an object that will contain history data (movieName : timesWatched)
let historyData = [];
document.addEventListener('DOMContentLoaded', function(event) {
  //function to check if value is empty
  function isEmpty(val) {
    if (val === "") {
      return true;
    } else {
      return false;
    }
  }

  //add movie to list on pressing enter key
  let input = document.getElementById("addMovie");
  input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector(".btn-primary").click();
    }
  })

  //function to add movie into list
  function addMovie(movie) {
    if (!checkHistory(movie)) {
        let node = document.createElement("li");
        let textNode = document.createTextNode(movie);
        node.appendChild(textNode);
        document.querySelector(".list-group").appendChild(node);
        node.classList.add("movie-item", "flex");
        // add into historyData
        let movieObject = {name : movie, timesWatched: 1};
        historyData.push(movieObject);
        // add table row
        let tableRow = document.createElement("tr");
        let movieName = document.createElement("td");
        let watched = document.createElement("td");
        watched.id = movie;
        let numberOne = document.createTextNode("1");
        let movieText = document.createTextNode(movie);
        movieName.appendChild(movieText);
        watched.appendChild(numberOne);
        tableRow.appendChild(movieName);
        tableRow.appendChild(watched);
        document.querySelector(".historyCard").appendChild(tableRow);
        console.log(movie);
        
    } 
    else {
        for (let i = 0; i < historyData.length; i++) {
            if (historyData[i].name === movie) {
                historyData[i].timesWatched++;
                let updatedValue = historyData[i].timesWatched.toString();
                document.getElementById(movie).innerHTML = updatedValue;
            }
        }
        
    }
  }
  // function that checks if object exists in historyData
  function checkHistory(movie) {
      for (let i = 0; i < historyData.length; i++) {
          if (historyData[i].name === movie) {
              return true;
          }
          else {
              return false;
          }
      }
  }
  // create a table
  function createTable() {
      let historyCard = document.createElement("table");
      historyCard.className = ("historyCard");
      let tableHeader = document.createElement("th");
      let tableCell1 = document.createElement("td");
      let tableCell2 = document.createElement("td");
      let headerText1 = document.createTextNode("Movie Name");
      let headerText2 = document.createTextNode("Times Watched");
      tableCell1.appendChild(headerText1);
      tableCell2.appendChild(headerText2);
      tableHeader.appendChild(tableCell1);
      tableHeader.appendChild(tableCell2);
      historyCard.appendChild(tableHeader);
      document.getElementById("movieHistoryCard").appendChild(historyCard);
  }

  createTable();

  //"add movie" button functionality
  document.querySelector(".btn-primary").onclick = function(e) {
    e.preventDefault();

    var userInput = document.getElementById("addMovie").value;

    //if input field is not empty, add user input to movie list
    if (!isEmpty(userInput)) {
      addMovie(userInput);
    } else {
      alert("Error");
    }

    console.log(userInput);
  }

  //"clear movie" button functionality
  document.querySelector(".btn-danger").onclick = function(e) {
    e.preventDefault();

    let listItems = document.querySelectorAll("li");
    listItems.forEach(item => document.querySelector("ul").removeChild(item))
  }
})
