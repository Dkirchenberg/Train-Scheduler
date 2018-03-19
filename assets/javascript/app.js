  var config = {
    apiKey: "AIzaSyAC5PzbpjlxiaapYPbXe4UmXyTkR0P_2fM",
    authDomain: "train-schedule-d0a22.firebaseapp.com",
    databaseURL: "https://train-schedule-d0a22.firebaseio.com",
    projectId: "train-schedule-d0a22",
    storageBucket: "",
    messagingSenderId: "381520113353"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
 
  $("#addTrainBtn").on("click", function() {
    
    var trainName= $("#exampleInputtrainName").val().trim();
    var destination = $("#exampleInputDestination").val().trim();
    var trainTime = $("#exampleInputtrainTime").val().trim();
    var frequency = $("#exampleInputFrequency").val().trim();
    
   var newTrain = {
    name: trainName,
    place: destination,
    trainTime: firstTrainTime,
    freq: frequency

   }

   database.ref().push(newTrain);

    $("#exampleInputtrainName").val("");
    $("#exampleInputDestination").val("");
    $("#exampleInputtrainTime").val("");
    $("#exampleInputFrequency").val("");

    return false;

  });

   database.ref().on("child_added", function(childSnapshot) {

    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);

   
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().freq;

    var firstTimeConverted = moment(firstTrain, "HH:mm");

    var currentTime = moment().format("HH:mm");
  
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    var timeReminder = timeDiff % frequency;

    var minToTrain = frequency - timeReminder;

    var nextTrain = moment().add( minToTrain, "minutes").format("HH:mm");

    $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"+ frequency  + "</td><td>"  + nextTrain + "</td><td>" + minToTrain + "</td></tr>");

    });

   

