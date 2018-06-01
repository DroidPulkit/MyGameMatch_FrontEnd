$(document).ready(function()
{
    var uname = localStorage.getItem("currentUser");

    var data = localStorage.getItem("database");

    var favSports = [];

    if (data != undefined || data != null) {
        console.log("Getting database from localStorage");
        database = JSON.parse(data);

        if (database["users"][uname]["Soccer"]) {
            favSports.push("Soccer");
        } 
        if (database["users"][uname]["Basketball"]){
            favSports.push("Basketball");
        } 
        if (database["users"][uname]["Football"]){
            favSports.push("Football");
        } 
        if (database["users"][uname]["Baseball"]){
            favSports.push("Baseball");
        } 
        if (database["users"][uname]["Ice Hockey"]){
            favSports.push("Ice Hockey");
        }

        var postsArray = [];

        var posts = database["posts"];

        var length_j = favSports.length;

        console.log(length_j);

        var length_i = posts.length;

        console.log(length_i);

        for (var i = 0; i < length_i; i++){
            for(var j = 0; j < length_j; j++){
                console.log("match 1");
                console.log(database["posts"][i]["category"]);
                console.log("match 2");
                console.log(favSports[j]);
                if (database["posts"][i]["category"] == favSports[j]) {
                    console.log("Yo matched");
                    postsArray.push(database["posts"][i]);
                }
            }
        }

        var length_postArray = postsArray.length;

        console.log(length_postArray);

        for (var k = 0; k < length_postArray; k++){
            var title = postsArray[k]["title"];
            var content = postsArray[k]["content"];
            var url = postsArray[k]["url"];
            var html = '<div class="card card_largest_with_image grid-item" style="position: relative; !important"> <img class="card-img-top" src="' + url + '"  alt="#"><div class="card-body"><div class="card-title"><a href="#">' + title + '</a></div><p class="card-text">' + content + '</p></div></div>';
            $("#postDataToDisplay").append(html)
        }

        //EVENTS ------------------------------------------------------------------------------------------------
        var events = database["events"];

        var length_a = events.length;

        console.log(length_a);

        var length_b = favSports.length;

        console.log(length_b);

        var eventsArray = [];

        for (var a = 0; a < length_a; a++){
            for(var b = 0; b < length_b; b++){
                console.log("match 1");
                console.log(database["events"][a]["sport"]);
                console.log("match 2");
                console.log(favSports[b]);
                if (database["events"][a]["sport"] == favSports[b]) {
                    console.log("Yo matched");
                    eventsArray.push(database["events"][a]);
                }
            }
        }

        var length_eventsArray = eventsArray.length;

        console.log(length_eventsArray);

        for (var z = 0; z< length_eventsArray; z++){
            var id = eventsArray[z]["id"];
            var title = eventsArray[z]["title"];
            var startDate = eventsArray[z]["start"];
            var parts = startDate.split('-');
            var year = parts[0];
            var month = parts[1];
            var date = parts[2];
            var monthInAlpha = "";
            switch (month){
                case "01" :
                    monthInAlpha = "JAN";
                    break;
                case "02" :
                    monthInAlpha = "FEB";
                    break;
                case "03" :
                    monthInAlpha = "MAR";
                    break;
                case "04" :
                    monthInAlpha = "APR";
                    break;
                case "05" :
                    monthInAlpha = "MAY";
                    break;
                case "06" :
                    monthInAlpha = "JUN";
                    break;
                case "07" :
                    monthInAlpha = "JUL";
                    break;
                case "08" :
                    monthInAlpha = "AUG";
                    break;
                case "09" :
                    monthInAlpha = "SEP";
                    break;
                case "10" :
                    monthInAlpha = "OCT";
                    break;
                case "11" :
                    monthInAlpha = "NOV";
                    break;
                case "12" :
                    monthInAlpha = "DEC";
                    break;
                default :
                    monthInAlpha = "JAN";
                    break;
            }
            console.log(date);
            console.log(monthInAlpha);
            var aux = id + ", '" + title + "'" ;
            var htmlEvent = '<div class="side_post"><a onclick="addEventToDatabase(' + aux + ')"><div class="d-flex flex-row align-items-xl-center align-items-start justify-content-start"><div class="event_date d-flex flex-column align-items-center justify-content-center"><div class="event_day">' + date + '</div><div class="event_month">' + monthInAlpha + '</div></div><div class="side_post_content"><div class="side_post_title">' + title + '</div></div></div></a></div>';


            console.log(htmlEvent);
            $("#addEventToHome").append(htmlEvent);
        }

    }

});


$("#logout").on("click", function(){
    localStorage.setItem("currentUser", null);
    window.location.assign("index.html");
});

function addEventToDatabase(id, title){
    console.log(id);

    var uname = localStorage.getItem("currentUser");

    var result = confirm("Attend " + title + "?");
    if (result == true){
        var attended = false;
        var userAgenda = database["users"][uname]["events"];
        for (att in userAgenda) {
            if (id == userAgenda[att]){
              attended = true;
              break;
            }
        }

        if (!attended){
            database["users"][uname]["events"].push(id);
            localStorage.setItem("database", JSON.stringify(database));
            alert("Event " + title + " added with success!");
        } 
        else
        {
        alert("You are already attending this event!");
        }
    }
    
}











