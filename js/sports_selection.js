$("select").imagepicker({show_label: true});
var user = localStorage.getItem("currentUser");
console.log(user);

function nextButton(){
  var sportsSelected =  $("select").val();

  console.log(sportsSelected);

  var length = sportsSelected.length;

  if (length == null || length == undefined || length == 0) {
    return;
  }

  var data = localStorage.getItem("database");

  if (data != undefined || data != null) {
    database = JSON.parse(data);

    for (var i = 0; i < length; i++){
      if (sportsSelected[i] == "Football") {
          database["users"][user]["Football"] = true;
      } else if(sportsSelected[i] == "Baseball"){
          database["users"][user]["Baseball"] = true;
      } else if(sportsSelected[i] == "Basketball"){
          database["users"][user]["Basketball"] = true;
      } else if(sportsSelected[i] == "Hockey"){
          database["users"][user]["Ice Hockey"] = true;
      } else if(sportsSelected[i] == "Soccer"){
          database["users"][user]["Soccer"] = true;
      }
    }

    localStorage.setItem("database", JSON.stringify(database));

    window.location.assign("home.html");

  } else {

    for (var i = 0; i < length; i++){
      if (sportsSelected[i] == "Football") {
          database["users"][user]["Football"] = true;
      } else if(sportsSelected[i] == "Baseball"){
          database["users"][user]["Baseball"] = true;
      } else if(sportsSelected[i] == "Basketball"){
          database["users"][user]["Basketball"] = true;
      } else if(sportsSelected[i] == "Hockey"){
          database["users"][user]["Ice Hockey"] = true;
      } else if(sportsSelected[i] == "Soccer"){
          database["users"][user]["Soccer"] = true;
      }
    }

    localStorage.setItem("database", JSON.stringify(database));

    window.location.assign("home.html");

  }

}