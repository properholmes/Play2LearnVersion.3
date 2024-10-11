<?php
header("Access-Control-Allow-Origin:* "); // CORS: allow requests from any origin
header("Access-Control-Allow-Headers:* "); // CORS: allow any headers in requests
header("Access-Control-Allow-Methods:* "); // CORS: allow any HTTP methods <<< All CORS, so react & php play nice together
// ini_set('display_errors', 1); // uncomment to display errors for debugging
require_once 'utilities.php'; // include utility functions
require_once 'mail-config.php'; // include mail config settings

$method = $_SERVER['REQUEST_METHOD']; // Get the request method (GET, POST, PUT, DELETE)

$dsn = 'mysql:host=localhost;dbname=play2learn'; // Data Source Name for the database connection
$username = 'root'; // db username & pw
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password); // create new PDO instance to connect to the database

if ($method === 'POST') { // check if the request method is POST
    // prep INSERT query and pass data directly to execute()
    $form_data = json_decode(file_get_contents('php://input')); // get and decode the JSON input data

    // trim the data received from the form
    $first_name = trim($form_data->first_name ?? '');
    $last_name = trim($form_data->last_name ?? '');
    $username = trim($form_data->username ?? '');
    $email = trim($form_data->email ?? '');

    // Create an empty array for error handling
    $errors = [];

    // validate first name, last, username, email & password
    if (!$first_name) {
        $errors[] = 'First name required.';
    }
    
    if (!$last_name) {
        $errors[] = 'Last name required.';
    }

    if (!$username) {
        $errors[] = 'Username required.';
    }

    if (!$email) {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is not valid';
    }

    if (!$form_data->pass_phrase) {
        $errors[] = 'Password is required.';
    } elseif (strlen($form_data->pass_phrase) < 8) {
        $errors[] = 'Password must be at least 8 characters.';
    } elseif ($form_data->pass_phrase !== $form_data->confirm_pass_phrase) {
        $errors[] = 'Passwords do not match.';
    }

    // Check for existing username
    $userCheck = "SELECT user_id FROM users WHERE username = ?"; // query to check if username exists

    try {
        $stmtUsername = $db->prepare($userCheck); // prepare the statement
        $stmtUsername->execute([$username]); // execute with the provided username

        if ($stmtUsername->fetch()) {
            $errors[] = 'That username is already taken. Please try a different one.'; // error if username is taken
        }

    } catch (PDOException $e) {
        logError($e); // log any database errors
        $errors[] = 'Oops! Our bad. We cannot register you right now.';
    }

    // check for existing email
    $emailCheck =  "SELECT user_id FROM users WHERE email = ?"; // query to check if email exists
    try {
        $stmtEmail = $db->prepare($emailCheck); // prepare the statement
        $stmtEmail->execute([$email]); // execute with provided email

        if ($stmtEmail->fetch()) {
            $errors[] = 'We recognize that email.'; // error if email already registered
        }
    } catch (PDOException $e) {
        logError($e); // log any database errors
        $errors[] = 'Oops! Our bad. We cannot register you right now.';
    }

    // if no errors, proceed to insert the user
    if (empty($errors)) {
        $hashedPhrase = password_hash($form_data->pass_phrase, PASSWORD_DEFAULT); // hash the password
        $token = generateToken(); // generate a token for confirmation

        $qInserts = "INSERT INTO users
            (first_name, last_name, email, username, pass_phrase)
            VALUES (:first_name, :last_name, :email,
                :username, '$hashedPhrase');
                
            INSERT INTO tokens
            (token, user_id, token_expires)
            VALUES (:token, LAST_INSERT_ID(), 
                DATE_ADD(now(), INTERVAL 1 HOUR));"; // insert user and token in the database

        try {
            $stmtInserts = $db->prepare($qInserts); // prepare the insertion statement
            // bind parameters for the INSERT query
            $stmtInserts->bindParam(':first_name', $first_name);
            $stmtInserts->bindParam(':last_name', $last_name);
            $stmtInserts->bindParam(':email', $email);
            $stmtInserts->bindParam(':username', $username);
            $stmtInserts->bindParam(':token', $token);

            // execute the insertion *tricky!*
            if (!$stmtInserts->execute()) {
                logError($stmtInserts->errorInfo()[2]); // log any errors during execution
                $errors[] = 'Registration failed. Please try again.';
            }
        } catch (PDOException $e) {
            logError($e); // log any database errors
            $errors[] = 'Registration failed. Please try again.';
        }

    }

    // if registration successful, send confirmation email
    if (!$errors) { // check if there are still no errors
        $qs = http_build_query(['token' => $token]); // prepare query string with the token
        $pathToConfirm = getFullPath('registration-confirm.php'); // get the full path for the confirmation page
        $href = $pathToConfirm . '?' . $qs; // build the confirmation link

        $to = $email; // email recipient
        $toName = $first_name . ' ' . $last_name;
        $subject = 'Confirm Registration';

        // HTML content
        $html = "<p>Someone registered you for Play2Learn.com. If it wasn't you, you can ignore this email. If it was,
        <a href='$href'>click here</a> to confirm.</p>";

        // Plain text content
        $text = "Someone registered you for Play2Learn.com. If it wasn't you, you can ignore this email. If it was,
        visit $href to confirm.";

        try {
            // create the mailer instance
            $mail = createMailer(); // pass in true to createMailer() to enable debugMode
            $mail->addAddress($to, $toName); // add recipient
            $mail->addBcc('manavg2018@gmail.com', 'Admin'); // BCC for admin
            $mail->Subject = $subject; // Set the subject, body, text..
            $mail->Body = $html;
            $mail->AltBody = $text;

            $mail->send();
        } catch (Exception $e) {
            $errors[] = "We are sorry. We could not register you at this time."; // error if sending fails
            logError($e); // log errors
        }

        if (!$registrationMailSent = $mail->send()) { // check if the registration email was sent
            $errors[] = "We are sorry. We could not register you at this time.";
            logError($e);
        }
    }

    // respond with success message or errors
    if (empty($errors)) {
        $message = "Successfully registered! We have sent you an email with instructions. Please check your email.";
        echo json_encode(["success" => "done", "message" => $message]); // return success response as JSON
    } else {
        echo json_encode($errors);
    }
}

if ($method === 'PUT') { // check if the request method is PUT
    // prepare UPDATE query and pass data directly to execute()
    $form_data = json_decode(file_get_contents('php://input')); // get and decode the JSON input data
    $query = "UPDATE users SET first_name = ?, last_name = ?, username = ?, is_admin = ?, email = ?, pass_phrase = ? WHERE user_id = ?"; // create the $query
    $stmt = $db->prepare($query); // prepare the statement
    $stmt->execute([$form_data->first_name, $form_data->last_name, $form_data->username, $form_data->is_admin, $form_data->email, $form_data->pass_phrase, $_GET['id']]); // execute with the provided data

    echo json_encode(["success" => "done"]);
}

if ($method === 'DELETE') { // check if the request method is DELETE
    // Delete User Data
    $query = "DELETE FROM users WHERE user_id = ?";
    $statement = $db->prepare($query);
    $statement->execute([$_GET['id']]); // execute the deletion with the user ID from the URL

    echo json_encode(["success" => "done"]);
}
?>