<?php

header('Content-Type: application/json');

/**
 * connexion à la base de données
 */
try {
    $connexion = new PDO('mysql:host=db5000296647.hosting-data.io;dbname=dbs289874','dbu136770','JD90200jd*');
    $retour["success"] = true;
}
catch(Exception $ex) {
    $retour["success"] = false;
}

$request = $connexion->prepare("SELECT * FROM users");
$request->execute();

$retour = $request->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($retour);


?>