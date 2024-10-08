<?php
// ini_set('display_errors', 1);
require 'header.php';
require_once 'utilities.php';



header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");


$method = $_SERVER['REQUEST_METHOD'];


$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';


$db = new PDO($dsn, $username, $password);




if ($method === 'POST') {
    

    $form_data = json_decode(file_get_contents('php://input'));
   
    //trimming data recieved from form
    $username = trim($form_data->username ?? '');
    $email = trim($form_data->email ?? '');
    $passPhrase = $form_data->pass_phrase;

    //create empty arrays for errors handle error validation 
    $errors = [];

    if(!$username) {
        $errors[] = 'Username required.';
    }

    if(!$passPhrase) {
        $errors[] ='Password required.';
    }
    
    if ($username && $passPhrase) {
    
        $qLogin = "SELECT pass_phrase, registration_confirmed, user_id
          FROM users
          WHERE username = ?";
    
        try {
          $stmt=$db->prepare($qLogin);
          $stmt->execute([$username]);
          
          if (!$row = $stmt->fetch()) {
            // username doesn't exist
            $loginFailed = true;
            $errors[] = "Username doesn't exist";
          } elseif ( !$row['registration_confirmed']) {
            // user never confirmed registration
            $loginFailed = true;
            $errors[] = "User never confirmed registration";
          } elseif (password_verify($passPhrase, $row['pass_phrase'])) {

            // log user in and redirect to home page
            //  Set 'user-id' session variable to user_id returned by query.
            $_SESSION['user-id'] = $row['user_id'];

            if(!empty($_POST['remember-me'])) {
                // Set cookie for 30 days
                $interval = 30 * 24 * 60; // 30 days
                $token = generateToken();
                $qInsert = "INSERT INTO tokens
                (token, user_id, token_expires)
                VALUES ( '$token', ?, DATE_ADD(now(),
                            INTERVAL $interval MINUTE) )";

                try {
                    $stmtInsert = $db->prepare($qInsert);

                    if ($stmtInsert->execute( [$_SESSION['user-id']] )) {
                    $expiration = time() + 60 * $interval;
                    if (!setcookie('token', $token, $expiration)) {
                        // Could not set cookie on browser. Fail silently.
                        logError("Could not set cookie for $username.");
                        $errors[]= 'Could not set cookie';
                    }
                    } else {
                    // Likely SQL error. Log and redirect to error page.
                    logError($stmtInsert->errorinfo()[2], true);
                    $errors[]= 'Likely SQL error.';
                    }
                } catch (PDOException $e) {
                    // Could not insert cookie token. Fail silently.
                    logError($e); 
                    $errors[]= 'Could not insert cookie token. Fail silently.';
                }
            }
            
          } else {
            //bad password
            $loginFailed = true;
            $errors[]= 'Password did not verify';
            
         }
        } catch (PDOException $e) {
          logError($e);
          $loginFailed = true;
          $errors[]= 'Login failed';
        }
      }
          // Respond with success message or errors
        if (empty($errors)) {
            $message = "Login successful";
            echo json_encode(["success" => "done", "message" => $message, "session_id" =>  session_id(), "session"=>$_SESSION['user-id']] );
        } else {
            echo json_encode($errors);
        }
    }


?>