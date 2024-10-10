    <?php
    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers:* ");
    header("Access-Control-Allow-Methods:* ");
    // ini_set('display_errors', 1);
    require_once 'utilities.php';



    $method = $_SERVER['REQUEST_METHOD'];

    $dsn = 'mysql:host=localhost;dbname=play2learn';
    $username = 'root';
    $password = 'pwdpwd';

    $db = new PDO($dsn, $username, $password);

    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            // Fetch single user data using prepared statement
            $query = "SELECT mfs.*, u.username, ahs.*
            FROM math_facts_scores mfs
            JOIN users u ON mfs.user_id = u.user_id
            JOIN anagram_hunt_scores ahs ON mfs.user_id = ahs.user_id; WHERE user_id = ?";
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

            // Fetch all scores using prepared statement
            $query = "SELECT mfs.*, u.username
            FROM math_facts_scores mfs
            JOIN users u ON mfs.user_id = u.user_id;";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $result  = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        }
    }


    if ($method === 'POST') {
        // start with anagram game scores
        $data = json_decode(file_get_contents('php://input'));
    
        $math_user_id = (int)$data -> math_user_id;

       
    $math_user_id = (int)$data -> math_user_id;

    if ($math_user_id > 0 && $data->math_score > 0) {

    // Prepare INSERT query for math_fact_scores
    $qInsertsMathFact = "INSERT INTO math_facts_scores
    (user_id, score, max_number, operation)
    VALUES (:user_id, :score, :max_number, :operation);";
    
try {
   
    // Calculate the maximum score separately
    $maxScore = $db->query("SELECT COALESCE(MAX(score), 0) FROM math_facts_scores")->fetchColumn();


    $stmtInsertsMathFact = $db->prepare($qInsertsMathFact);
    $stmtInsertsMathFact->bindParam(':user_id', $math_user_id);
    $stmtInsertsMathFact->bindParam(':score', $data->math_score);
    $stmtInsertsMathFact->bindParam(':max_number', $maxScore);
    $stmtInsertsMathFact->bindParam(':operation', $data->math_operation);

    if (!$stmtInsertsMathFact->execute()) {
        logError($stmtInsertsMathFact->errorInfo()[2]);
        $errors[] = 'Failed to log math fact score. Please try again.';
    }
} catch (PDOException $e) {
    logError($e);
    $errors[] = 'Failed to log math fact score. Please try again.';
}
    }
    else {
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
