// Add DOM selectors to target input and UL movie list



// database to hold onto movie history (in-memory database)
const historyData = {

};

if (localStorage.getItem("historyData")) {
  historyData = JSON.parse(localStorage.getItem("historyData"));
  updateMovieHistory();
} 


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

    let keyFound = keyExists(movie, historyData);

    if (!keyFound) {
        let node = document.createElement("li");
        let textNode = document.createTextNode(movie);
        node.appendChild(textNode);
        document.querySelector(".list-group").appendChild(node);
    } 
    
    // insert movie into object

    if (keyFound) {
      historyData[keyFound] = historyData[keyFound] + 1 || 1;
      localStorage.setItem("historyData", JSON.stringify(historyData));
    } else {
      historyData[movie] = historyData[movie] + 1 || 1;
      localStorage.setItem("historyData", JSON.stringify(historyData));
    }

    updateMovieHistory();
  }

  // function that checks if object exists in historyData
  function keyExists(value, obj) {
      // Get all the keys from the database object
      let keyList = Object.keys(obj);
      for (let i = 0; i < keyList.length; i++) {
        if (value.toLowerCase() === keyList[i].toLowerCase()) {
          return keyList[i];
        }
      }
      return false;
  }

  // render the table with the LATEST value of the object being
  function updateMovieHistory() {
    let myTable = `
    <h5 class="card-title"Movie History</h5>
    <table id="movieHistoryTable">
      <tr>
        <th>Title</th>
        <th>Watched</th>
      </tr>
      ${
        Object.keys(historyData).map(function (key) {
          return `<tr><td>${key}</td><td>${historyData[key]}</td></tr>`
        }).join("")
      }
    </table>
    `;
    document.querySelector("#movieHistoryCard").innerHTML = myTable;
  }
 
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
