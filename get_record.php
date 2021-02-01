<?php include 'db.php';
    $result = $db->query('SELECT COUNT(*) AS count FROM record');
    

    $response;
    
    while ($row = $result->fetch()) {
             $response = (String)((int)$row['count']+253120);
        
    }

    print json_encode($response);

?>