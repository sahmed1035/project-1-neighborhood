// 1. Retrieve user input for state and convert to variables 
// 2. Use this variable to run an AJAX call to the crime data. (gives jSon object)
// 3. Breakdown the JSON object into useable fields.
// 4. Dynamically generate the content on html table.
// 5. Save the content in the DATABASE.

$(document).ready(function () {
  // console.log( "ready!" );

  //SETUP VARIABLES
  //------------------------------------------------------------------------------------
  //authorization key
  var apiKey = "Vg6MMwjomH2x5z07IvcS9HbIOYLsGizDK8tuwRig";

  var city = "";
  var state = "";
  var zip = "";


  //URL base
  var queryURL_base_violent;
  var queryURL_base_homicide;
  var queryURL_base_rape;
  var queryURL_base_aggravated;
  var queryURL_base_burglary;


  var store_state_abbr;
  var store_offense_name;
  var store_offense_count;
  var store_data_year;

  // Sample working URL
  // https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/burglary/offense/states/il/count?api_key=Vg6MMwjomH2x5z07IvcS9HbIOYLsGizDK8tuwRig
  //https://cors.io/?
  // queryURL_base_rape = "https://cors.io/?https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/rape/offense/states/" + state + "/count?api_key=" + apiKey;



  //==============================================================================================================
  //Database: Steps to complete:

  // 1. Initialize Firebase
  var config = {
      apiKey: "AIzaSyA6_OkeIBMcHRe4vdeGgYitDI7ZeLy68x0",
      authDomain: "project-1-ranking.firebaseapp.com",
      databaseURL: "https://project-1-ranking.firebaseio.com",
      projectId: "project-1-ranking",
      storageBucket: "project-1-ranking.appspot.com",
      messagingSenderId: "670825863614"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Syeda, you need to create this global variables
          store_state_abbr;
          store_offense_name;
          store_offense_count;
          store_data_year;

  //state_abbr, offense_name, offense_count, data_year

  // 2. Create button for adding new data - then update the html + update the database
  // Creates local "temporary" object for holding  data

  // Uploads data to the database
  // 3. Create Firebase event for adding newCrime to the database 



  //==============================================================================================================


  //FUNCTIONS
  //------------------------------------------------------------------------------------
  //function for ajax calls

  function runQuery(state, queryURL) {
      //this empty the table when there is a different state
      // $("tbody").empty();
      //Since we are using a https://cors.io to enable the cors cross-domain
      //we need to use another jquery called $.getJSON to get the JSON data

      var state_abbr;
      var offense_name;
      var offense_count;
      var data_year;
      $.getJSON(queryURL, function (responseCrime) {
          //data is the JSON string
          console.log("test " + responseCrime.results.length);


          //This does a foreach loop for each row of the API

          // for (var i = 0; i < responseCrime.results.length; i++) {
          var tRow_crime = $("<tr>");


        //   state_abbr = $("<td>").text(responseCrime.results[responseCrime.results.length - 1].state_abbr);
          store_state_abbr = responseCrime.results[responseCrime.results.length - 1].state_abbr;




          offense_name = $("<td>").text(responseCrime.results[responseCrime.results.length - 1].offense_name);
          store_offense_name = responseCrime.results[responseCrime.results.length - 1].offense_name;




          offense_count = $("<td>").text(responseCrime.results[responseCrime.results.length - 1].offense_count);
          store_offense_count = responseCrime.results[responseCrime.results.length - 1].offense_count;

          console.log(store_offense_count);



          data_year = $("<td>").text(responseCrime.results[responseCrime.results.length - 1].data_year);
          store_data_year = responseCrime.results[responseCrime.results.length - 1].data_year;
          console.log(store_data_year);

          //we don't need to return a false value as we are submitting it. 
          // return false;

          //dynamically formatting the style of the table entries
          tRow_crime.append(state_abbr, offense_name, offense_count, data_year);
          $("#tbodyCrime").append(tRow_crime);
        //  $("#tbodyCrime").css({ "color": "white", "font-size": "100%" , "background-color":"rgb(65,58,121) transparent "});
          //}
          //pushing the data to the database 
          var newCrime = {
              d_state_abbr: store_state_abbr,
              d_offense_name: store_offense_name,
              d_offense_count: store_offense_count,
              d_data_year: store_data_year
          };
  
          // Uploads crime data to the database
          database.ref().push(newCrime);
      });
  }


  

  //MAIN PROCESSES
  //=====================================================================================



  //on click event associated with search button
  var hasStates;
  $("#searchBtn").on('click', function (event) {

      //Need to use this  event.preventDefault() since we are using
      //form tag, otherwise, the data won't stay in the form.
      event.preventDefault();
      // alert("talking!");



      //clears the table for each selected state
      $("#tbodyCrime").empty();
     
      //This gets value of the selected state dropdown.
      hasStates = $("#myselect option:selected").val();
      console.log(hasStates);

      //all the queryURLs should be before you call the runQuery function 
      //otherwise there is no API pass in that function
      queryURL_base_violent = "https://cors.io/?https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/violent-crime/offense/states/" + hasStates + "/count?api_key=" + apiKey;
      queryURL_base_homicide = "https://cors.io/?https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/homicide/offense/states/" + hasStates + "/count?api_key=" + apiKey;
      queryURL_base_rape = "https://cors.io/?https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/rape/offense/states/" + hasStates + "/count?api_key=" + apiKey;
      queryURL_base_aggravated = "https://cors.io/?https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/aggravated-assault/offense/states/" + hasStates + "/count?api_key=" + apiKey;
      queryURL_base_burglary = "https://cors.io/?https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/burglary/offense/states/" + hasStates + "/count?api_key=" + apiKey;

      // console.log(queryURL_base_violent);
      // console.log(queryURL_base_homicide);
      // console.log(queryURL_base_rape);
      // console.log(queryURL_base_aggravated);
      // console.log(queryURL_base_burglary);
      //You only search when there is a state.

      // you have to check for city and state to not be emptied from the below if condition
      if (hasStates != "" && $("#validationDefault03").val().length>0) {
          runQuery(hasStates, queryURL_base_violent);
          runQuery(hasStates, queryURL_base_homicide);
          runQuery(hasStates, queryURL_base_rape);
          runQuery(hasStates, queryURL_base_aggravated);
          runQuery(hasStates, queryURL_base_burglary);
          $("#errormessage").text("");
          $('#buttoncrime').click();

      }// if the state is emptied, displayed error message div
      else if(hasStates === "") {
          $("#errormessage").text("State is required");
          console.log("enter state");
      }// if the city is emptied, displayed error message div
      else if($("#validationDefault03").val().length===0) {
          $("#errormessage").text("City is required");
          console.log("enter city");
      }

  });



 

});

