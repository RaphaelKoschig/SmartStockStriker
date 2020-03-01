<?php

header('Content-Type: application/json');

try {
    $connexion = new PDO('mysql:host=db5000303592.hosting-data.io;dbname=dbs296581','dbu526227','raph1188SSSDB!:;,');
    $retour["success"] = true;
}
catch(Exception $ex) {
    $retour["success"] = false;
}

$number = $_POST['number'];
$price = $_POST['price'];
$totalPrice = $_POST['totalprice'];
$symbol = $_POST['symbol'];
$user_id = $_POST['id'];

$request = $connexion->prepare("SELECT user_cash FROM user WHERE user_id = :user_id;");
$bindings = array(
    ':user_id' => $user_id
);
$request->execute($bindings);
$response_cash = $request->fetchAll(PDO::FETCH_ASSOC);
$user_cash = $response_cash[0]['user_cash'];

if ($user_cash >= $totalPrice)
{
    $user_cash -= $totalPrice;
    $request = $connexion->prepare("UPDATE user SET user_cash = :user_cash WHERE user_id = :user_id;");
    $bindings = array(
        ':user_cash' => $user_cash,
        ':user_id' => $user_id
    );
    $request->execute($bindings);
    $request2 = $connexion->prepare("INSERT INTO 
    transaction (user_id, trans_symbol, trans_soloprice, trans_shares, trans_price) 
    VALUES (:user_id, :trans_symbol, :trans_soloprice, :trans_shares, :trans_price);");
        $bindings = array(
            ':user_id' => $user_id,
            ':trans_symbol' => $symbol,
            ':trans_soloprice' => $price,
            ':trans_shares' => $number,
            ':trans_price' => $totalPrice,
        );
    $request2->execute($bindings);
    $retour["buy_success"] = true;
}
else{
    $retour["buy_success"] = false;
}

echo json_encode($retour);
?>