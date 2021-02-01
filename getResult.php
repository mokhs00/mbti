<?php include 'db.php';

    $choiced = $_GET["choiced"];
    
    $choicedValues = str_split($choiced);
    $valuesCount = array_count_values($choicedValues);

    //==result 계산 로직==//

    $result = "";
    
    $values = array('E' => 0,
                    'I' => 0,
                    'S' => 0,
                    'N' => 0,
                    'T' => 0,
                    'F' => 0,
                    'J' => 0,
                    'P' => 0);
    

    foreach ($valuesCount as $key => $value) {
        $values[$key] = $value;
    }

    // E or I
    if ($values["E"] > $values["I"]) {
        $result .= "E";
    }

    if ($values["I"] > $values["E"]) {
        $result .= "I";
    }

    // S or N
    if ($values["S"] > $values["N"]) {
        $result .= "S";
    }

    if ($values["N"] > $values["S"]) {
        $result .= "N";
    }

    // T or F
    if ($values["T"] > $values["F"]) {
        $result .= "T";
    }

    if ($values["F"] > $values["T"]) {
        $result .= "F";
    }

    // J or P
    if ($values["J"] > $values["P"]) {
        $result .= "J";
    }

    if ($values["P"] > $values["J"]) {
        $result .= "P";
    }

    $response = $result;

    print json_encode($response);

?>
