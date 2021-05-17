<?php include 'db.php';

    $result = $db->query('
        SELECT q.id question_id, q.text question_text, c.id choice_id, c.text choice_text, c.value choice_value
        FROM question q
        JOIN choice c
        ON q.id = c.question_id
    ');

    
    $map = [];
    $response = [];
    
    
    while ($row = $result->fetch()) {        

        if(!array_key_exists($row['question_id'], $map)){
            
            $map[$row['question_id']] = array(
                    'id' => $row['question_id'],
                    'text' => $row['question_text'],
                    'choices' => array(
                                
                            )
            );
            array_push($map[$row['question_id']]['choices'], array(
                'id' => $row['choice_id'],
                'text' => $row['choice_text'],
                'value' => $row['choice_value']
            ));
            
            
        } else {
            array_push($map[$row['question_id']]['choices'], array(
                'id' => $row['choice_id'],
                'text' => $row['choice_text'],
                'value' => $row['choice_value']
            ));
        }        
    }
    for ($i=1; $i <= count($map); $i++) { 
        array_push($response, $map[$i]);
    }

    print json_encode($response);
    

?>