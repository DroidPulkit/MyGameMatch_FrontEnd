var dataEventsJSON = []; //ARRAY EVENTS
var dataUsersJSON = []; //ARRAY USERS + EVENTS ATTENDING
var userStorage = window.localStorage.getItem("currentUser");//"pulkit@gmail.com"; //USER LOGGED IN
var database = JSON.parse(localStorage.getItem("database")); //DATABASE

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

  //dataEventsJSON = data.events;
  //dataUsersJSON = data.users;

  /*UPDATE COLOR THAT IS HARD CODE*/
  /*for (var i = 0; i < dataEventsJSON.length; i++){
    for (var j = 0; j < dataUsersJSON[userStorage].events.length; j++){
      if (dataEventsJSON[i].id == dataUsersJSON[userStorage].events[j]) {
        dataEventsJSON[i]['backgroundColor']= "yellow";
        break;
      }
    }
  }
  for (var i = 0; i < data.events.length; i++){
    data.events[i]['backgroundColor']= "#578cba";
  }

  for (var i = 0; i < data.events.length; i++){
    for (var j = 0; j < data.users[userStorage].events.length; j++){
      if (data.events[i].id == data.users[userStorage].events[j]) {
        data.events[i]['backgroundColor']= "yellow";
        break;
      }
    }
  }

  return data.events;*/

  for (var i = 0; i < database.events.length; i++){
    database.events[i]['level']= "0";
  }
  for (var i = 0; i < database.events.length; i++){
    for (var j = 0; j < database.users[userStorage].events.length; j++){
      var idAndLevel = database.users[userStorage].events[j].split("&");
      if (database.events[i].id == idAndLevel[0]) {
        database.events[i]['level']= '1';
        break;
      }
    }
  }

  return database.events;

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
      var attended = false;
      var userAgenda = database.users[userStorage].events;

      for (att in userAgenda) {
        var split = userAgenda[att].split("&");
          if (calEvent.id == split[0]){
            attended = true;
            break;
          }
      }

      if (attended){
          alert("You are already attending this event!");
          return;
      }

      $("#modalTitle").text(function(i, oldText){
        return "Choose priority of this event";
      });
      $("#optionId").text(function(i, oldText){
        return calEvent.id;
      });
      $("#optionTitle").text(function(i, oldText){
        return calEvent.title;
      });
      $("#myModal").modal();

      $("#btnSaveModal").one( "click",function(){
        var valueLevel;
        var radios = $('input[name=gender]');
        for (var i = 0, length = radios.length; i < length; i++){
           if (radios[i].checked){
              valueLevel = radios[i].value;
              radios[i].checked = false;
              console.log(valueLevel);
              break;
           }
        }

        if (!valueLevel){
          alert("Please, choose an option!");
          return;
        }else{
          var optionId = $("#optionId").text();
          var optionTitle = $("#optionTitle").text();
          var idAndLevel = optionId + "&" + valueLevel;
          console.log(idAndLevel);
          //database["users"][uname]["events"].push(id);
          database.users[userStorage].events.push(idAndLevel);
          localStorage.setItem("database", JSON.stringify(database));
          alert("Event " + optionTitle + " added with success!");
          $('#calendar-events').fullCalendar('removeEventSources');
          $('#calendar-events').fullCalendar('addEventSource', loadEvents());
          $('#calendar-events').fullCalendar('rerenderEvents');
          $('.btn-secondary').click();
          return;
        }
      });
    },
    eventRender: function(event, element) {
        if (event.level == '1') {
          element.css("color", "red");
        }else{
          element.css("color", "blue");
        }
    }
  }
}

function refreshJSON(){
  //data.events = (dataEventsJSON);
  //data.users = (dataUsersJSON);
  //window.localStorage.setItem("database", JSON.stringify(data));

}
