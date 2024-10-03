<?php

header("Access-Control-Allow-Origin:* ");

header("Access-Control-Allow-Headers:* ");

header("Access-Control-Allow-Methods:* ");

$dsn = 'mysql:host=127.0.0.1:8889;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$connect = new PDO($dsn, $username, $password);

$method = $_SERVER['REQUEST_METHOD']; //return GET, POST, PUT, DELETE

if($method === 'GET')
{
	//fetch all user data

		$query = "SELECT * FROM users ORDER BY user_id DESC";

		$result = $connect->query($query, PDO::FETCH_ASSOC);


		$data = array();

		foreach($result as $row)
		{
			$data[] = $row;
		}
		echo json_encode($data);
	
}


?>