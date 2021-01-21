<?php include 'db.php';

                    
    $result = $_GET["result"];


    $query = 'SELECT * FROM result WHERE value = ? LIMIT 1';

    $stmt = $db->prepare($query);
    $stmt->execute(array($result));

    
    $response = [];

    while ($row = $stmt->fetch()) {
        $response = array(
             'id'=> $row['id'],
             'value'=> $row['value'],
             'title'=> $row['title'],
             'text'=> $row['text'],
             'img_path'=> $row['img_path'],
             'positive'=> $db->query("SELECT value, title, img_path FROM result WHERE id = ".$row['positive_id'])->fetch(PDO::FETCH_ASSOC),
             'negative'=> $db->query("SELECT value, title, img_path FROM result WHERE id = ".$row['negative_id'])->fetch(PDO::FETCH_ASSOC)
            );
    }




    print json_encode($response);

?>
