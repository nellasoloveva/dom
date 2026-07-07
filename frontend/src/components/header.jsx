import Img from './img.jsx'
import persIcon from '../../vitas_ishodniki/up/user.png'
import stupid from '../../vitas_ishodniki/up/Stupid_button.png'
import basket from '../../vitas_ishodniki/up/basket.png'
import heart from '../../vitas_ishodniki/up/heart.png'
import back from '../../vitas_ishodniki/Logout.png'



import { useState, useEffect } from 'react';


export default function Header(props) {
const [geoLockation, setGeoLockation] = useState("");
const [isOpen, setIsOpen] = useState(false);
const user = localStorage.getItem('user'); // текущий пользователь
const email = localStorage.getItem('email'); // текущий пользователь


    const [enter, setEnter] = useState(
        <div  className="logIn" onClick={() => props.autorize()}>
            
        </div>
    )

    

    useEffect(() => {
    if (localStorage.getItem('isLogin') == 'true') {
        setEnter(
                <div className="logIn">
                    <div className='krug' onClick={props.goToBasket}><Img className='basket' src={basket}></Img></div>
                    <div className='krug' onClick={props.goToLikes}><Img className='heart' src={heart}></Img></div>
                    <div className='krug' onClick={() => setIsOpen(!isOpen)}><Img className='person' src={persIcon}></Img></div>
                    {isOpen && (
    <div className="profile-menu">
        <div className="triangle"></div>

        <div className="profile-block">
            <div className="profile-name">{user}</div>
            <div className="profile-phone">{email}</div>
            <div className="logout" onClick={() => {
                localStorage.removeItem('isLogin');
                localStorage.removeItem('user');
                localStorage.removeItem('email');
                localStorage.removeItem('location');
                props.onClick()
                location.reload();
                
            }}>Выйти<Img className='back' src={back}></Img></div>
        </div>
    </div>
)}
                </div>
            );
    } else {
        setEnter(
                <div  className="logIn" onClick={() => props.autorize()}>
            <div className='oval'>
                <div  className='voiti'>Войти</div>
                <div className='krug'><Img className='person' src={persIcon}></Img></div>
            </div>
        </div>
            );
    }
}, [isOpen]);

    useEffect(() => {
    if (localStorage.getItem('geoLock') != "") {
        setGeoLockation(localStorage.getItem('geoLock'))
    }
    }, []);



    return(
        <div className="header">
            <div className='st'>
                <div><Img className='stupid' src={stupid}></Img></div>
                <div className='geo '>{geoLockation}</div>
            </div>
            <div className="koshka" onClick={props.onClick}>ILL LAIR</div>
            {enter}
        </div>
    ) 
}

 
