
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Fazle Rabbi Faiyaz Severance</title>
</head>
<body>
	<h1>Fazle Rabbi Faiyaz Severance Request / Response</h1>
	<div>
		<?php
		echo ("The SHA256 hash of \"Fazle Rabbi Faiyaz\" is "),hash ('sha256', 'Fazle Rabbi Faiyaz'),"\n";
		?>	
	</div>
	<pre>
		<div>ASCII ART:
		<p style="margin-left:4.3%;">
		<?php
			$r=7;
			$c=11;
			for($i=1;$i<=$r;$i++){
				if($i==1){
					for($j=1;$j<=$c;$j++){
						if($j==$c) echo("*\n");
						else echo("*");
					}
				}
				elseif ($i==round($r/2)) {
					for($j=1;$j<=round($c/2);$j++){
						if($j==round($c/2)) echo("*\n");
						else echo("*");
					}
				}
				else echo("*\n");
			}
		?>
		</p>
		</div>
	</pre>
	<div>
	<a href="check.php">Click here to check the error setting</a><br><a href="fail.php">Click here to cause a traceback</a>	
	</div>
</body>
</html>