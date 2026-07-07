import { useState, useEffect } from 'react';
import './App.css'
import Home from './components/home'
import Autorize from './components/autorize'
import Register from './components/register';
import Zlo from './components/collectionZlo';
import Plegtum from './components/collectionPlegtum';
import Img from './components/img';
import geoIcon from '../vitas_ishodniki/Location.png'
import gg from '../vitas_ishodniki/gg.png'
import Product from './components/product';
import Likes from './components/likes';
import Basket from './components/baskets';
import Frame from './components/frame16';
import ConfirmEmail from './components/confirmEmail';




export default function App() {
  const stateArray = useState("home"); 

  let [classModal, setClassModal] = useState('none'); // класс у модального окна
  let [aye, setAye] = useState('like'); // класс контента страницы
  let [govno, setGovno] = useState('govno'); // класс всей страницы
  let [productModal, setProductModal] = useState('none'); // я не знаю что это
  let savedScroll = 0; // скрлл страницы чтобы не слетал потои
  let [selectedProductId, setSelectedProductId] = useState(null); // айди продукта на кот нажали
  let [size, setSize] = useState(null); // размер ненужный ваще


  let [geoLock, setGeoLock] = useState("") // шеолок пользователя
  

  useEffect(() => { // вылезание модалки если нет геолокации сразу при. входе
    
      if (localStorage.getItem('isGeo') == null) {
          setClassModal('overflow')
          setAye('active')
          setGovno('govno2')
      } else if(localStorage.getItem('isGeo') == 'true') {
        setClassModal('none')
      }
  })
  
  const [page, setPage] = useState(() => { // сохр в локалке странички на кот пользвоатель
    return localStorage.getItem("location") || "home";
  });

  function navigate(to) { // чето навигация
    setPage(to);
  }

  useEffect(() => { // тоже чето с навигацией
    localStorage.setItem("location", page);
  }, [page]);

  function gagaga() { // функция сохранения геолок
    localStorage.setItem('isGeo', true);
    localStorage.setItem('geoLock', geoLock);
    setClassModal('none')
    setAye('like')
    setGovno('govno')
  }
  


  
  
  function onClickProduct(id) { // при нажатии на продукт вылезает окно
    savedScroll = window.scrollY; // сохр скрола как нажали
    setSelectedProductId(id); // сохр айди продукта
    setAye('active') // вылезание модального окна
    setGovno('govno2')
    setProductModal('productModal')
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScroll}px`;
    document.body.style.width = '100%';
    
    
  }

  function likesOnClick(active, id) { // при лайке продукта отправка в бэк
    const newSize = {1: "S", 2: "M", 3: "L", 4: "ONE"}[active]; // сохр выбранного размера
    setSize(newSize);
    let user =  localStorage.getItem('user') // сохр имени пользователя
    
    
      fetch('http://localhost:8060/likes.php', { // фетч в пхп
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // важно!
        },
        body: `id=${encodeURIComponent(id)}&user=${encodeURIComponent(user)}&size=${encodeURIComponent(newSize)}&newSize=${encodeURIComponent(null)}`,
      })
      .then(response => {
        console.log(8989);
        return response.text()
      } )
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    
  }

  function basketOnClick(active, id) { // при нажатии в корзину отправка в бэк
    const newSize = {1: "S", 2: "M", 3: "L", 4: "ONE"}[active];
    setSize(newSize);
    let user =  localStorage.getItem('user')
    // все тоже самое как лайк
   
      fetch('http://localhost:8060/basket.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // важно!
        },
        body: `id=${encodeURIComponent(id)}&user=${encodeURIComponent(user)}&size=${encodeURIComponent(newSize)}`,
      })
      .then(response => {
        console.log(8989);
        return response.text()
      } )
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    
  }
  function goToLikes() {
      navigate("likes")
    }

  function goToBasket() {
      navigate("basket")
    }

    function goToFrame() {
      navigate("frame")
    }

    function goToBasket2() {
      navigate("basket");
      setProductModal('none');
          setAye('like')
        setGovno('govno')
          document.body.style.position = '';
          document.body.style.top = '';
    }
  // обычные условия вместо &&
  let content;
  if (page === "home") { // какую страницу показывать  
    content = <Home navigate={navigate} onClickProduct={onClickProduct} goToLikes={goToLikes} goToBasket={goToBasket}/>;
    localStorage.setItem('location', page)
  } else if (page === "autorize") {
    content = <Autorize navigate={navigate} />;
    localStorage.setItem('location', page)
  } else if(page === 'register') {
    content = <Register navigate={navigate} />
  } else if(page === "collectionPlegtum") {
    content = <Plegtum navigate={navigate} onClickProduct={onClickProduct} productid={selectedProductId} goToLikes={goToLikes} goToBasket={goToBasket}/>
  } else if(page === "collectionZlo") {
        content = <Zlo navigate={navigate} onClickProduct={onClickProduct} productid={selectedProductId} goToLikes={goToLikes} goToBasket={goToBasket}/>
  } else if(page === "likes") {
        content = <Likes navigate={navigate} onClickProduct={onClickProduct} likesOnClick={likesOnClick} basketOnClick={basketOnClick}/>
  } else if(page === "basket") {
        content = <Basket navigate={navigate} onClickProduct={onClickProduct} goToFrame={goToFrame}/>
  } else if(page === "frame") {
        content = <Frame navigate={navigate} onClickProduct={onClickProduct} />
  } else if(page === "confirm") {
        content = <ConfirmEmail navigate={navigate} />
  }


  return( // разметка странички и модального окна
    <div className={govno}>
      <div className={aye}>
        {content}
      </div>
      <div className={classModal}>
        <div className='geoDiv'>
            <div className='vash'>Ваш город?</div>
            <div className='geoInputDiv'>
                <div className='geoIconDiv'><Img className="geoIcon" src={geoIcon}></Img></div>
                <input type='text' className='geoInput' placeholder='Название населенного пункта' value={geoLock} onChange={e => setGeoLock(e.target.value)}></input>
            </div>
          <div className="buttonDiv"><button type="submit" className="button" onClick={gagaga}>Запомнить</button></div>
        </div>
      </div>
      {productModal === 'productModal' && (
    <>
      <div 
        className="overlay" 
        onClick={() => {
          setProductModal('none');
          setAye('like')
        setGovno('govno')
          document.body.style.position = '';
          document.body.style.top = '';
        }}
      />
      <div className="productModal" id='productModal'>
        <Product productid={selectedProductId} likesOnClick={likesOnClick} basketOnClick={basketOnClick} goToBasket2={goToBasket2}/>
      </div>
    </>
  )}
    </div>
  )

  
  
}

