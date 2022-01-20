<!DOCTYPE html>
<html>
<head>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<title>Fazle Rabbi Faiyaz's Login Page</title>
</head>
<body>
<div class="container"><h1>Please Log In</h1></div>
<?php
 $salt = uniqid('',true);
 $password=$salt.md5("php123");
if(isset($_POST["who"]) && isset($_POST["pass"])){
	$check=$salt.md5($_POST["pass"]);
	if(empty($_POST['who'])|| empty($_POST['pass'])){
		echo "<p style=\"color: red;\">Email and password are required</p>";
	}
	elseif(!strstr($_POST['who'],"@")) {
		echo "<p style=\"color: red;\">Email must have an at-sign (@)</p>";
	}
	elseif ($check!=$password) {
		echo "<p style=\"color: red;\">Incorrect password</p>";
		//error_log("Login fail ".$_POST["who"]." $check"); Logs any errors
	}
	else{
		header("Location: autos.php?name=".urlencode($_POST['who']));
		/* Make sure that code below does not get executed when we redirect. */
		exit; //we also use: return
	}
}
?>
<form method="post" class="container">
<label for="user_id">User Name</label>
<input type="text" name="who" id="user_id"><br>
<label for="p">Password</label>
<input type="password" name="pass" id="p"><br>
<input type="submit" value="Log In">
<input type="submit" value="Cancel">
</form>
<p class="container">
For a password hint, view source and find a password hint
in the HTML comments.
<!-- Hint: The password is the three character name of the 
programming language used in this class (all lower case) 
followed by 123. -->
</p>
</div>
</body>
