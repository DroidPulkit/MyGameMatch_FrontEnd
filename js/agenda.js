var dataAgendaJSON = [];
var dataUsersJSON = [];
var dataEventsJSON = [];
var userStorage = window.localStorage.getItem("currentUser");//"pulkit@gmail.com";
var data = JSON.parse(localStorage.getItem("database")); //DATABASE

$(document).ready(function() {
  $('#calendar-agenda').fullCalendar(funcCalendarAgenda());
});

function formatDate() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth()+1;
  var year = today.getFullYear();

  return year + "-" + month + "-" + day;
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "215px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function load(){
  /*dataEventsJSON = JSON.parse(window.localStorage.getItem("dataEventsJSON"));
  if (!dataEventsJSON){
    window.localStorage.setItem("dataEventsJSON", JSON.stringify(data.events));
    dataEventsJSON = JSON.parse(window.localStorage.getItem("dataEventsJSON"));
  }

  dataUsersJSON = JSON.parse(window.localStorage.getItem("dataUsersJSON"));
  if (!dataUsersJSON){
    window.localStorage.setItem("dataUsersJSON", JSON.stringify(data.users));
    dataUsersJSON = JSON.parse(window.localStorage.getItem("dataUsersJSON"));
  }*/

  dataEventsJSON = data.events;
  dataUsersJSON = data.users;

  if (dataUsersJSON){
    var finalData = [];
    for(var i = 0; i < dataUsersJSON[userStorage].events.length; i++){
      for (var j = 0; j < dataEventsJSON.length; j++){
        if (dataUsersJSON[userStorage].events[i] == dataEventsJSON[j].id) {
          var objCopy = {};
          for (key in dataEventsJSON[j]) {
            objCopy[key] = dataEventsJSON[key]; // copies each property to the objCopy object
          }
          objCopy = dataEventsJSON[j];
          objCopy['backgroundColor']= "yellow";
          finalData.push(objCopy) ;
          break;
        }
      }
    }
    return finalData;
  }else{
    return [];
  }
}

function funcCalendarAgenda(){
  return {
    header: {
       left: 'today',
       center: 'title',
       right: 'prev,next'
    },
    defaultDate: formatDate(),
    theme: false,
    editable: true, // Don't allow editing of events
    eventLimit: true,
    displayEventTime: true,// Display event time
    events: load(),
    eventMouseover: function(event, jsEvent, view) {
        if (view.name !== 'agendaDay') {
            $(jsEvent.target).attr('title', event.title);
        }
    },
    eventClick: function(calEvent, jsEvent, view){
      var result=confirm("Not attend " + calEvent.title + " anymore?");
      if (result == true){
        for (var i = 0; i < dataUsersJSON[userStorage].events.length; i++){
          if (calEvent.id == dataUsersJSON[userStorage].events[i]){
            delete dataUsersJSON[userStorage].events[i];
            dataUsersJSON[userStorage].events = cleanArray(dataUsersJSON[userStorage].events);
            $('#calendar-agenda').fullCalendar('removeEvents', calEvent._id);
            dataEventsJSON[calEvent.id-1]['backgroundColor']= "#578cba";
            break;
          }
        }
      }
    }
  }
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function refreshJSON(){
  data.events = (dataEventsJSON);
  data.users = (dataUsersJSON);
  window.localStorage.setItem("database", JSON.stringify(data));

}
