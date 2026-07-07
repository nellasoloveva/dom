import whiteEvil from '../../vitas_ishodniki/banner2/whiteEvil.png'
import orangeEvil from '../../vitas_ishodniki/banner2/orangeEvil.png'
import black2 from '../../vitas_ishodniki/banner2/black2.png'
import shadow from '../../vitas_ishodniki/banner2/shadow.png'
import group from '../../vitas_ishodniki/banner2/group.png'
import evilTxt from '../../vitas_ishodniki/banner2/evilTxt.png'
import Img from './img'
import React from "react";
import { useRef, useEffect, useState } from "react";



export default function ImageSlider(props) {
  const bannerRef = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    if (bannerRef.current) {
      setBannerHeight(bannerRef.current.offsetHeight);
    }
  }, []);


  return (
    <div className='d' onClick={props.onClick} >
    <div className='banner2' ref={bannerRef}>
        <div className='items inner'>
            <div className='slide'><Img className='whiteEvil' src={whiteEvil}></Img></div>
            <div className='slide'><Img className='orangeEvil' src={orangeEvil}></Img></div>
            <div className='slide'><Img className='black2' src={black2}></Img></div>
        </div>
        <div className='items inner'>   
            <div className='slide'><Img className='whiteEvil' src={whiteEvil}></Img></div>
            <div className='slide'><Img className='orangeEvil' src={orangeEvil}></Img></div>
            <div className='slide'><Img className='black2' src={black2}></Img></div>
        </div>
       
    </div>
    <div className='shadowDiv0' style={{ height: `${bannerHeight}px` }}><Img className='shadow0'  src={shadow}></Img></div>
    <div className='gr'>
        <div className='group'><Img className='group' src={group}></Img></div>
        <div className='evilTxtDiv'><Img className='evilTxt' src={evilTxt}></Img></div>
    </div>
    </div>
  )
}