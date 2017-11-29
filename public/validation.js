'use strict';

function validateForm() {

	var username = document.loginForm.username;
	var password = document.loginForm.password;
	var username_error = document.getElementById("username_error");
	var password_error = document.getElementById("password_error");
	var time = document.getElementById("time");
	// var now  = new Date();

	// time.textContent = "Welcome, it is now " +  now.toLocaleTimeString();

	if (username.value == "") {
		username.style.border = "1px solid red";
		username_error.textContent = "Username is required";
		username.focus();
		return false;
	}

	if (password.value == "") {
		password.style.border = "1px solid red";
		password_error.textContent = "password is required";
		password.focus();
		return false;
	}

	if (username.value == "sandra@example.com" && password.value == "letmein") {
		time.innerHTML = "Welcome, Sandra";
		time.focus();
	} else if (username.value == "sandra@example.com" && password.value !== "letmein") {
		password.style.border = "1px solid red";
		password_error.innerHTML = "Invalid credentials";
		password.focus();
		return true;
	}

	return true;
}