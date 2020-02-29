<?php

header('Content-Type: application/json');

try {
    $connexion = new PDO('mysql:host=db5000303592.hosting-data.io;dbname=dbs296581','dbu526227','raph1188SSSDB!:;,');
    $retour["success"] = true;
}
catch(Exception $ex) {
    $retour["success"] = false;
}

$mail = $_POST['mail'];
$password = $_POST['password'];
$request = $connexion->prepare("SELECT * FROM user WHERE user_mail = :user_mail AND user_password = :user_password");
$bindings = array(
    ':user_mail' => $mail, ':user_password' => $password
);
$request->execute($bindings);

$retour = $request->fetch(PDO::FETCH_ASSOC);



echo json_encode($retour);

?>