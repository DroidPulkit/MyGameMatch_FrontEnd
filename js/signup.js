$("#register").on("click", function(){

    var databaseLocal = JSON.parse(localStorage.getItem('database'));
    if(!databaseLocal){
      databaseLocal = database;
    }

    var fname = $("#firstname").val();
    var lname = $("#lastname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var pass1 = $("#pass1").val();
    var pass2 = $("#pass2").val();

    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(phone);
    console.log(pass1);
    console.log(pass2);

    var isDataGood = true;

    if (!checkPassword()) {
      isDataGood = false;
    }

    if (!validatephone(phone)) {
      isDataGood = false;
    }

    if (!email_validate(email)) {
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

      };
      databaseLocal.users[email] = userData;
      //database.users.push(email);
      //database.users.email.push(userData);
      //database["users"][email] = userData;
      localStorage.setItem("database", JSON.stringify(databaseLocal));
      alert("Sign Up Successfull!!");
    }


});


//Password Validation
function checkPassword()
{
    //Store the password field objects into variables ...
    var pass1 = $('#pass1');
    var pass2 = $('#pass2');

    //Compare the values in the password field and the confirmation field
    if(pass1.value == pass2.value){
        return true;
    }else{
        return false;
    }
}

//Phone number Validation
function validatephone()
{
    var phone = $("#phone");
    var numval = phone.val();

    phone.val(phone.val().replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g, ''));

    if (numval.length == 10) {
      return true;
    } else {
      return false;
    }
}

// validates firstname
function ValidateFirstName(firstname) {
    firstname.value = firstname.value.replace(/[^a-zA-Z\n\r]+/g, '');
}

// validates lastname
function ValidateLastName(lastname) {
    lastname.value = lastname.value.replace(/[^a-zA-Z\n\r]+/g, '');
}

// validate email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if(regMail.test(email) == false)
    {
      return false;
    }
    else
    {
      return true;
    }
}
