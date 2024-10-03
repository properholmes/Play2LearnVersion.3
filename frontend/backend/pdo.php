<?php
  $dsn = 'mysql:host=localhost;dbname=play2learn';
  $username = 'root';
  $password = 'pwdpwd';
  $db = new PDO($dsn, $username, $password); 
//   $title = $_GET['title'];
  $query = 'SELECT first_name, last_name
    FROM users
    WHERE is_admin = ?';
  $stmt = $db->prepare($query);
  $stmt->execute([1]);
  
  $row = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= $row['title'] ?></title>
</head>
<body>
<main>
<?php if ($row) { ?>
  <h1><?= $row['first_name'] ?></h1>
  <h1><?= $row['last_name'] ?></h1>
<?php } else { ?>
  <h1>No Results</h1>
  <p>Sorry, we couldn't find anyone.</p>
<?php } ?>
</main>
</body>
</html>