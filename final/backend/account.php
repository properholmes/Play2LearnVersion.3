<?php
session_start();
include 'db.php';

if (!isset($_SESSION['username'])) {
    echo "You must be logged in to view this page.";
    exit;
}

$username = $_SESSION['username'];

// Fetch user information
$sql = "SELECT username FROM users WHERE username = :username";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username]);
$user = $stmt->fetch();

// Handle user information update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_username = $_POST['new_username'];
    $sql = "UPDATE users SET username = :new_username WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['new_username' => $new_username, 'username' => $username]);

    // Update session variable
    $_SESSION['username'] = $new_username;
    echo "Account updated successfully!";
    $user['username'] = $new_username; // Update displayed username
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Account</title>
</head>
<body>
    <h1>My Account</h1>
    <p>Current Username: <?php echo htmlspecialchars($user['username']); ?></p>
    <form method="POST" action="">
        <label for="new_username">Change Username:</label>
        <input type="text" id="new_username" name="new_username" required>
        <button type="submit">Update</button>
    </form>
    <a href="logout.php">Logout</a> <!-- Add logout link -->
</body>
</html>