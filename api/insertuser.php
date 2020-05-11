<?php

header('Content-Type: application/json');

$retour = [];

try {
    $connexion = new PDO('mysql:host=db5000303592.hosting-data.io;dbname=dbs296581','dbu526227','raph1188SSSDB!:;,');
    $retour["success"] = true;
}
catch(Exception $ex) {
    $retour["success"] = false;
}

$name = $_POST['name'];
$mail = $_POST['mail'];
$password = $_POST['password'];
$request = $connexion->prepare("SELECT * FROM user");
$request->execute();

$response = $request->fetchAll(PDO::FETCH_ASSOC);
$mailExists = false;
for ($i=0; $i<sizeof($response); $i++){
    if($response[$i]['user_mail'] == $mail){
        $mailExists = true;
        $retour["registration"] = false;
    }
}
if($mailExists == false){
    $request = $connexion->prepare("INSERT INTO user (user_name, user_mail, user_password) VALUES (:user_name, :user_mail, :user_password)");
    $bindings = array(
        ':user_name' => $name, ':user_mail' => $mail, ':user_password' => $password
    );
    $request->execute($bindings);
    $retour["registration"] = true;
}






echo json_encode($retour);

?>