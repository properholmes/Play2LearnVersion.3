<?php
// ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");



$method = $_SERVER['REQUEST_METHOD'];

$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password);

if ($method === 'GET') {
        // fetch all reviews using prepared statement
        $query = 'SELECT user_id, review, featured FROM reviews';
        $stmt = $db->prepare($query);
        $stmt->execute();
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($reviews);  
}


if ($method === 'POST') {
  // prepare an INSERT query and pass data directly to execute()
  $form_data = json_decode(file_get_contents('php://input'));
  $query = 'INSERT INTO reviews (user_id, review, featured) VALUES (?, ?, ?)';
  $stmt = $db->prepare($query);
  
  // trimming data recieved from form
  $review = trim($form_data->review ?? '');

  // create empty arrays for errors handle error validation
  
      $errors = [];
      
      if(!$review) {
          $errors[] = 'Review is required';
      }
 
      // proceed only if no errors
      if(empty($errors)) {
          // execute the prepare statement with user ID, review, and a status (e.g., 1 for active)
          $stmt->execute([$form_data->user_id, $form_data->review, 1]);
          echo json_encode(["success" => "done"]); // "success!" in JSON
      } else {
          echo json_encode($errors); // ... in JSON
      }
}
  ?>
  