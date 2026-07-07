<?php
    // Разрешаем запросы с фронтенда (CORS)
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json; charset=utf-8");

    
    
    // Подключаемся к базе данных
    $connect = mysqli_connect('db', 'root', 'rootpassword', 'account');

    if (!$connect) {
        echo json_encode(["error" => "Ошибка подключения к БД: " . mysqli_connect_error()]);
        exit;
    }
    $user = $_POST['user'];
    // 📘 Объединяем таблицы favorites и products
    // Берём sizeProduct из favorites
    // И всю информацию о товаре из products
    $sql = "
        SELECT 
            basket.sizeProduct,
            basket.count,         
            products.id AS product_id,     
            products.imageBack,              
            products.name,               
            products.price,
            products.checked             
        FROM basket
        JOIN penis ON basket.user_id = penis.id
        JOIN products ON basket.product_id = products.id
        WHERE penis.login = ?
    ";

    $stmt = $connect->prepare($sql);
    $stmt->bind_param("s", $user);
    $stmt->execute();

    $result = $stmt->get_result();
    $basket = [];

    while ($row = $result->fetch_assoc()) {
        $basket[] = $row;
    }

    echo json_encode($basket, JSON_UNESCAPED_UNICODE);

    $connect->close();
?>
