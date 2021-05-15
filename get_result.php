<?php include 'db.php';
                    
    $query = 'SELECT * FROM result';

    $stmt = $db->query($query);

    $response = [];

    while ($row = $stmt->fetch()) {
        $response[$row['value']] = array(
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
