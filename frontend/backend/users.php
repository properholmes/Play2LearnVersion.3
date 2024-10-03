<?php

header("Access-Control-Allow-Origin:*");

header("Access-Control-Allow-Headers:* ");

header("Access-Control-Allow-Methods:* ");

$method = $_SERVER['REQUEST_METHOD']; //return GET, POST, PUT, DELETE
  
$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password); 

  if($method === 'GET') {

    $query = 'SELECT user_id, first_name, last_name, email, username, is_admin, date_registered, registration_confirmed
        FROM users';
    $stmt = $db->prepare($query);
    $stmt->execute();

    $users = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $users[] = $row;
    }

    echo json_encode($users);
}
?>