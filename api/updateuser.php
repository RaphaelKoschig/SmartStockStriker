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
$mail = $_POST['mail'];
$password = $_POST['password'];
$request = $connexion->prepare("UPDATE user SET user_password = :user_password WHERE user_mail = :user_mail");
$bindings = array(
    ':user_mail' => $mail, ':user_password' => $password
);
$request->execute($bindings);





echo json_encode($retour["success"]);

?>