'use strict';

function validateForm() {

	var username = window.loginForm.username;
	var password = window.loginForm.password;

	if (username.value == "") {
		window.alert("Username is required");
		return false;
	}

	if (password.value == "") {
		window.alert("Password is required");
		return false;
	}

	if (username.value == "sandra@example.com" && password.value == "letmein") {
		window.alert("Login accepted. Welcome");
		return true;
	}


	if (username.value == "sandra@example.com" && password.value !== "letmein") {
		window.alert("Invalid credentials");
		return true;
	}

	return true;
}