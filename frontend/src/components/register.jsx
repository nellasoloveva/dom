import Header from "./header"
import Img from "./img";
import logo from '../../vitas_ishodniki/autorize/login_icon.png'
import pass from '../../vitas_ishodniki/autorize/Password.png'
import email from '../../vitas_ishodniki/autorize/Email.png'
import pass2 from '../../vitas_ishodniki/autorize/Password-2.png'
import { useEffect, useState } from "react";



export default function Register(props) {

    const [username, setUsername] = useState(""); // ввод логина
    const [passs, setPass] = useState("");
    const [emaill, setEmail] = useState(""); // ввод логина
    const [passs2, setPass2] = useState("");
    const [error, setError] = useState(""); 

    function goToAutorize() { // функция для кнопки обратно(потом переделать)
    props.navigate("autorize");
    }

     function goHome() { // функция для кнопки обратно(потом переделать)
    props.navigate("home");
    }

    function checkPasswords(password) {
    
    var s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
    var b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
    var digits = "0123456789"; // Цифры
    var specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
    var is_s = false; // Есть ли в пароле буквы в нижнем регистре
    var is_b = false; // Есть ли в пароле буквы в верхнем регистре
    var is_d = false; // Есть ли в пароле цифры
    var is_sp = false; // Есть ли в пароле спецсимволы
    for (var i = 0; i < password.length; i++) {
      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
      if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
      else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
      else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
      else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
    }
    var rating = 0;
    var text = "";
    if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
    if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
    if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
    if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
    /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
    if (password.length < 6 && rating < 3) text = 0;
    else if (password.length < 6 && rating >= 3) text = 1;
    else if (password.length >= 8 && rating < 3) text = 1;
    else if (password.length >= 8 && rating >= 3) text = 1;
    else if (password.length >= 6 && rating == 1) text = 0;
    else if (password.length >= 6 && rating > 1 && rating < 4) text = 1;
    else if (password.length >= 6 && rating == 4) text = 1;
    return text; // Форму не отправляем
  }

    const validateEmail = (email) => { // ф-я проверки емейла
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

    const validateLogin = (login) => { // ф-я проверки емейла
    const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return regex.test(login);
    }
 



    const handleSubmit = (e) => { // ф-я обработки формы
        checkPasswords(passs)
    console.log(999); // не хочу удалять
    e.preventDefault(); // отменяем перезагрузку формы

    if(username == '' || emaill == ''|| passs == "" || passs2 == ""){
        setError("Вы ввели не все данные"); // не все данные - ошибка
        setUsername('');
        setEmail('');
        setPass("") ;
        setPass2("");
    } else if(passs != passs2) {
        setError("Пароли не совпадают"); // не совпадают пароли - ошибка
        setPass("") ;
        setPass2(""); 
    } else if(!validateEmail(emaill)) {
        setError("Неверный формат почты!"); // неверный формат почты - ошибка
        setEmail('');
    }
    else if(!validateLogin(username) ) {
        setError("Логин должен начинаться с буквы и не длиннее 13 символов"); // неверный формат почты - ошибка
        setUsername('');
    }
    else if(checkPasswords(passs) == 0) {
        setError("Слишком простой пароль, используйте буквы верхнего регистра, цифры и спецсимволы"); // неверный формат почты - ошибка
        setPass("") ;
        setPass2(""); 
    }
    else { // все хорошо - отправляем данные в пхп
        fetch("http://localhost:8060/register.php", { // ссылка
        method: "POST",                       // отправляем POST
        headers: { "Content-Type": "application/json" }, 
        credentials: "include",               // сохраняем PHP-сессию (куки)
        body: JSON.stringify({ username, passs, emaill}) // передаём данные
    })
      .then(res => res.json())              // получаем JSON-ответ
      .then(data => {
        if (data.success) {                 // если вход успешный
          localStorage.setItem("user", data.username);
          localStorage.setItem("email", data.email); // // сохраняем в localStorage
          window.location.href = "/";
          localStorage.setItem("location", "confirm")     
          localStorage.setItem("isLogin", "true")  // перенаправляем на главную
        } else { // обработка ошибки (else из пхп)
          setUsername('');
        setEmail('');
        setPass("") ;
        setPass2(""); 
            setError(data.message); 
                    // если ошибка — показываем
        }
      });
    }

    
  };


    return(
        <div>
            <Header />
            <div className="auto">
            <form className="autoDiv">
                <div className="autoTxt">Регистрация</div>
                    <div className="loginDiv">
                        <div className="iconLoginDiv"><Img className='loginIcon' src={logo}></Img></div>
                        <div className="inputLoginDiv"><input 
                                                            className="inputLogin" 
                                                            type="text" 
                                                            placeholder="Логин" 
                                                            name="login"
                                                            onChange={(e) => setUsername(e.target.value)} 
                                                            value={username}>
                                                        </input>
                        </div>
                    </div>
                    <div className="loginDiv">
                        <div className="iconLoginDiv"><Img className='emailIcon' src={email}></Img></div>
                        <div className="inputLoginDiv"><input 
                                                            className="inputLogin" 
                                                            placeholder="E-mail" 
                                                            name="email" 
                                                            type="email" 
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={emaill}>
                                                        </input>
                        </div>
                    </div>
                    <div className="loginDiv">
                        <div className="iconLoginDiv"><Img className='loginIcon' src={pass}></Img></div>
                        <div className="inputLoginDiv"><input 
                                                            className="inputLogin" 
                                                            placeholder="Пароль" 
                                                            name="password" 
                                                            type="password"
                                                            onChange={(e) => setPass(e.target.value)}  
                                                            value={passs}>
                                                        </input>
                        </div>
                    </div>
                    <div className="loginDiv">
                        <div className="iconLoginDiv"><Img className='loginIcon' src={pass2}></Img></div>
                        <div className="inputLoginDiv"><input 
                                                            className="inputLogin" 
                                                            placeholder="Повторите пароль" 
                                                            name="password" 
                                                            type="password" 
                                                            onChange={(e) => setPass2(e.target.value)}
                                                            value={passs2}>
                                                        </input>
                        </div>
                    </div>
                        <div className="buttonDiv"><button type="submit" className="button" onClick={handleSubmit}>Зарегестрироваться</button></div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="reg" onClick={goToAutorize}>Вход</div>
            </form>
            </div>
        </div>
    )
}