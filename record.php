<?php include 'db.php';
    $resultId= $_POST["resultId"];
    $query = 'INSERT INTO record (result_id) VALUES(?)';
    $stmt = $db->prepare($query);
    $stmt->execute(array($resultId));
?>