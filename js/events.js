var dataEventsJSON = []; //ARRAY EVENTS
var dataUsersJSON = []; //ARRAY USERS + EVENTS ATTENDING
var userStorage = window.localStorage.getItem("currentUser");//"pulkit@gmail.com"; //USER LOGGED IN
var data = JSON.parse(localStorage.getItem("database")); //DATABASE

$(document).ready(function() {
  $('#calendar-events').fullCalendar(funcCalendarEvents());
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

function loadEvents(){
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

  /*UPDATE COLOR THAT IS HARD CODE*/
  /*for (var i = 0; i < dataEventsJSON.length; i++){
    for (var j = 0; j < dataUsersJSON[userStorage].events.length; j++){
      if (dataEventsJSON[i].id == dataUsersJSON[userStorage].events[j]) {
        dataEventsJSON[i]['backgroundColor']= "yellow";
        break;
      }
    }
  }*/
  for (var i = 0; i < dataEventsJSON.length; i++){
    dataEventsJSON[i]['backgroundColor']= "#578cba";
  }

  for (var i = 0; i < dataEventsJSON.length; i++){
    for (var j = 0; j < dataUsersJSON[userStorage].events.length; j++){
      if (dataEventsJSON[i].id == dataUsersJSON[userStorage].events[j]) {
        dataEventsJSON[i]['backgroundColor']= "yellow";
        break;
      }
    }
  }

  return dataEventsJSON;
}

function funcCalendarEvents(){
  return {
    header: {
                   left: '',
                   center: 'title',
                   right: 'prev,next'
               },
    defaultView: 'listMonth',
    defaultDate: formatDate(),
    theme: false,
    editable: true, // Don't allow editing of events
    eventLimit: true,
    displayEventTime: true,// Display event time
    events: loadEvents(),
    eventClick: function(calEvent, jsEvent, view){
      var result=confirm("Attend " + calEvent.title + "?");
      if (result == true){
        var attended = false;
        var userAgenda = dataUsersJSON[userStorage].events;
          for (att in userAgenda) {
            if (calEvent.id == userAgenda[att]){
              attended = true;
              break;
            }
          }

          if (!attended){
            dataUsersJSON[userStorage].events.push(calEvent.id);
            alert("Event " + calEvent.title + " added with success!");
            dataEventsJSON[calEvent.id-1]['backgroundColor']= "yellow";
            $('#calendar-events').fullCalendar('removeEventSources');
            $('#calendar-events').fullCalendar('addEventSource', dataEventsJSON );
            $('#calendar-events').fullCalendar('rerenderEvents');

          }else{
            alert("You are already attending this event!");
          }
      }
    }
  }
}

function refreshJSON(){
  data.events = (dataEventsJSON);
  data.users = (dataUsersJSON);
  window.localStorage.setItem("database", JSON.stringify(data));

}
