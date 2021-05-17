<?php include 'db.php';
    // session_start();

    // if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
    //     $uri = 'https://';
    // } else {
    //     $uri = 'http://';
    // }
    // $uri .= $_SERVER['HTTP_HOST'];
    // $uri .= "/mbti/";

    // var_dump($_SESSION);

    // //==referer검증==//
    // if (empty($_SERVER['HTTP_REFERER'])) {
    //     print "잘못된 접근입니다.";
    //     exit;
    // }

    // $refer = $_SERVER['HTTP_REFERER'];

    // if ($refer != $uri) {
    //     print "잘못된 접근입니다.";
    //     exit;
    // }
    // //==cookie검증==//

    // if (isset($_COOKIE["recorded"])) {
    //     print "잘못된 접근입니다.";
    //     print $_COOKIE["recorded"];
    //     exit;
    // }

    // if (empty($_COOKIE["recorded"])) {
    //     $_COOKIE["recorded"] = "true";
        
    // }

    $resultValue= $_POST["resultValue"];
    $query = 'INSERT INTO record (result_id) VALUES((SELECT id FROM result WHERE value = ?))';
    $stmt = $db->prepare($query);
    $stmt->execute(array($resultValue));



?>