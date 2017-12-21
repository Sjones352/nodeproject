"use strict";

var clock = setInterval(setTime, 1000);


function setTime() {
  var now = new Date();
  var time = document.getElementById("time");
  time.textContent = "Welcome, it is now " + now.toLocaleTimeString();
}

// This will only be called once the HTML is fully read by the browser
// and the document object model (DOM) representation of the page exists
// in memory.
window.addEventListener("load", function() {

  setTime();
  
  document.getElementById("myform").addEventListener('submit', validateForm, false);

  document.getElementById("btn").addEventListener("click", function( event ) {
    document.getElementById("hide").style.display = 'none';
    document.getElementById('myform').style.visibility = 'visible';
  }, false);

  return true;
});

function validateForm(evt) {
  var username = document.loginForm.username;
  var password = document.loginForm.password;
  var username_error = document.getElementById("username_error");
  var password_error = document.getElementById("password_error");
  var time = document.getElementById("time");
  var hide = document.getElementById('hide');
  var form = document.getElementById('content');

  evt.preventDefault();

  if (username.value === "") {
    username.style.border = "1px solid red";
    username_error.textContent = "Username is required";
    username.focus();
    return false;
  } else {
    username_error.textContent = "";
  }

  if (password.value === "") {
    password.style.border = "1px solid red";
    password_error.textContent = "password is required";
    password.focus();
    return false;
  } else {
    password_error.textContent = "";
  }


  if (username.value === "sandra@example.com" && password.value === "letmein") {
    form.style.visibility = 'hidden';
    hide.style.display = "block";

  } else {
    password.style.border = "1px solid red";
    password_error.innerHTML = "Invalid credentials";
    password.focus();
    return true;
  }

  return true;
}

