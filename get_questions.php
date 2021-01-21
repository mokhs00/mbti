<?php include 'db.php';



    $result = $db->query('SELECT * FROM question');
    

    $response = [];
    
    while ($row = $result->fetch()) {
        array_push($response, array(
             'id'=> $row['id'],
             'text'=> $row['text'],
             )
        );
    }

    print json_encode($response);

?>