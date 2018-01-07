'use strict';

function updateTimeInView() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  $('#time').html('Welcome, it is now ' + time);
}

function validateLoginForm() {
  var username = $('#username').val();
  var password = $('#password').val();

  var isValid = true;

  $('#password_error').text('');
  $('#username_error').text('');

  if (username === '') {
    $('#username').css('border', '1px solid red');
    $('#username_error').text('username is required');
    $('#username').focus();
    isValid = false;
  } 

  if (password === '') {
    $('#password').css('border', '1px solid red');
    $('#password_error').text('password is required');
    $('#password').focus();
    isValid = false;
  }

  return isValid;
}

function loginToAccount() {
  var username = $('#username').val();
  var password = $('#password').val();

    $.ajax({
      url: 'js/credentials.json',
      dataType: 'json',
      type: 'GET',
      cache: true,
      success: function(response) {
        $.each(response, function(index, login) {
          console.log(login.username);
          if (username === login.username && password === login.password) {
            $('#content').hide(response);
            $('#welcome').show(response);
            return true;
          } else {
            $('#password_error').text(login.invalidLoginErrorMessage);
            return false;
          }
        });
      }
    });
}


$(document).ready(function() {
  setInterval(updateTimeInView, 1000);

  $('#loginform').submit(function(evt) {
    evt.preventDefault();
    if(!validateLoginForm()) {
      return false;
    }
    
    loginToAccount();
    return true;
  });

  $('#logout').click(function() {
    $('#welcome').hide();
    $('#content').show();
  });

});