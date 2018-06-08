
$("#loginBtn").on("click", function(){
  var uname = $("#username").val();
  var pass = $("#password").val();

  var data = localStorage.getItem("database");

  if (data != undefined || data != null) {
    console.log("Getting database from localStorage");
    database = JSON.parse(data);
    var db_uname = database["users"][uname];
    if (db_uname != undefined || db_uname != null ) {
      if (database["users"][uname]["password"] == pass) {
        console.log("username and password match");
        if (database["users"][uname]["isFirstTimeLogin"]) {
          console.log("First time login");
          database["users"][uname]["isFirstTimeLogin"] = false;
          localStorage.setItem("database", JSON.stringify(database));
          
          localStorage.setItem("currentUser", uname);

          window.location.assign("sports_selection.html");
        } else {
          console.log("User is not logging first time");
          
          localStorage.setItem("currentUser", uname);

          window.location.assign("home.html");
        }
      } else {
        alert("Wrong username or password");
        console.log("wrong username or pass");
      }
    } else {
      alert("No matching username found");
      console.log("No matching username found");
    }
  } else 
  {
    //Data is new so use database.js
    var db_uname = database["users"][uname];
    if (db_uname != undefined || db_uname != null ) {
      if (database["users"][uname]["password"] == pass) {
        console.log("username and password match");
        if (database["users"][uname]["isFirstTimeLogin"]) {
          console.log("First time login");
          database["users"][uname]["isFirstTimeLogin"] = false;
          localStorage.setItem("database", JSON.stringify(database));

          localStorage.setItem("currentUser", uname);

          window.location.assign("sports_selection.html");
          
        } else {
          console.log("User is not logging first time");

          localStorage.setItem("currentUser", uname);
          
          window.location.assign("home.html");
          
        }
      } else {
        alert("Wrong username or password");
        console.log("wrong username or pass");
      }
    } else {
      alert("No matching username found");
      console.log("No matching username found");
    }
  }
});
