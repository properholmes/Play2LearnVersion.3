<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");
// ini_set('display_errors', 1);

require_once 'utilities.php';
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

$dsn = 'mysql:host=localhost;dbname=play2learn';
$username = 'root';
$password = 'pwdpwd';

$db = new PDO($dsn, $username, $password);
$currentUserId = $_SESSION['user-id'] ?? 0; // get current user ID from session
if ($method === 'GET') {
    // if the request method is GET
    if (!$currentUserId && isset($_COOKIE['token'])) {  // check if no user ID in session, and a token cookie exists
        
        $qSelect = "SELECT user_id 
          FROM tokens 
          WHERE token = ? AND token_expires > now()"; // sql query to check token validity

        try {
            $stmt = $db->prepare($qSelect);
            $stmt->execute([$_COOKIE['token']]);

            if ($row = $stmt->fetch()) {
                // Found unexpired matching token     
                $currentUserId = $row['user_id'];
                $_SESSION['user-id'] = $currentUserId;
            }
        } catch (PDOException $e) {
            logError($e);
        }
    }
    // return the user ID and session ID as a JSON response
    echo json_encode(["userID" =>  $currentUserId, "session_id" =>  session_id()]);
}

?>