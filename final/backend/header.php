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
$currentUserId = $_SESSION['user-id'] ?? 0;
if ($method === 'GET') {
    

    if (!$currentUserId && isset($_COOKIE['token'])) {
        // Check for the token cookie
        $qSelect = "SELECT user_id 
          FROM tokens 
          WHERE token = ? AND token_expires > now()";

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

    echo json_encode(["userID" =>  $currentUserId, "session_id" =>  session_id()]);
}

?>