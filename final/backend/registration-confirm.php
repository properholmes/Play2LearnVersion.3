<?php
// Start output buffering
ob_start();
require_once 'users.php';
  if (!isset($_GET['token'])) {

    // How did you get here?
    // header("Location: login.php");
  }

  $pageTitle = 'You have successfully registered!';
 require 'header.php';
//   logout(); // In case a different user has logged in

  $token = $_GET['token'];
?>

<?php
  $qUpdate = "UPDATE users
  SET registration_confirmed = 1
  WHERE user_id = (SELECT user_id
    FROM tokens
    WHERE token = ?
    AND token_expires > now() );";

  try {
    $stmtUpdate = $db->prepare($qUpdate);
  
    if (!$stmtUpdate->execute( [$token] )) {
      // Query failed to execute
      logError($stmtUpdate->errorInfo()[2], true);
    } elseif ($stmtUpdate->rowCount()) {
      // Redirect user to login page
      header("Location: http://localhost:5173/login?just_registered=1");
    } // Else no rows were updated. Continue to error message.
  } catch (PDOException $e) {
    logError($e);
  }
// flush the buffered output 
ob_end_flush();
?>
<!-- Won't get here unless something went wrong -->
<main class="narrow">
  <h1><?= $pageTitle ?></h1>
</main>
