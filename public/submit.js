<script>
  var form = document.getElementById("myForm");
  form.addEventListener('submit', function(evt) {
  var username = document.loginForm.username;
  var password = document.loginForm.password;
  var username_error = document.getElementById("username_error");
  var password_error = document.getElementById("password_error");
  var time = document.getElementById("time");
  var hide = document.getElementById('hide');

    if (username.value === "") {
    evt.preventDefault();
    username.style.border = "1px solid red";
    username_error.textContent = "Username is required";
    username.focus();
    console.log('Form submission cancelled.');
    return false;
  } else {
    username_error.textContent = "";
  }

  if (password.value === "") {
    evt.preventDefault();
    password.style.border = "1px solid red";
    password_error.textContent = "password is required";
    password.focus();
    return false;
  } else {
    password_error.textContent = "";
  }


  if (username.value === "sandra@example.com" && password.value === "letmein") {
    evt.preventDefault();
        hide.style.visibility = 'visible';
               
    } else {

        password.style.border = "1px solid red";
        password_error.innerHTML = "Invalid credentials";
        password.focus();
        return true;
    } 
  
});

    </script>