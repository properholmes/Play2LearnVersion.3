<?php

header("Access-Control-Allow-Origin:* ");

header("Access-Control-Allow-Headers:* ");

header("Access-Control-Allow-Methods:* ");

$method = $_SERVER['REQUEST_METHOD']; //return GET, POST, PUT, DELETE
  
$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password); 

  if($method === 'GET') {

    if(isset($_GET['id'])){
        //fetch single user data
        $query = "SELECT * FROM users WHERE user_id = '".$_GET["id"]."'";
        $result = $db->query($query, PDO::FETCH_ASSOC);
        $data = array();
        foreach($result as $row)
        {
            $data['user_id'] = $row['user_id'];
            $data['first_name'] = $row['first_name'];
            $data['last_name'] = $row['last_name'];
            $data['email'] = $row['email'];
            $data['username'] = $row['username'];
            $data['pass_phrase'] = $row['pass_phrase'];
        }

        echo json_encode($data);

    }
    else {
    //fetch all users
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

}
    if($method === 'POST') {
	$form_data = json_decode(file_get_contents('php://input'));

	$data = array(
		':first_name'		    =>	$form_data->first_name,
		':last_name'		    =>	$form_data->last_name,
        ':username'             =>  $form_data->username ?? 'default_username', // Provide a default value if username is not present
		':email'			    =>	$form_data->email, 
        ':pass_phrase'			=>	$form_data->pass_phrase, 
        ':registration_confirmed' => 1
	);

	$query = 'INSERT INTO users (first_name, last_name, username, email, pass_phrase, registration_confirmed) VALUES (:first_name, :last_name, :username, :email, :pass_phrase, :registration_confirmed)';

	$statement = $db->prepare($query);

	$statement->execute($data);

	echo json_encode(["success" => "done"]);
    }
?>