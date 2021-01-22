<?php include 'db.php';
    $result = $db->query('SELECT COUNT(*) AS count FROM record');
    

    $response;
    
    while ($row = $result->fetch()) {
             $response = $row['count'];
        
    }

    print json_encode($response);

?>