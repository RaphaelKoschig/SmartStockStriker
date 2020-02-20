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

$mail = $_POST['mail'];
$password = $_POST['password'];
$request = $connexion->prepare("SELECT * FROM users WHERE pseudo = :pseudo AND password = :password");
$bindings = array(
    ':pseudo' => $mail, ':password' => $password
);
$request->execute($bindings);

$retour = $request->fetch(PDO::FETCH_ASSOC);



echo json_encode($retour);

?>