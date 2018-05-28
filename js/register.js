
//Password Validation
function checkPassword()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');

    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');

    //Set the colors we will be using ...
    var ValidColor = "#66cc66";
    var InvalidColor = "#ff6666";


    //Compare the values in the password field and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match.
        //Set the color to green and inform the user that they have entered the correct password
        pass2.style.backgroundColor = ValidColor;
        message.style.color = ValidColor;
        message.innerHTML = "Password Match"
        localStorage.setItem('password',pass2.value);
    }else{
        //The passwords do not match. Set the color to red and notify the user.
        pass2.style.backgroundColor = InvalidColor;
        message.style.color = InvalidColor;
        message.innerHTML = "Password Do Not Match!"
    }
}

//Phone number Validation
function validatephone(phone)
{
    // var maintainplus = '';
    // var numval = phone.value
    // if ( numval.charAt(0)=='+' )
    // {
    //     var maintainplus = '';
    // }
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,'');
    phone.value = curphonevar;
    phone.focus;
}

// validates firstname
function Validate(firstname) {
    firstname.value = firstname.value.replace(/[^a-zA-Z\n\r]+/g, '');
    var firstname = document.getElementById('firstname').value;
    localStorage.setItem('firstname', firstname);
}

// validates lastname
function Validate(lastname) {
    lastname.value = lastname.value.replace(/[^a-zA-Z\n\r]+/g, '');
}

//validate username
function uname_validate(uname){
  uname.value = uname.value.replace(/[^0-9a-zA-Z\n\r]+/g, '');
  var uname = document.getElementById('uname').value;
  localStorage.setItem('username', uname);
}

// validate email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if(regMail.test(email) == false)
    {
      document.getElementById("status").innerHTML    = "<span class='warning'>Email address is not valid.</span>";
    }
    else
    {
      document.getElementById("status").innerHTML	= "";
      var email = document.getElementById('email').value;
      localStorage.setItem('email', email);
    }
}

// validate date of birth
// function dob_validate(dob)
// {
// var regDOB = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
//
//     if(regDOB.test(dob) == false)
//     {
//       document.getElementById("statusDOB").innerHTML	= "<span class='warning'>DOB is only used to verify your age.</span>";
//     }
//     else
//     {
//       document.getElementById("statusDOB").innerHTML	= "<span class='valid'>Thanks, you have entered a valid DOB!</span>";
//     }
// }

// validate address
function add_validate(address)
{
var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;

    if(regAdd.test(address) == false)
    {
      document.getElementById("address").innerHTML	= "<span class='warning'>Address is not valid yet.</span>";
    }
    else
    {
      document.getElementById("address").innerHTML	= "<span class='valid'>Thanks!</span>";
    }
}
