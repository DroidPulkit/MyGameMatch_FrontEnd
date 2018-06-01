$("#register").on("click", function(){

    var fname = $("#firstname").val();
    var lname = $("#lastname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var pass1 = $("#pass1").val();
    var pass2 = $("#pass2").val();

    var isDataGood = true;

    if (fname == "") {
        isDataGood = false;
    }

    if (lname == "") {
        isDataGood = false;
    }

    if (email == "") {
        isDataGood = false;
    }

    if (phone == "") {
        isDataGood = false;
    }

    if (pass1 == "") {
        isDataGood = false;
    }

    if (pass2 == "") {
        isDataGood = false;
    }

    if (pass1 != pass2) {
        isDataGood = false;
    }

    if (!isDataGood) {
        alert("Data entered in form seems wrong");
        return;
    }

    if (isDataGood) {
        var userData = {
            "email" : email,
            "password" : pass2,
            "isLogin" : false,
            "isFirstTimeLogin" : true,
            "firstName" : fname,
            "lastName" : lname,
            "phoneNumber" : phone,
            "Soccer" : false,
            "Basketball" : false,
            "Football" : false,
            "Baseball" : false,
            "Ice Hockey" : false,
            "events" : []
        }
        database["users"][email] = userData;
        localStorage.setItem("database", JSON.stringify(database));
        alert("Sign Up Successfull!!");
    }


});
