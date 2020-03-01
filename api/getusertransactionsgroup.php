<?php

header('Content-Type: application/json');

/**
 * connexion à la base de données
 */
try {
    $connexion = new PDO('mysql:host=db5000303592.hosting-data.io;dbname=dbs296581', 'dbu526227', 'raph1188SSSDB!:;,');
    $retour["success"] = true;
} catch (Exception $ex) {
    $retour["success"] = false;
}

$user_id = $_POST['user_id'];
$request = $connexion->prepare("SELECT trans_symbol, 
                                SUM(trans_shares) AS totalshares 
                                FROM transaction WHERE user_id = :user_id GROUP BY trans_symbol;");
$bindings = array(
    ':user_id' => $user_id
);
$request->execute($bindings);

$retour = $request->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($retour);


?>