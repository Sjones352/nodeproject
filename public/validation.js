"use strict";

function setTime() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  $("#time").html("Welcome, it is now " + time);
}

$(document).ready(function() {
  var clock = setInterval(setTime, 1000);

  $('#myform').submit(function(evt) {
    var username = $('#username').val();
    var password = $('#password').val();

    evt.preventDefault();

    if (username === "") {
      $("#username").css("border", "1px solid red");
      $('#username_error').text("Username is required");
      $('#username').focus();
      return false;
    } else {
      $('#username_error').text("");;
    }

    if (password === "") {
      $("#password").css("border", "1px solid red");
      $('#password_error').text("password is required")
      $('#password').focus();
      return false;
    } else {
      $('#password_error').text("");
    }

    if (username === "sandra@example.com" && password === "letmein") {
      $('#content').hide();
      $('#hide').show();

    } else {
      $("#password").css("border", "1px solid red");
      $('#password_error').text("Invalid credentials");
      $('#password').focus();
      return true;
    }

  });


  $('#btn').click(function() {
    $('#hide').hide();
    $('#content').show();
  });
});