import Header from "./header";
import Img from "./img";
import { useState, useEffect, useRef } from 'react';
import SendCode from "./sendCode";


export default function ConfirmEmail( {props, length = 4, onComplete }) {
    const user = localStorage.getItem('user');

    function goHome() {
        props.navigate("home");
    }

    const validateEmail = (email) => { // ф-я проверки емейла
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
    

    
        const [time, setTime] = useState(60);
        const [disabled, setDisabled] = useState(true);
        const [lastCode, setLastCode] = useState(null);
        const [error, setError] = useState(""); 
        const [code, setCode] = useState(""); 
        const [changeEmailInput, setChangeEmailInput] = useState("none"); 
        const [changeEmailValue, setChangeEmailValue] = useState(""); 
        const [changeTxt, setChangeTxt] = useState("Сменить адрес почты"); 
        const [isEmail, setIsEmail] = useState(false);





        const handleCodeGenerated = (code) => {
            setLastCode(code); // сохраняем код в родительском состоянии
        };
        

        useEffect(() => {
            if (time === 0) {
                setDisabled(false);
                return
            };
            const interval = setInterval(() => {
                setTime(prev => prev - 1);
            }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    
    const handleSendCode = () => {
        const newCode = Math.floor(1000 + Math.random() * 9000);
        setLastCode(newCode)
        // если хочешь хранить код в состоянии
        console.log("Сгенерирован код:", lastCode);
        setTime(60);
        setDisabled(true);

        fetch("http://localhost:8060/sendCode.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `user=${encodeURIComponent(user)}&code=${encodeURIComponent(newCode)}`
        })
        .then((response) => response.json())
        .then((data) => console.log("Ответ сервера:", data))
        .catch((error) => console.error("Ошибка:", error));
    };

    const handleCheckCode = (e) => {
        e.preventDefault();

        if(code == '' ){
            setError("Вы ввели не все данные"); // не все данные - ошибка
        }
        else if(code != lastCode){
            setError("not match")
        }
        else {
            window.location.href = "/";
            localStorage.setItem("location", "home")     
        }
    }

    
    const changeEmail = () => {
        
        
            
                    fetch("http://localhost:8060/deleteLogin.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `user=${encodeURIComponent(user)}`
                    })
                    .then((response) => response.json())
                    .then((data) => console.log("Ответ сервера:", data))
                    .catch((error) => console.error("Ошибка:", error));

                    window.location.href = "/";
          localStorage.setItem("location", "register")   
                    
        
        
        

    }

    // let codeArray = Array.from(lastCode, Number);
    
     // inputsRef — массив ссылок на все input'ы
    // useRef сохраняет значение между рендерами
    const inputsRef = useRef([]);

    // Функция вызывается при вводе символа в input
    // e — событие
    // index — индекс текущего input'а
    const handleChange = (e, index) => {

        // Берём введённое значение и убираем всё, кроме цифр
        // \D — всё, что НЕ цифра
        const value = e.target.value.replace(/\D/g, "");

        // Принудительно записываем обратно только цифру
        e.target.value = value;

        // Если цифра введена и это НЕ последний input
        if (value && index < length - 1) {

            // переводим фокус на следующий input
            inputsRef.current[index + 1].focus();
        }

        // Проверяем: заполнены ли ВСЕ input'ы
        if (inputsRef.current.every(input => input.value)) {

        // Собираем код из всех input'ов в одну строку
        const ccc = inputsRef.current
            .map(input => input.value)
            .join("")
        setCode(ccc)
        
        // Если передали onComplete — вызываем его и передаём код
        onComplete?.(code);
        }
    };

    // Функция обработки нажатия клавиш
    const handleKeyDown = (e, index) => {

        // Если нажали Backspace
        // и текущий input пустой
        // и это НЕ первый input
        if (e.key === "Backspace" && !e.target.value && index > 0) {

        // переводим фокус на предыдущий input
        inputsRef.current[index - 1].focus();
        }
    };



    return (
        <>
        <Header />
        <div className="auto">
<form className="autoDiv">
            <div>
                <SendCode user={user} onCodeGenerated={handleCodeGenerated}/>
            </div>
            <div className="autoTxt">Подтверждение почты</div>
            <div className="vam">Вам на почту было отправлено письмо с проверочным кодом.</div>
            <div className="enterCodeDiv">
                <div className="otp-wrapper">
      
                {/* Создаём массив длиной length и рендерим input для каждой цифры */}
                {Array.from({ length }).map((_, i) => (
                <input
                    className="pinInput"
                    key={i}                 // уникальный ключ для React
                    type="text"             // обычный текстовый input
                    inputMode="numeric"     // на мобильных открывает цифровую клавиатуру
                    maxLength={1}           // можно ввести только ОДНУ цифру
                    

                    // сохраняем ссылку на input в массиве inputsRef
                    ref={el => (inputsRef.current[i] = el)}

                    // при вводе вызываем handleChange
                    onChange={e => handleChange(e, i)}

                    // при нажатии клавиш — handleKeyDown
                    onKeyDown={e => handleKeyDown(e, i)}
                />
                ))}
            </div>
            </div>
            
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="resendBtn" 
                    disabled={disabled}
                    onClick={handleSendCode}>{disabled ? `Отправить код повторно( ${time.toString().padStart(2, "0")}c )` : "Отправить код снова"}
            </div>
            <button className="confirmBtn" onClick={handleCheckCode}  >Подтвердить</button>
            
        
        </form></div>
        <div className="ch"><div className="changeEmailBtn" onClick={changeEmail}>{changeTxt}</div></div>
        </>
    )

}