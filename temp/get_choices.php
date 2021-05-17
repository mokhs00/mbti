<?php include 'db.php';



    $result = $db->query('SELECT * FROM choice');
    

    $response = [];
    
    while ($row = $result->fetch()) {
        array_push($response, array(
             'question_id'=> $row['question_id'],
             'text'=> $row['text'],
             'value'=> $row['value'])
        );
    }

    print json_encode($response);

?>