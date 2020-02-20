<?php

header('Content-Type: application/json');

/**
 * connexion à la base de données
 */
try {
    $connexion = new PDO('mysql:host=db5000303592.hosting-data.io;dbname=dbs296581','dbu526227','raph1188SSSDB!:;,');
    $retour["success"] = true;
}
catch(Exception $ex) {
    $retour["success"] = false;
}

$request = $connexion->prepare("SELECT * FROM user");
$request->execute();

$retour = $request->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($retour);


?>