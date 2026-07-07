import Header from "./header";
import Img from "./img";
import { useState, useEffect } from 'react';
import xxx from '../../vitas_ishodniki/xxx.png'
import xxxx from '../../vitas_ishodniki/xxxx.png'
  const user = localStorage.getItem('user');




export default function Frame(props) {
    function goHome() {
    props.navigate("home");
    }

    const [fio, setFio] = useState(""); // ввод логина
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");

    const [dataPr, setDataPr] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8060/basketOut.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: `user=${encodeURIComponent(user)}`
                                    })
          .then(response => response.json())
          .then(data => {
            
            let basketProduct = data.map(item => ({ // добавление всеех продуктов в массив
              product_id: item.product_id,
              sizeProduct: item.sizeProduct,
              image: item.imageBack,
              name: item.name,
              price: item.price,
              count: item.count
            }));
            setDataPr(basketProduct);
            console.log(basketProduct);
          })
          .catch(error => console.error('Ошибка:', error));
        }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
          
    const visibleCount = 1;
          
    const itemWidth = 500;
          
    const maxIndex = Math.max(0, dataPr.length - visibleCount);
          
    const prevSlide = () => {
        setCurrentIndex((i) => Math.max(0, i - 1));
    };
          
    const nextSlide = () => {
        setCurrentIndex((i) => Math.min(maxIndex, i + 1));
    };
          
    return (
        <>                           
            <Header onClick={goHome} />
            <div className="shadowDiv"><Img className='shadow' src={xxx} ></Img></div>
            <div className="pole">
                <div className="ofo">Оформление заказа</div>
                <div className="loginDiv2">
                <div className="inputLoginDiv2"><input 
                                                            className="inputLogin2" 
                                                            placeholder="ФИО" 
                                                            name="email" 
                                                            type="email" 
                                                            onChange={(e) => setFio(e.target.value)}
                                                            value={fio}>
                                                        </input>
                </div>
                </div>
                <div className="loginDiv2">
                <div className="inputLoginDiv2"><input 
                                                            className="inputLogin2" 
                                                            placeholder="адресс" 
                                                            name="email" 
                                                            type="email" 
                                                            onChange={(e) => setAdress(e.target.value)}
                                                            value={adress}>
                                                        </input>
                </div>
                </div>
                <div className="loginDiv2">
                <div className="inputLoginDiv2"><input 
                                                            className="inputLogin2" 
                                                            placeholder="номер телефона" 
                                                            name="email" 
                                                            type="email" 
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            value={phone}>
                                                        </input>
                </div>
                </div>
                <div className="otdatDiv"><button className="otdat">Отдать деньгу</button></div>
            </div>
            <div className="carousel2">
            {/* "окно просмотра" фиксированной ширины */}
            <div
                className="carousel-viewport2"
                style={{ width: `${(2 * itemWidth) }px` }}
            >
            {/* лента со всеми картинками в ряд */}
            <div
                className="carousel-track2"
                style={{
                transform: `translateX(-${currentIndex * itemWidth}px)`,
                }}
            >
            {/* для каждой картинки создаём div через map */}
            {dataPr.map((img, index) => (
                <div className="carousel-item2"  key={img.product_id} id={index} onClick={() => {
                    if (index == currentIndex - 1) {
                        prevSlide()
                    } else if (index == currentIndex + 1) {
                        nextSlide()
                    }
                }}>
                    <div className="bagDiv"><Img className='bag' src={img.image} ></Img></div>
                    <div className="slName">{img.name}</div>
                    <div className="priceDiv">
                        <div className="qwe">cтоимость</div>
                        <div className="qwer">{img.price}</div>
                    </div>
                    <div className="priceDiv">
                        <div className="qwe">размер</div>
                        <div className="qwer">{img.sizeProduct}</div>
                    </div>
                    <div className="priceDiv">
                        <div className="qwe">количество</div>
                        <div className="qwer">{img.count}</div>
                    </div>
                </div>
                ))}
                </div>
            </div>
          
           
        </div>
        
        <div className="shadowDiv2"><Img className='shadow2' src={xxxx} ></Img></div>
      </>
      )
}