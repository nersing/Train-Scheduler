
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDu11fUNFDnuTBQZ14ROXaXYBvzL2kQkoo",
    authDomain: "trainhw-2ae55.firebaseapp.com",
    databaseURL: "https://trainhw-2ae55.firebaseio.com",
    projectId: "trainhw-2ae55",
    storageBucket: "",
    messagingSenderId: "575231629127"
  };
  firebase.initializeApp(config);


  var database = firebase.database();



  //submit button on click function for add train panel
  $("#searchbtn").on('click', function(event){
  	event.preventDefault();

  	var trainName = $("#train-name").val();
  	var trainDestination = $("#train-destination").val();
  	var trainTime = $("#train-time").val();
  	var trainFrequency = $("#train-frequency").val();

  	// console.log(trainDestination);


  	database.ref().push({
  		name: trainName,
  		destination: trainDestination,
  		time: trainTime,
  		frequency: trainFrequency
  	});

  	document.getElementById('train-form').reset();

  });



  //Adding "children" to the current train schedule
  database.ref().on('child_added', function(snapshot){
  	console.log(snapshot.val());

  	var nameT = snapshot.val().name;
  	var destinationT = snapshot.val().destination;
  	var timeT = snapshot.val().time;
  	var frequencyT = snapshot.val().frequency;

  	console.log(timeT + "timeT");

//Moment math for next arrival and minutes away

var tStart = timeT;
var tFrequency = frequencyT;

// First Time Train from user?
    var firstTimeConverted = moment(tStart, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted + "User Train Time Input");

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

// Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("Next Train" + nextTrain);
   

//adding newRow to train schedule
  	var newRow = $("<tr>");

  	newRow.append("<td>" + nameT + "</td>");
  	newRow.append("<td>" + destinationT + "</td>");
  	newRow.append("<td>" + frequencyT + "</td>");
  	newRow.append("<td>" + nextTrain + "</td>");
  	newRow.append("<td>" + tMinutesTillTrain + "</td>");

  	$("#table").append(newRow);


  });

  $( document ).ready( function() {
    $( 'body' ).flurry({
      character: "***",
      large: 55,
    });
});


















