<?php 

header('Content-Type: text/html; charset=utf-8');


try{
    $db = new PDO('mysql:host=localhost;dbname=type_inspection','root','');
} catch (PDOException $e){
    print $e->getMessage();
}

?>