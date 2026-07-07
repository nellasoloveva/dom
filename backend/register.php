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
// то выше я хз
    $data = json_decode(file_get_contents("php://input"), true); // получение фетча
    $loginMass = []; // массив для проверки логина
    $emailMass = []; // массив для проверки емейла

    $username = $data["username"] ?? ""; // добавление переменных из фетча
    $password = $data["passs"] ?? "";
    $emaill = $data["emaill"] ?? "";


    $connect = mysqli_connect('db', 'root', 'rootpassword', 'account');
    // коннект с бдшкой
    


    $q = mysqli_query($connect, "SELECT * FROM `penis`"); //получение таблиы с аккаунтами
    $q = mysqli_fetch_all($q);

    foreach ($q as $subArray) { // создание двух массивов со всеми емейлами и логинами
        array_push($loginMass, $subArray[1]);
        array_push($emailMass, $subArray[2]);
    }

    $indexLogin = array_search($username, $loginMass); // проверка есть ли логины из ввода
    $indexEmail = array_search($emaill, $emailMass); // в таблице
 
    if($indexLogin != "") { // если уже есть такой логин => ошибка
        echo json_encode(["success" => false, "message" => "Такой логин уже занят"]);
    } else if($indexEmail != "") { // если уже есть такая почта => ошибка
        echo json_encode(["success" => false, "message" => "Эта почта уже используется в другом аккаунте"]);
    } else { // если все хорошо => создание новой строчки в таблице и отправка данных обратно в реакт
        $mass = mysqli_query($connect, "INSERT INTO `penis` (`id`, `login`, `email`, `password`) VALUES (NULL, '$username', '$emaill', '$password')");
        $emailRes = mysqli_query($connect, "SELECT email FROM penis WHERE login = '$username'");
        $emailRow = mysqli_fetch_assoc($emailRes);
        $email = $emailRow['email'];
        $_SESSION["username"] = $username;
    
        echo json_encode(["success" => true, "username" => $username, "email" => $email]);
    }

    
   


?>