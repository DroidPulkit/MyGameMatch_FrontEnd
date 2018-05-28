
function loginValidation(event){
  var uname = document.getElementById('username').value;
  var pass = document.getElementById('password').value;

  var email = localStorage.getItem('email');
  var username = localStorage.getItem('username');
  var password = localStorage.getItem('password');

  console.log(uname);
  console.log(pass);
  console.log(email);
  console.log(password);
  console.log(username);

  if((uname == email || uname == username) && (pass == password)){
    alert("login successfull");
    return true;
  }else{
    alert('Invalid username or password. Please try again');
    event.preventDefault(event);
  }
}
