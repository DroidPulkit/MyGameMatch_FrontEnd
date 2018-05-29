$(document).ready(function() {
  $('#calendar-events').fullCalendar({
    header: {
                   left: '',
                   center: 'title',
                   right: 'prev,next'
               },
    defaultView: 'listMonth',
    defaultDate: formatDate(),
    editable: true, // Don't allow editing of events
    eventLimit: true,
    displayEventTime: true,// Display event time
    events: function(start, end, timezone, callback ) {
            var test = "{title: 'This is a Material Design event!',start: '2018-05-20T08:30:00',end: '2018-05-20T08:30:00',color: '#C2185B'},{title: 'This is a Material Design event!',start: '2018-05-20T08:30:00',end: '2018-05-20T08:30:00',color: '#C2185B'},{title: 'This is a Material Design event!',start: '2018-05-20T08:30:00',end: '2018-05-20T08:30:00',color: '#C2185B'},{title: 'This is a Material Design event!',start: '2018-05-20T08:30:00',end: '2018-05-20T08:30:00',color: '#C2185B'}";
            var events =[
               {
                    title  : 'event1',
                    start  : '2018-05-18T08:30:00',
                    end    : '2018-05-19T12:30:00',
                },
                {
                    title  : 'event2',
                    start  : '2018-05-19T08:30:00',
                    end    : '2018-05-19T09:30:00',
                },
                {
                    title  : 'event3',
                    start  : '2018-05-20T10:30:00',
                    allDay : false // will make the time show
                }];
                events.push({
                  title: 'This is a Material Design event!',
                  start: '2018-05-20T08:30:00',
                  end  : '2018-05-20T08:30:00',
                  color: '#C2185B'});
                callback(events);
        }
     });

  /*$('#calendar').fullCalendar({
      defaultDate: formatDate(),//'2018-05-12',
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'All Day Event',
          start: '2018-05-01'
        },
        {
          title: 'Long Event',
          start: '2018-05-07',
          end: '2018-05-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-05-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-05-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-05-11',
          end: '2018-05-13'
        },
        {
          title: 'Meeting',
          start: '2018-05-12T10:30:00',
          end: '2018-05-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-05-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-05-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-05-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-05-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-05-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-05-28'
        }
      ]
  });*/

  /*$.getJSON( "json/events.json", function( json ) {
    console.log( json );
  });
  $(function() {
    var eventsa = JSON.parse( events);
    eventsa.forEach(function(item) {
        console.log(item.title);
    });
  })*/

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
