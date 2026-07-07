import Header from "./header"
import { useEffect, useState } from "react";
import Img from "./img";
import logo from '../../vitas_ishodniki/autorize/login_icon.png'
import pass from '../../vitas_ishodniki/autorize/Password.png'


export default function Autorize(props) {
  
    const [username, setUsername] = useState(""); // ввод логина
  const [password, setPassword] = useState(""); // ввод пароля
  const [error, setError] = useState("");       // сообщение об ошибке

  const handleSubmit = (e) => {
    console.log(999);
    e.preventDefault(); // отменяем перезагрузку формы

    fetch("http://localhost:8060/index.php", {
      method: "POST",                       // отправляем POST
      headers: { "Content-Type": "application/json" }, 
      credentials: "include",               // сохраняем PHP-сессию (куки)
      body: JSON.stringify({ username, password }) // передаём данные
    })
      .then(res => res.json())              // получаем JSON-ответ
      .then(data => {
        if (data.success) {      
               // если вход успешный
          localStorage.setItem("user", data.username);
          localStorage.setItem("email", data.email); // сохраняем в localStorage
          window.location.href = "/";
          localStorage.setItem("location", "home")     
          localStorage.setItem("isLogin", "true")  // перенаправляем на главную
        } else {
          setError(data.message); 
          setUsername("");
          setPassword("");          // если ошибка — показываем
        }
      })
      ;
  };



    function goHome() {
    props.navigate("home"); // вернуться на главную
  }

  function goReg() {
    props.navigate("register");
  }

  return(
    <div>
     <Header onClick={goHome}/>
        <div className="auto">
            <form className="autoDiv" onSubmit={handleSubmit}>
                <div className="autoTxt">Авторизация</div>
                <div className="loginDiv">
                    <div className="iconLoginDiv"><Img className='loginIcon' src={logo}></Img></div>
                    <div className="inputLoginDiv"><input className="inputLogin" type="text" placeholder="Логин" name="login" value={username} onChange={e => setUsername(e.target.value)}></input></div>
                </div>
                <div className="loginDiv">
                    <div className="iconLoginDiv"><Img className='loginIcon' src={pass}></Img></div>
                    <div className="inputLoginDiv"><input className="inputLogin" placeholder="Пароль" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} ></input></div>
                </div>
                <div className="buttonDiv"><button type="submit" className="button">Войти</button></div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="reg" onClick={goReg}>Регистрация</div>
            </form>
        </div>
        
    </div>
  )
  
}