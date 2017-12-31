'use strict';

function setTime() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  $('#time').html('Welcome, it is now ' + time);
}

function validateLoginForm() {

  var username = $('#username').val();
  var password = $('#password').val();


  if (username === '') {
    $('#username').css('border', '1px solid red');
    $('#username_error').text('username is required');
    $('#username').focus();
    return false;
  } else {
    $('#username_error').text('');
  }

  if (password === '') {
    $('#password').css('border', '1px solid red');
    $('#password_error').text('password is required');
    $('#password').focus();
    return false;
  } else {
    $('#password_error').text('');
  }
}

function loginToAccount() {
  // if valid true and call AJAX - GET /js/credentials.js
  //   if credentials match, create object with isLoggedIn set to true
  //   if credentials do not match, create object with isLoggedIn set to false and error set
  //   to error from invalidLoginErrorMessage returned by AJAX GET
  // return javascript object

  var username = $('#username').val();
  var password = $('#password').val();

  if (username && password) {
    $.ajax({
      url: 'js/credentials.json',
      dataType: 'json',
      type: 'GET',
      cache: true,
      success: function(data) {
        $.each(data, function(index, value) {
          console.log(value.username);
          if (username === value.username && password === value.password) {
            $('#content').hide(data);
            $('#hide').show(data);
            return true;
          } else {
            $('#password_error').text(value.invalidLoginErrorMessage);
            return false;
          }
        });
      }
    });
  }
}


$(document).ready(function() {
  var clock = setInterval(setTime, 1000);

  $('#loginform').submit(function(evt) {

    evt.preventDefault();

    loginToAccount();

    if (!validateLoginForm()) {
      return false;
    }

    // if (results.loggedIn) {
    //   showWelcomePage(username);
    // } else {
    //   showLoginPage({error: results.error});
    // }

  });

  $('#logout').click(function() {
    $('#hide').hide();
    $('#content').show();
  });

});