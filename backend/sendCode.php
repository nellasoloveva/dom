<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$user = $_POST['user'];
$code = $_POST['code'];

$connect = mysqli_connect('db', 'root', 'rootpassword', 'account');
if (!$connect) {
    die(json_encode(['error' => 'Ошибка подключения к БД']));
}
$userRes = mysqli_query($connect, "SELECT email FROM penis WHERE login = '$user'");
$userRow = mysqli_fetch_assoc($userRes);
$userEmail = $userRow['email'];

$to = $userEmail; // Адрес получателя
$subject = 'Тема письма'; // Тема
$message = $code; // Текст письма

// Отправка письма (заголовки не обязательны для простого текста)
mail($to, $subject, $message);

echo json_encode($code, JSON_UNESCAPED_UNICODE);

    $connect->close();
?>