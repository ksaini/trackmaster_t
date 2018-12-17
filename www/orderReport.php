<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include_once("variables.php");
$servername = $_SESSION["servername"];
$username = $_SESSION["username"];
$password = $_SESSION["password"];
$dbname = $_SESSION["dbname"];

$st_dt = $_GET['frm'];
$end_dt = $_GET['to'];

if(isset($_GET['agentid'])){
	$agent = $_GET['agentid'];
	$sql = "SELECT did,concat(firmname,', ',addr) as detail from t_dealer_tbl where agentid=$agent";
}
else if(isset($_GET['did'])){
	$did = $_GET['did'];
	//$sql = "SELECT did,firmname,addr from t_dealer_tbl where did=$did";
        $sql = "SELECT d.did,d.firmname,d.addr, a.name as agent from t_dealer_tbl d, t_agent_tbl a where d.agentid=a.id and did=$did";
}
else if(isset($_GET['getall'])){
	$sql = "SELECT id, name from t_agent_tbl;";
}

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

?>