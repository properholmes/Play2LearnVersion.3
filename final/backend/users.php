<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");
// ini_set('display_errors', 1);
require_once 'utilities.php';
require_once 'mail-config.php';



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

?>