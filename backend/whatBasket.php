<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
// Подключение к БД
    $connect = mysqli_connect('db', 'root', 'rootpassword', 'account');
    if (!$connect) {
        echo json_encode(["error" => "Ошибка подключения к БД: " . mysqli_connect_error()]);
        exit;
    }

    $idProduct = $_POST['product_id'];
    $user = $_POST['user']; // имя пользователя (например, username или email)

// 1️⃣ Получаем user_id по имени пользователя
    $userRes = mysqli_query($connect, "SELECT id FROM penis WHERE login = '$user'");
    $userRow = mysqli_fetch_assoc($userRes);
    $userId = $userRow['id'];

     // Проверяем товар в корзине
    $isBasketQ = mysqli_query($connect, "SELECT sizeProduct FROM basket WHERE user_id = '$userId' AND product_id = '$idProduct'");

    if ($isBasketQ && mysqli_num_rows($isBasketQ) > 0) {
        $isBasketRow = mysqli_fetch_assoc($isBasketQ);
        $isBasket = $isBasketRow['sizeProduct']; // например "L"
    } else {
        $isBasket = 0; // если нет в корзине
    }

    echo json_encode(["is_basket" => $isBasket]);
    mysqli_close($connect);
    exit;

    

    
}

        


echo json_encode(["is_basket" => $isBasket]);

$connect->close();
?>