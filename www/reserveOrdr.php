<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include_once("variables.php");
$servername = $_SESSION["servername"];
$username = $_SESSION["username"];
$password = $_SESSION["password"];
$dbname = $_SESSION["dbname"];

$stocks = json_decode($_GET['stocks']);
$ids = json_decode($_GET['ids']);

$isql = "";

foreach($stocks as $stock){
	$isql .= "UPDATE t_item_tbl set stock=$stock['stock'] where code = $stock['code'] ;";
}
echo $isql ;
/*
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				array_push($data,$row);
			}
		} else {
			echo "0 results";
		}

mysqli_close($conn);
echo json_encode($data );
*/
?>