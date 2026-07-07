import { products } from "./products.js";
import Img from "./img.jsx";
import basket2 from '../../vitas_ishodniki/productInfo/basket.png'
import basket from '../../vitas_ishodniki/basket2.png'
import heart from '../../vitas_ishodniki/productInfo/heart.png'
import { useState, useEffect } from 'react';
import heartAfter from '../../vitas_ishodniki/Heart.png'

export default function Product(props) {
    const user = localStorage.getItem('user'); // текущий пользователь
    const id = props.productid; // id продукта из пропсов
    const productInfo = products.find(item => item.id == id); // поиск товара по id

    const [heartImg, setHeartImg] = useState(heart);
    const [basketImg, setBasketImg] = useState(basket);
    const [isLiked, setIsLiked] = useState(false);
    const [isBasket, setIsBasket] = useState(false); // есть ли товар в избранном
    const [active, setActive] = useState(null); // выбранный размер
    const [basketContent, setBasketContent] = useState();
    const [likeContent, setLikeContent] = useState(<></>);
    let sizeDiv = null;


    
    // 🧩 Проверка — есть ли товар в лайкнутых
    useEffect(() => {
        if (!user || !productInfo?.id) return;

        fetch('http://localhost:8060/whatLikes.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `product_id=${encodeURIComponent(productInfo.id)}&user=${encodeURIComponent(user)}`
        })
        .then(res => res.json())
        .then(data => {
            console.log("Ответ от like.php:", data);
            const sizeFromDB = data.is_favorite;
            if (data.is_favorite && data.is_favorite !== 0) {
                setHeartImg(heartAfter);
                setIsLiked(true);
                if (localStorage.getItem('location') == 'likes') {
                    const index = { 'S': 1, 'M': 2, 'L': 3 }[sizeFromDB];
                    setActive(index)
                }
            } else {
                setHeartImg(heart);
                setIsLiked(false);
            }
        })
        .catch(err => console.error("Ошибка при проверке лайка:", err));
    }, [productInfo?.id, user]);

    useEffect(() => {
        if (!user || !productInfo?.id) return;

        fetch('http://localhost:8060/whatBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `product_id=${encodeURIComponent(productInfo.id)}&user=${encodeURIComponent(user)}`
        })
        .then(res => res.json())
        .then(data => {
            console.log("Ответ от basket.php:", data);
            const sizeFromDB = data.is_basket;
            if (data.is_basket && data.is_basket !== 0) {
                setBasketImg(basket2);
                setIsBasket(true);
                if (localStorage.getItem('location') == 'basket') {
                    const index = { 'S': 1, 'M': 2, 'L': 3 }[sizeFromDB];
                    setActive(index)
                }
            } else {
                setBasketImg(basket);
                setIsBasket(false);
            }
        })
        .catch(err => console.error("Ошибка при проверке лайка:", err));
    }, [productInfo?.id, user]);

    // 🧩 Изменение размера
    function fech(lock, newSiz) {
        fetch(lock, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `newSize=${encodeURIComponent(newSiz)}&product_id=${encodeURIComponent(productInfo.id)}&user=${encodeURIComponent(user)}`
        })
        .then(response => response.text())
        .then(data => console.log("Ответ changeSize:", data))
        .catch(error => console.error('Ошибка:', error));
    }

    function changeSize(newSiz) {
        if (localStorage.getItem('location') == 'likes') {
            fech('http://localhost:8060/changeSizeLikes.php', newSiz);
            console.log(99)
        } 
        else if(localStorage.getItem('location') == 'basket') {
            setBasketImg(basket);
            setIsBasket(false);
        }
    }

    useEffect(() => {
    if (productInfo.category === 'bags') {
        setActive(4);
    }
}, [productInfo]);

    // 🧩 Отрисовка кнопок размера
    if (productInfo.category === 'shirt') {
        sizeDiv = (
            <>
                {['S', 'M', 'L'].map((size, index) => (
                    <div className="but11" key={size}>
                        <button
                            onClick={() => {
                                setActive(index + 1);
                                changeSize(size);
                                console.log(size)
                            }}
                            style={{
                                color: active === index + 1 ? "#fff" : "#000",
                                backgroundColor: active === index + 1 ? "#000000" : "#E0E0E0",
                            }}
                            className="but1"
                        >
                            {size}
                        </button>
                    </div>
                ))}
            </>
        );
    } else if (productInfo.category === 'bags') {
if (active !== 4) {
        setActive(4);
    }

        sizeDiv = (
            <div className="but100">
                <button
                    style={{
                        color: "#fff",
                        backgroundColor: "#000000",
                    }}
                    className="but1000"
                    disabled
                >
                    Единый размер
                </button>
            </div>
        );
    }

    return (
        <div className="product">
            <div className="left">
                <div className="topProd">
                    {/* 🧺 Кнопка "Добавить в корзину" */}
                    <div
                        className="basketDiv"
                        onClick={() => {
                            if(isBasket) {
                                const mm = { 1: "S", 2: "M", 3: "L", 4: "ONE" }[active];

                                fetch('http://localhost:8060/removeBasket.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: `product_id=${encodeURIComponent(productInfo.id)}&user=${encodeURIComponent(user)}&size=${encodeURIComponent(mm)}`
                                    })
                                .then(res => res.text())
                                .then(data => {
                                console.log("Удаление из rорзины:", data);
                                setBasketImg(basket);
                                setIsBasket(false);
                            })
                            .catch(err => console.error("Ошибка при удалении из лайков:", err));
                            
                            } else{
                                if (active === null) {
                                alert('Выберите размер!');
                            } else {
                                 if (localStorage.getItem('isLogin')) {
                                props.basketOnClick(active, id);
                                setBasketImg(basket2);
                                setIsBasket(true)
                                 } else {
                                    alert('you are not registred into account'); 
                                 }
                            }
                            }


                            
                        }}
                    >
                        <Img className='iii' src={basketImg} />
                    </div>

                    {/* 💗 Кнопка "Добавить в лайкнутые" */}
                    <div
                        className="basketDiv"
                        onClick={() => {
                             // если уже лайкнут — не реагирует
                            if (isLiked) {
                                fetch('http://localhost:8060/removeLike.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: `product_id=${encodeURIComponent(productInfo.id)}&user=${encodeURIComponent(user)}`
                                    })
                            .then(res => res.text())
                            .then(data => {
                                console.log("Удаление из лайков:", data);
                                setHeartImg(heart);
                                setIsLiked(false);
                            })
                            .catch(err => console.error("Ошибка при удалении из лайков:", err));
                            } else{
                               if (active === null) {
                                alert('Выберите размер!');
                                } else {
                                    console.log(active)
                                    if (localStorage.getItem('isLogin')) { 
                                    props.likesOnClick(active, id);
                                    setHeartImg(heartAfter);
                                    setIsLiked(true);
                                    } else {
                                        alert('you are not registred into account'); 
                                    }
                                } 
                            }
                            
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <Img className='iii' src={heartImg} />
                    </div>
                </div>

                <div className="prodImgDiv">
                    <Img className="prodImg" src={productInfo.image} />
                </div>

                <div className="prodName">
                    <div>{productInfo.name}</div>
                    <div>{productInfo.price}</div>
                </div>
                <div className="prodButDiv" onClick={props.goToBasket2}><button className="prodBut">Перейти к оформлению хайпа</button></div>
            </div>

            <div className="right">
                <div className="up">
                    <div className="prodT">О товаре</div>
                    <div className="gridAbout">
                        <div className="stringAbout">
                            <div className="aboutLight">Описание</div>
                            <div className="aboutBold">{productInfo.name}</div>
                        </div>
                        <hr style={{ border: "1px solid #AFADA7" }} />
                        <div className="stringAbout">
                            <div className="aboutLight">Материал</div>
                            <div className="aboutBold">Хлопок 100%</div>
                        </div>
                        <hr style={{ border: "1px solid #AFADA7" }} />
                        <div className="stringAbout">
                            <div className="aboutLight">Состав</div>
                            <div className="aboutBold">100% хлопок</div>
                        </div>
                        <hr style={{ border: "1px solid #AFADA7" }} />
                        <div className="stringAbout">
                            <div className="aboutLight">Нанесение</div>
                            <div className="aboutBold">DTF печать</div>
                        </div>
                        <hr style={{ border: "1px solid #AFADA7" }} />
                        <div className="stringAbout">
                            <div className="aboutLight">Цвет</div>
                            <div className="aboutBold">{productInfo.color}</div>
                        </div>
                    </div>
                </div>

                <div className="down">
                    <div className="prodT">Размер</div>
                    <div className="button3">{sizeDiv}</div>
                </div>
            </div>
        </div>
    );
}