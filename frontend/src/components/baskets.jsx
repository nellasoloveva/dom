import Header from "./header";
import { useState, useEffect } from 'react';
import Img from "./img";
import cancel from '../../vitas_ishodniki/Cancel.png'
const user = localStorage.getItem('user'); // текущий пользователь
import { products } from "./products";




export default function Basket(props) {
  function goHome() { // фуекцмя на домашнюю страницу
    props.navigate("home");
  }

  const [contentBasket, setContentBasket] = useState(''); // контент на странице
  const [dataPr, setDataPr] = useState([]); // массив лайкнутых продуктов
  const [allCost, setAllCost] = useState(); // полная сумма товаров
  const [loaded, setLoaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedPr, setCheckedPr] = useState(true);
  let selectId = [];
  const user = localStorage.getItem('user');
  console.log(user)


  // ✅ Делаем fetch внутри useEffect (только при первом рендере)
  useEffect(() => { // получение товаров из корзины таблицы
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
          count: item.count,
          checked: item.checked
        }));
        setDataPr(basketProduct); // добавление массива в переменную
        setLoaded(true); // загрузка завершена флаг
        console.log(basketProduct);
      })
      .catch(error => console.error('Ошибка:', error));
    }, []); // 👈 пустой массив зависимостей → выполнится 1 раз
  

  // ✅ Второй useEffect для вывода текста
  useEffect(() => { //ф-я изменения чека
    if (!loaded) return; // если еще не загрузились данные выйти

  
  function toggleItem(id) {
  setDataPr(prev => // полученние последнего массива продуктов
    prev.map(item => // устанновка флага чек
      item.product_id === id
        ? { ...item, checked: !item.checked }
        : item
    )
  );
  } 

    

    if (dataPr.length === 0) {
      let wtf = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9) + 1);
      let oo = [];
      for (let i = 0; i < wtf.length; i++) {
        oo.push(products.find(item => item.id === wtf[i]))
      }
      console.log(wtf, oo)
      setContentBasket(
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
       
      setContentBasket(
        dataPr.map((product, index) => (
                        <div id={index} className="el" key={index}  >
                            <div className="imgGridImg">
                              <div className="chooseBtn"> <input
                              className="cheek"
                            type="checkbox"
                            checked={Boolean(product.checked)}
                            onChange={() => {toggleItem(product.product_id)
                              console.log(product.checked)}
                            }
            />

   </div>
                                <div className="iiii"
                                    onClick={() => {
                                        fetch('http://localhost:8060/removeBasket.php', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                            body: `product_id=${encodeURIComponent(product.product_id)}&user=${encodeURIComponent(user)}&size=${encodeURIComponent(dataPr[index].sizeProduct)}`
                                        })
                                        .then(res => res.text())
                                        .then(data => {
                                            console.log("Удаление из rорзины:", data);
                                            location.reload()
                                        })
                                        .catch(err => console.error("Ошибка при удалении из лайков:", err));
                                    }}
                                ><Img className="iicoon" src={cancel}/></div>
                                <Img className="imgGrid" src={product.image} /></div>
                            <div className='elName' onClick={() => props.onClickProduct(product.product_id)}>{product.name}</div>
                            <div className="u">
                                <div className='elCost'>{product.price * product.count}</div>
                                <div className="elSize">{dataPr[index].sizeProduct}</div>
                            </div>
                            <div className="elCounterDiv">
                                <div className="minus">
                                  <button
                                    className="min"
                                    onClick={() => {
                                      if (Number(product.count) <= 1) return; // <<< защита от ухода в 0 и минус

                                      const newCount = Number(product.count) - 1;
                                     

                                      setDataPr(prev =>
                                        prev.map((item, i) =>
                                          i === index ? { ...item, count: newCount } : item
                                        )
                                      );

                                      fetch('http://localhost:8060/changeCount.php', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                        body: `product_id=${encodeURIComponent(product.product_id)}&user=${encodeURIComponent(user)}&size=${encodeURIComponent(dataPr[index].sizeProduct)}&count=${encodeURIComponent(newCount)}`
                                      })
                                        .then(res => res.text())
                                        .then(data => console.log("ok", data))
                                        .catch(err => console.error("Ошибка:", err));
                                    }}
                                  >
                                    -
                                  </button>
                                </div>
                                <div className="counter">{product.count}</div>
                                <div className="plus"><button className="min"
                                                              onClick={() => {
                                                                const newCount = Number(product.count) + 1;
                                                                setDataPr(prev =>
                                                                    prev.map((item, i) =>
                                                                    i === index ? { ...item, count: newCount } : item
                                                                    )
                                                                );

                                                                fetch('http://localhost:8060/changeCount.php', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                                    body: `product_id=${encodeURIComponent(product.product_id)}&user=${encodeURIComponent(user)}&size=${encodeURIComponent(dataPr[index].sizeProduct)}&count=${encodeURIComponent((Number(dataPr[index].count))+1)}`
                                                                })
                                                                .then(res => res.text())
                                                                .then(data => {
                                                                    console.log("ok", data);
                                                                })
                                                                .catch(err => console.error("Ошибка при удалении из лайков:", err));
                                                              }}
                                >+</button></div>
                            </div>
                        </div>
                    ))
      );
      const total = dataPr.reduce((sum, item) => sum + item.price * item.count, 0);
      setAllCost(total);
      console.log(selectedIds)
    }
    
  }, [dataPr, checkedPr, selectedIds]); // выполнится только когда обновится dataPr

   function toggleAll() {
  const allChecked = dataPr.every(item => item.checked);

  setDataPr(prev =>
    prev.map(item => ({
      ...item,
      checked: !allChecked
    }))
  );
}

  return (
    <div>
      <Header onClick={goHome} />
      <div className="choose">
        
        <div className="chooseBtn"> <input
        className="cheek"
            type="checkbox"
            checked={dataPr.every(item => item.checked)}
            onChange={toggleAll}
          />
<span>Выбрать всё</span>
</div>
      </div>
      <div className="likesTxt">Корзина</div>
      <div className="grid">{contentBasket}</div>
      <div className="goToBuy">
        <button className="goToB" onClick={props.goToFrame}>перейти к оформлению хайпа {allCost}</button>
      </div>
    </div>
  );
}