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

?>