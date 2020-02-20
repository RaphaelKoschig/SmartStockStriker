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

$name = $_POST['name'];
$mail = $_POST['mail'];
$password = $_POST['password'];
$request = $connexion->prepare("SELECT * FROM users");
$request->execute();

$retour = $request->fetchAll(PDO::FETCH_ASSOC);
$isgood = false;
for ($i=0; $i<sizeof($retour); $i++){
    if($retour[$i]['pseudo'] == $mail){
        $isgood = true;
    }
}
if($isgood == false){
    $request = $connexion->prepare("insert into users (name, pseudo, password) values (:name, :pseudo, :password)");
    $bindings = array(
        ':name' => $name, ':pseudo' => $mail, ':password' => $password
    );
    $request->execute($bindings);
    echo json_encode(true);
}






echo json_encode($retour["success"]);

?>