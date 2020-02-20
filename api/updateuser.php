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
$request = $connexion->prepare("update users set password = :password where pseudo = :pseudo");
$bindings = array(
    ':pseudo' => $mail, ':password' => $password
);
$request->execute($bindings);





echo json_encode($retour["success"]);

?>