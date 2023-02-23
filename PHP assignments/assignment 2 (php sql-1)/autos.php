<!DOCTYPE <html>
	<head>
		<title>Fazle Rabbi Faiyaz's Automobile Tracker</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	</head>
	<body>
		<?php
		if(!isset($_GET['name'])){
			die("Name parameter missing");
		}
		else{
			echo "<div class=\"container\"><h1>Tracking Autos for ",htmlentities($_GET['name']),"</h1></div>";
			if(isset($_POST['logout'])){
				header('Location: index.php');
				/* Make sure that code below does not get executed when we redirect. */
				return; //we also use: exit
			}
			elseif(isset($_POST['make']) && isset($_POST['mileage']) && isset($_POST['year'])){
				if(strlen($_POST['make'])<1) echo "<p class=\"container\" style=\"color: red;\">Make is required</p>";
				elseif (!(is_numeric($_POST['mileage'])||is_numeric($_POST['year']))) {
					echo "<p class=\"container\" style=\"color: red;\">Mileage and year must be numeric</p>";
				}
				else{
					try{
						$pdo = new PDO('mysql:host=localhost;port=3306;dbname=misc', 'fred', 'zap');
						$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
						$stmt = $pdo->prepare('INSERT INTO autos(make, year, mileage) VALUES ( :mk, :yr, :mi)');
						$stmt->execute(array(
							':mk' => $_POST['make'],
							':yr' => $_POST['year'],
							':mi' => $_POST['mileage'])
						);
						if(isset($_POST['add'])){
							echo "<p class=\"container\" style=\"color: green;\">Record inserted</p>";
						}
					}
					catch ( PDOException $e ) {
						echo "$e";
					}
				}
			}
		}
		?>
		<form method="post" class="container">
			<label for="ma">Make:</label>
			<input type="text" name="make" size="60" id="ma"><br>
			<label for="y">Year:</label>
			<input type="text" name="year" id="y"><br>
			<label for="mi">Mileage:</label>
			<input type="text" name="mileage" id="mi"><br>
			<input type="submit" name="add" value="Add">
			<input type="submit" name="logout" value="Logout">
		</form>
		<h2 class="container">Automobiles</h2>
		<?php 
		if(isset($_POST['make']) && isset($_POST['mileage']) && isset($_POST['year'])){
			if(strlen($_POST['make'])>1 && is_numeric($_POST['mileage']) && is_numeric($_POST['year']) && isset($_POST['add'])){
				echo "<p class=\"container\">",$_POST['year']," ", htmlentities($_POST['make']),"/",$_POST['mileage'],"</p>";
			}
		}
		?>
	</body>
</html>
