<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$user = $_POST['user'];

$connect = mysqli_connect('db', 'root', 'rootpassword', 'account');
if (!$connect) {
    die(json_encode(['error' => 'Ошибка подключения к БД']));
}

$query = "DELETE FROM penis WHERE login = '$user'";
if (mysqli_query($connect, $query)) {
        echo json_encode(['success' => true, 'message' => 'Товар удалён из корзины']);
    } 

echo json_encode($user, JSON_UNESCAPED_UNICODE);

    $connect->close();
?>