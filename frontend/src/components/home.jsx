import { useState } from 'react'
import Header from './header.jsx'
import Banners from './banners.jsx'
import Carousel from './bagss.jsx'
import Sui from './suisideboys.jsx'
import Footer from './footer.jsx'
import Img from './img.jsx'
import dis from '../../vitas_ishodniki/down/dis.png'
import image16 from '../../vitas_ishodniki/image16.png'


import React from "react";


export default function Home(props) {

    function goToAutorize() {
    props.navigate("autorize");
    }
    
    function goToPlegtum() {
      props.navigate("collectionPlegtum")
    }

    function goToZlo() {
      props.navigate("collectionZlo")
    }

    function goHome() { // фуекцмя на домашнюю страницу
    props.navigate("home");
  }

  return(
    <div>
    <Header autorize={goToAutorize} goToLikes={props.goToLikes} goToBasket={props.goToBasket} onClick={goHome}></Header>
    <Banners onClick={goToPlegtum} onClick2={goToZlo} />
    <div className='shopper'>футболка "Суицидальные ребятки"</div>
    <hr></hr> 
    <Sui productId={props.productid} onClickProduct={() => props.onClickProduct(11)}/>
    <div className='shopper'>Шопперы</div>
    <hr></hr>
    <Carousel onClickProduct={props.onClickProduct}/>
    <div className='shopper'>Eternal Sunshine</div>
    <hr></hr>
    <div className='slon' onClick={() => props.onClickProduct(9)}><Img className='slonImg' src={image16}></Img></div>
    <hr></hr>
    <Footer></Footer>
    <div className='footerTxt'><Img className='dis' src={dis}></Img></div>
    </div>
  )
  
}
