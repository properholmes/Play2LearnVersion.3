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
  $query = 'INSERT INTO reviews (user_id, review, featured) VALUES (?, ?, ?)';
  $stmt = $db->prepare($query);
  
  //trimming data recieved from form
  $review = trim($form_data->review ?? '');

  //create empty arrays for errors handle error validation
  
      $errors = [];

      if(!$review) {
          $errors[] = 'Review is required';
      }
 

      if(empty($errors)) {
          $stmt->execute([$form_data->user_id, $form_data->review, 1]);
          echo json_encode(["success" => "done"]);
      } else {
          echo json_encode($errors);
      }
}
  ?>
  