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


if ($method === 'POST') {
    
    $data = json_decode(file_get_contents('php://input'));
   
    //create empty arrays for errors handle error validation
    
    $errors = [];

    $anagram_user_id = (int)$data -> anagram_user_id;

    if ($anagram_user_id > 0) {
            // Insert score into tracking
    $qInserts = "INSERT INTO anagram_hunt_scores
                (user_id, score, max_number, operation)
                VALUES (:user_id, :score, :max_number,
                    :operation)";  
                    
                     // Calculate the maximum score separately
    $maxScore = $db->query("SELECT COALESCE(MAX(score), 0) FROM anagram_hunt_scores")->fetchColumn();
    
            try {
                $stmtInserts = $db->prepare($qInserts);
                $stmtInserts->bindParam(':user_id', $anagram_user_id);
                $stmtInserts->bindParam(':score', $data -> anagram_score);
                $stmtInserts->bindParam(':max_number', $maxScore);
                $stmtInserts->bindParam(':operation', $data -> anagram_operation);
         
    
                if (!$stmtInserts->execute()) {
                    logError($stmtInserts->errorInfo()[2]);
                    $errors[] = 'Failed to log scores. Please try again.';
                }
            } catch (PDOException $e) {
                logError($e);
                $errors[] = 'Failed to log score. Please try again.';
            }


        } else {
            // Handle the case where user_id is 0 or null
            $errors[] = "Login to keep track of your scores! User ID cannot be 0 or null.";
       
        }
                // Respond with success message or errors
        if (empty($errors)) {
            $message = "Successfully tracked score! You are on the leaderboard";
            echo json_encode(["success" => "done", "message" => $message]);
        } else {
            echo json_encode($errors);
        }
    }