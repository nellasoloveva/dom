<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// подключение к базе данных
$connect = mysqli_connect('db', 'root', 'rootpassword', 'account');
if (!$connect) {
    die(json_encode(['error' => 'Ошибка подключения к БД']));
}

$user = $_POST['user'] ?? '';
$product_id = $_POST['product_id'] ?? '';
$userRes = mysqli_query($connect, "SELECT id FROM penis WHERE login = '$user'");
$userRow = mysqli_fetch_assoc($userRes);
$userId = $userRow['id'];

if ($user && $product_id) {
    $query = "DELETE FROM favorites WHERE user_id = '$userId' AND product_id = '$product_id'";
    if (mysqli_query($connect, $query)) {
        echo json_encode(['success' => true, 'message' => 'Товар удалён из избранного']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при удалении']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Недостаточно данных']);
}
?>
