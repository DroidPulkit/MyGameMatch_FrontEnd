var dataAgendaJSON = [];
var dataUsersJSON = [];
var dataEventsJSON = [];
var userStorage = window.localStorage.getItem("currentUser");//"pulkit@gmail.com";
var database = JSON.parse(localStorage.getItem("database")); //DATABASE

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

  //dataEventsJSON = database.events;
  //dataUsersJSON = database.users;

  if (database.users){
    var finalData = [];
    for(var i = 0; i < database.users[userStorage].events.length; i++){
      for (var j = 0; j < database.events.length; j++){
        var idAndLevel = database.users[userStorage].events[i].split("&");
        //if (dataUsersJSON[userStorage].events[i] == dataEventsJSON[j].id) {
        if (idAndLevel[0] == database.events[j].id) {
          var objCopy = {};
          for (key in database.events[j]) {
            objCopy[key] = database.events[key]; // copies each property to the objCopy object
          }
          objCopy = database.events[j];
          objCopy['level']= idAndLevel[1];
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
        for (var i = 0; i < database.users[userStorage].events.length; i++){
          var idAndLevel = database.users[userStorage].events[i].split("&");
          //if (calEvent.id == dataUsersJSON[userStorage].events[i]){
          if (calEvent.id == idAndLevel[0]){
            delete database.users[userStorage].events[i];
            database.users[userStorage].events = cleanArray(database.users[userStorage].events);
            $('#calendar-agenda').fullCalendar('removeEvents', calEvent._id);
            //dataEventsJSON[calEvent.id-1]['backgroundColor']= "#578cba";
            localStorage.setItem("database", JSON.stringify(database));
            break;
          }
        }
      }
    },
    eventRender: function(event, element) {
        if (event.level == '1') {
            element.css({
                'background-color': '#333333',
                'border-color': '#333333'
            });
        }else if(event.level == '2'){
            element.css({
                'background-color': 'green',
                'border-color': 'green'
            });
        }else if(event.level == '3'){
            element.css({
                'background-color': 'brown',
                'border-color': 'brown'
            });
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
  //database.events = (dataEventsJSON);
  //database.users = (dataUsersJSON);
  //window.localStorage.setItem("database", JSON.stringify(database));

}
