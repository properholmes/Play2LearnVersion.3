<?php
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

$method = $_SERVER['REQUEST_METHOD'];

$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password);

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        // Fetch single user data using prepared statement
        $query = "SELECT * FROM users WHERE user_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$_GET['id']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode($result);
        } else {
            // Handle case where no user was found
            echo json_encode(['error' => 'User not found']);
        }
    } else {
        // Fetch all users using prepared statement
        $query = 'SELECT user_id, first_name, last_name, email, username, is_admin, date_registered, registration_confirmed FROM users';
        $stmt = $db->prepare($query);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    }
}

if ($method === 'POST') {
    // Prepare INSERT query and pass data directly to execute()
    $form_data = json_decode(file_get_contents('php://input'));
    $query = 'INSERT INTO users (first_name, last_name, username, email, pass_phrase, registration_confirmed) VALUES (?, ?, ?, ?, ?, ?)';
    $stmt = $db->prepare($query);
    
    //trimming data recieved from form
    $first_name = trim($form_data->first_name ?? '');
    $last_name = trim($form_data->last_name ?? '');
    $username = trim($form_data->username ?? '');
    $email = trim($form_data->email ?? '');

    //create empty arrays for errors handle error validation
    
        $errors = [];

        if(!$first_name) {
            $errors[] = 'First name required.';
        }

        if(!$last_name){
            $errors[] = 'Last name required.';
        }

        if(!$username) {
            $errors[] = 'Username required.';
        }

        if(!$email) {
            $errors[] = 'Email is required.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Email is not valid';
        }

        if(!$form_data->pass_phrase){
            $errors[] = 'Password is required.';
        } elseif(strlen($form_data->pass_phrase) < 8) {
            $errors[] = 'Password must be at least 8 characters.';
        } elseif ($form_data->pass_phrase !== $form_data->confirm_pass_phrase){
            $errors[] = 'Passwords do not match.';
        }

       

        if(empty($errors)) {
            $stmt->execute([$form_data->first_name, $form_data->last_name, $form_data->username ?? 'default_username', $form_data->email, $form_data->pass_phrase, 1]);
            echo json_encode(["success" => "done"]);
        } else {
            echo json_encode($errors);
        }
}

if ($method === 'PUT') {
    // Prepare UPDATE query and pass data directly to execute()
    $form_data = json_decode(file_get_contents('php://input'));
    $query = "UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, pass_phrase = ? WHERE user_id = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$form_data->first_name, $form_data->last_name, $form_data->username, $form_data->email, $form_data->pass_phrase, $_GET['id']]);

    echo json_encode(["success" => "done"]);
}

if($method === 'DELETE')
{
	//Delete User Data

	$query = "DELETE FROM users WHERE user_id = ?";

	$statement = $db->prepare($query);

	$statement->execute([$_GET['id']]);

	echo json_encode(["success" => "done"]);
}


?>