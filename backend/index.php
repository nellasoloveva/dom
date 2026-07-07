<?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173"); // разрешаем React-домен
    header("Access-Control-Allow-Credentials: true");             // разрешаем передавать куки
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// если браузер шлёт preflight-запрос (OPTIONS), отвечаем и выходим
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit;
    }
  header("Content-Type: application/json");
  
  $isFind = true;
  $loginMass = [];
  $emailMass = [];
  $passwordMass = []; 

  $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"] ?? "";
    $password = $data["password"] ?? "";

  $connect = mysqli_connect('db', 'root', 'rootpassword', 'account');

  $mass = mysqli_query($connect, "SELECT * FROM `penis`");
  $mass = mysqli_fetch_all($mass);

    foreach ($mass as $subArray) {
        array_push($loginMass, $subArray[1]);
        array_push($emailMass, $subArray[2]);
        array_push($passwordMass, $subArray[3]);
    }

    $indexLogin = array_search($username, $loginMass);
    $indexPassword = array_search($password, $passwordMass);
 
    if($indexLogin == '' || $indexPassword == '') {
        $isFind = false;
    }

    if ($indexLogin == $indexPassword && $isFind == true) {
        $emailRes = mysqli_query($connect, "SELECT email FROM penis WHERE login = '$username'");
        $emailRow = mysqli_fetch_assoc($emailRes);
        $email = $emailRow['email'];
        $_SESSION["username"] = $username;
        echo json_encode(["success" => true, "username" => $username, "email" => $email]);
    } else {
        echo json_encode(["success" => false, "message" => "Неверный логин или пароль"]);
    }


?>