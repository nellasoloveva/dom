import React, { useState } from "react";
import Img from "./img";

import { products } from "./products";


const images = products.filter(item => item.category === "bags");
            
 // id картинок для unsplash


// 2. Основной компонент
export default function Carousel(props) {
  // 2.1. Состояние: какой сейчас индекс "левой" картинки
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2.2. Сколько картинок видно одновременно
  const visibleCount = 3;

  // 2.3. Ширина одной картинки (должна совпадать с CSS)
  const itemWidth = 500;

  // 2.4. Максимальный индекс, дальше которого листать нельзя
  // (например: 5 картинок - 3 видно = можно сдвинуть только 2 раза)
  const maxIndex = Math.max(0, images.length - visibleCount);

  // 2.5. Функция — перелистнуть назад
  const prevSlide = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  // 2.6. Функция — перелистнуть вперёд
  const nextSlide = () => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  };

  // 2.7. Разметка (JSX)
  return (
    <div className="carousel">
      {/* Кнопка "влево" */}
      <button
        className="arrow arrow-left"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        ‹
      </button>

      {/* "окно просмотра" фиксированной ширины */}
      <div
        className="carousel-viewport"
        style={{ width: `${(visibleCount * itemWidth) + 30}px` }}
      >
        {/* лента со всеми картинками в ряд */}
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {/* для каждой картинки создаём div через map */}
          {images.map((img, index) => (
            <div className="carousel-item" key={img.id} onClick={() => props.onClickProduct(img.id)}>
                <Img className='bag' src={img.imageBack}></Img>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка "вправо" */}
      <button
        className="arrow arrow-right"
        onClick={nextSlide}
        disabled={currentIndex >= maxIndex}
      >
        ›
      </button>
    </div>
  );
}
