<?php
// ini_set('display_errors', 1);
require_once 'utilities.php';
require_once 'mail-config.php';

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

        $userCheck = "SELECT user_id
                    FROM users
                    WHERE username = ?";

        try {
            $stmtUsername = $db->prepare($userCheck);
            $stmtUsername->execute([$username]);

            if ($stmtUsername->fetch()) {
                $errors[] = 'That username is already taken. Please try a different one.';
              }

        } catch(PDOException $e) {
            logError($e);
            $errors[] = 'Oops! Our bad. We cannot register you right now.';
          }

       $emailCheck =  "SELECT user_id
                    FROM users
                    WHERE email = ?";
        try {
            $stmtEmail = $db->prepare($emailCheck);
            $stmtEmail->execute([ $email ]); 
          
            if ($stmtEmail->fetch()) {
              $errors[] = 'We recognize that email.';
            }
          } catch (PDOException $e) {
            logError($e);
            $errors[] = 'Oops! Our bad. We cannot register you right now.';
          }
                
         
          
          if (empty($errors)) {
            // Insert user
            $hashedPhrase = password_hash($form_data->pass_phrase, PASSWORD_DEFAULT);
            $token = generateToken();
    
            $qInserts = "INSERT INTO users
                (first_name, last_name, email, username, pass_phrase)
                VALUES (:first_name, :last_name, :email,
                    :username, '$hashedPhrase');
                    
                INSERT INTO tokens
                (token, user_id, token_expires)
                VALUES (:token, LAST_INSERT_ID(), 
                    DATE_ADD(now(), INTERVAL 1 HOUR));";
    
            try {
                $stmtInserts = $db->prepare($qInserts);
                $stmtInserts->bindParam(':first_name', $first_name);
                $stmtInserts->bindParam(':last_name', $last_name);
                $stmtInserts->bindParam(':email', $email);
                $stmtInserts->bindParam(':username', $username);
                $stmtInserts->bindParam(':token', $token);
    
                if (!$stmtInserts->execute()) {
                    logError($stmtInserts->errorInfo()[2]);
                    $errors[] = 'Registration failed. Please try again.';
                }
            } catch (PDOException $e) {
                logError($e);
                $errors[] = 'Registration failed. Please try again.';
            }

        }


        if (!$errors) { // If there are still no errors
            // Send confirmation email
            $qs = http_build_query(['token' => $token]);
            $pathToConfirm = getFullPath('registration-confirm.php');
            $href = $pathToConfirm . '?' . $qs;
    
            $to = $email;
            $toName = $first_name . ' ' . $last_name;
            $subject = 'Confirm Registration';
    
            $html = "<p>Someone registered you for Play2Learn.com. If it
              wasn't you, you can ignore this email. If it was,
            <a href='$href'>click here</a> to confirm.</p>";
    
            $text = "Someone registered you for phppoetry.com. If it
              wasn't you, you can ignore this email. If it was,
              visit $href to confirm.";
    
            try {
              // Pass in true to createMailer() to enable debugMode
              $mail = createMailer();
              $mail->addAddress($to, $toName);
              $mail->addBcc('lvartani26@gmail.com');
              $mail->Subject = $subject;
              $mail->Body = $html;
              $mail->AltBody = $text;
          
              $mail->send();
            } catch (Exception $e) {
                $errors[] = "We are sorry. We could not register you at this time.";
              logError($e);
            }
    
            if (!$registrationMailSent = $mail->send()) {
                $errors[] = "We are sorry. We could not register you at this time.";
            }
          }

          // Respond with success message or errors
        if (empty($errors)) {
            $message = "Successfully registered! We have sent you an email with instructions. Please check your email.";
            echo json_encode(["success" => "done", "message" => $message]);
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