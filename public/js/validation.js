'use strict';

function setTime() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  $('#time').html('Welcome, it is now ' + time);
}

$(document).ready(function() {
  var clock = setInterval(setTime, 1000);

  $('#myform').submit(function(evt) {

    var username = $('#username').val();
    var password = $('#password').val();

    evt.preventDefault();

    function loginToAccount(username, password) {

    }

    $.ajax({
      url: 'js/credentials.json',
      dataType: 'json',
      type: 'GET',
      cache: true,
      success: function(data) {
        $.each(data, function(index, value) {
          console.log(value.messages[1]);

          if (index.username === '') {
            username.css('border', '1px solid red');
            $('.val_error').text(value.messages[0]);
            $('#username').focus();
            return false;
          } else {
            $('#username_error').text('');
          }

          if (index.password === '') {
            password.css('border', '1px solid red');
            $('.val_error').text(value.messages[1]);
            $('#password').focus();
            return false;
          } else {
            $('#password_error').text('');
          }

          if (index.username === 'sandra@example.com' && data.password === 'letmein') {
            $('#content').hide();
            $('#hide').show();

          } else {
            $('#password').css('border', '1px solid red');
            $('.val_error').text(value.messages[2]);
            $('#password').focus();
            return true;
          }

        });

      }
    });

  });

  $('#btn').click(function() {
    $('#hide').hide();
    $('#content').show();
  });

});