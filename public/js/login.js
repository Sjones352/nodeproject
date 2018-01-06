'use strict';

function setViewTime() {
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
  var username = $('#username').val();
  var password = $('#password').val();

  if (username && password) {
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
}


$(document).ready(function() {
  setInterval(setViewTime, 1000);

  $('#loginform').submit(function(evt) {
    evt.preventDefault();
    validateLoginForm()
    loginToAccount();

  });

  $('#logout').click(function() {
    $('#welcome').hide();
    $('#content').show();
  });

});