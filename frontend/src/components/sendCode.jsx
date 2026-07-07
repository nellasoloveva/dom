import { useState, useEffect } from 'react';

export default function SendCode(props) {

    const [code] = useState(() =>
            Math.floor(1000 + Math.random() * 9000)
    );
        

        useEffect(() => {
            console.log(code)
            fetch('http://localhost:8060/sendCode.php', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    body: `user=${encodeURIComponent(props.user)}&code=${encodeURIComponent(code)}`
                                        })
              .then(response => response.json())
              .then(data => {
                console.log(data)
              })
              .catch(error => console.error('Ошибка:', error));

              if (props.onCodeGenerated) {
                props.onCodeGenerated(code);
                }
            }, []);

    return null;        
}