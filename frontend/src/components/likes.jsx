import Header from "./header";
import { useState, useEffect } from 'react';
import Img from "./img";
import { products } from "./products.js";
import heart from '../../vitas_ishodniki/Heart2.png'

import heartAfter from '../../vitas_ishodniki/Favorite.png'
const user = localStorage.getItem('user'); 


export default function Likes(props) {
  function goHome() {
    props.navigate("home");
  }

    const [isLiked, setIsLiked] = useState(true); // есть ли товар в избранном
    const [heartImg, setHeartImg] = useState(heart);

  const [contentLikes, setContentLikes] = useState(''); // контент на странице
  const [dataPr, setDataPr] = useState([]); // массив лайкнутых продуктов
  const [likesState, setLikesState] = useState([]);
  const [sizzze, setSizzze] = useState([]);
  const [iddd, setIddd] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // ✅ Делаем fetch внутри useEffect (только при первом рендере)
  useEffect(() => {
    fetch('http://localhost:8060/likesOut.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: `user=${encodeURIComponent(user)}`
                                    })
      .then(response => response.json())
      .then(data => {
        
        let likesProduct = data.map(item => ({ // добавление всеех продуктов в массив
          product_id: item.product_id,
          sizeProduct: item.sizeProduct,
          image: item.imageBack,
          name: item.name,
          price: item.price
        }));
        setDataPr(likesProduct);
        setLoaded(true);
        setLikesState(data.map(() => true)); // все лайкнуты по умолчанию

        

        console.log(likesProduct);
      })
      .catch(error => console.error('Ошибка:', error));
    }, []); // 👈 пустой массив зависимостей → выполнится 1 раз

  // ✅ Второй useEffect для вывода текста
  useEffect(() => {
    if (!loaded) return;
    if (dataPr.length === 0) {
      let wtf = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9) + 1);
            let oo = [];
            for (let i = 0; i < wtf.length; i++) {
              oo.push(products.find(item => item.id === wtf[i]))
            }
            console.log(wtf, oo)
            setContentLikes(
              <div className="pu">
                <div className="pusto">Ваша корзина пуста</div>
                <div className="ponr">вот что может вам понравится!</div>
                <div className="grid2">
                            {oo.map((product, index) => (
                                <div id={index} className="el" key={index}>
                                    <div className="imgGridImg"><Img className="imgGrid" src={product.imageBack} /></div>
                                    <div className='elNameB2' onClick={() => props.onClickProduct(product.id)}>{product.name}</div>
                                    <div className='elCost2'>{product.price}</div>
                                </div>
                            ))}
                            </div>
              </div>
              );
    } else {
        
      setContentLikes(
        dataPr.map((product, index) => (
                        <div id={index} className="el" key={index}  >
                            <div className="imgGridImg">
                                <div 
                                className="iiii"
                                    onClick={() => {
                                                    if (likesState[index]) {
                                                        fetch('http://localhost:8060/removeLike.php', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                        body: `product_id=${encodeURIComponent(product.product_id)}&user=${encodeURIComponent(user)}`
                                                    })
                                                    .then(res => res.text())
                                                    .then(data => {
                                                        console.log("Удаление из лайков:", data);
                                                        setLikesState(prev => prev.map((v, i) => i === index ? false : v));
                                                    })
                                                    .catch(err => console.error("Ошибка при удалении из лайков:", err));
                                                } else {
                                                    setLikesState(prev => prev.map((v, i) => i === index ? true : v));
                                                    let likeSizik = dataPr[index].sizeProduct
                                                    
                                                    const newSizik = {"S": 1, "M": 2, "L": 3, "ONE": 4}[likeSizik]; // сохр выбранного размера
                                                    
                                                    console.log(likeSizik, product.size, product.product_id)
                                                    props.likesOnClick(newSizik, product.product_id);// добавлять обратно в лайки запрос пхп
                                                }
           
                                            }}
                                ><Img className="iicoon" src={likesState[index] ? heart : heartAfter}/></div>
                                <div><Img className="imgGrid" src={product.image}/></div>
                            </div>
                            <div className='elName' onClick={() => props.onClickProduct(product.product_id)}>{product.name}</div>
                            <div className='elCost'>{product.price}</div>
                            <div className="elButDiv" onClick={() => {
                                                    fetch('http://localhost:8060/whatBasket.php', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                                body: `product_id=${encodeURIComponent(product.product_id)}&user=${encodeURIComponent(user)}`
                                                            })
                                                            .then(res => res.json())
                                                            .then(data => {
                                                                console.log("Ответ от basket.php:", data);
                                                                const sizeFromDB = data.is_basket;
                                                                if (data.is_basket && data.is_basket !== 0) {
                                                                    alert('product has already been added')
                                                                } else {
                                                                    let likeSizik = dataPr[index].sizeProduct
                                                    
                                                                    const newSizik = {"S": 1, "M": 2, "L": 3, "ONE": 4}[likeSizik]; // сохр выбранного размера
                                                                    props.basketOnClick(newSizik, product.product_id);
                                                                    
                                                                }
                                                            })
                                                            .catch(err => console.error("Ошибка при проверке лайка:", err));
                                                        
                                                    }}
                            
                            ><button className="elBut">В корзину</button></div>
                        </div> // пхп в корзину добавить

                    ))
      );
      
    }
  }, [dataPr, likesState]); // выполнится только когда обновится dataPr

  return (
    <div>
      <Header onClick={goHome} />
      <div className="likesTxt">Избранные товары</div>
      <div className="grid">{contentLikes}</div>
      
    </div>
  );
}