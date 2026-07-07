<?php
    header("Access-Control-Allow-Origin: *"); // Разрешает все источники
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $idProduct = $_POST['product_id'];
    $user = $_POST['user'];
    $newSize = $_POST['newSize'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $connect = mysqli_connect('db', 'root', 'rootpassword', 'account');

    // Получаем ID пользователя
        $userRes = mysqli_query($connect, "SELECT id FROM penis WHERE login = '$user'");
        $userRow = mysqli_fetch_assoc($userRes);
        $userId = $userRow['id'];

        
    

    $isFind = mysqli_query($connect, "SELECT 1 FROM favorites WHERE user_id = '$userId' AND product_id = '$idProduct'");
    if (mysqli_num_rows($isFind) != 0) {
        mysqli_query($connect, "UPDATE `favorites` SET `sizeProduct` = '$newSize' WHERE user_id = '$userId' AND product_id = '$idProduct'");
        echo 'ok';
    } 


}
else{
        echo "Не POST-запрос";
    }

    echo "POST данные: ";
    print_r($_POST);
?>