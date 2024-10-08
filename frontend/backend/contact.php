<?php
// ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

require 'header.php';

$method = $_SERVER['REQUEST_METHOD'];

$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password);


if ($method === 'POST') {
  require_once 'mail-config.php';
  // No insert into query and execute here - just getting file contents and sending in email 
  $form_data = json_decode(file_get_contents('php://input'));

  
  //trimming data received from form
  $first_name = trim($form_data->first_name ?? '');
  $last_name = trim($form_data->last_name ?? '');
  $email = trim($form_data->email ?? '');
  $message = trim($form_data->message ?? '');

  //create empty arrays for errors handle error validation
  
    $errors = [];

    if(!$first_name) {
        $errors[] = 'First name required.';
    }

    if(!$last_name){
        $errors[] = 'Last name required.';
    }

    if(!$message) {
        $errors[] = 'Your message is required.';
    }

    if(!$email) {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is not valid';
    }
 
      // if no errors send email 
      if(empty($errors)) {
          echo json_encode(["success" => "done"]);
          $to = $email;
          $toName = $first_name . ' ' . $last_name;
          $subject = 'Contact Form Submission';
          $html = "<p>Thanks for taking the time to contact us! We <strong>will</strong> take note of what you wrote.</p>
                  <p>Name: $toName</p>
                  <p>Email: " . $email . "</p>
                  <h3>Your Message:". $message ."</h3>";
          $text = "Thanks for taking the time to contact us! We will take note of what you wrote.
                  * Name: $toName
                  * Email: " . $email . "
                  * Here is the message you sent: " ." " . $message;
                 
          // Pass true to createMailer() to enable debugMode
          $mail = createMailer();
          $mail->addAddress($to, $toName);
          // Uncomment this and add your email to bcc yourself
          $mail->addBcc('manavg2018@gmail.com');
          $mail->Subject = $subject;
          $mail->Body = $html;
          $mail->AltBody = $text;
      
          $mail->send();
        

      } else {
        echo json_encode($errors);
      }
}

?>
  