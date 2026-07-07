import vkIcon from '../../vitas_ishodniki/down/vkIcon.png'
import tgIcon from '../../vitas_ishodniki/down/tgIcon.png'
import youIcon from '../../vitas_ishodniki/down/youtubeIcon.png'
import instIcon from '../../vitas_ishodniki/down/instIcon.png'
import Img from './img'

export default function Footer() {
    return (
        <div>
            <div className="footer">
                <div className="contact">Конакты</div>
                <div className='iconDiv'><Img className='icon' src={vkIcon}></Img></div>
                <div className='iconDiv'><Img className='icon' src={tgIcon}></Img></div>
                <div className='iconDiv'><Img className='icon' src={youIcon}></Img></div>
                <div className='iconDiv'><Img className='icon' src={instIcon}></Img></div>
            </div>
            <div className="koshkindom-koshkindom-tg">
                <span>
                    <span className="koshkindom-koshkindom-tg-span">По вопросам обмена и возврата</span>
                    <span className="koshkindom-koshkindom-tg-span2"> @</span>
                    <span className="koshkindom-koshkindom-tg-span3">ILLLAIR</span>
                    <span className="koshkindom-koshkindom-tg-span2">
                        <br />
                        <br />
                    </span>
                    <span className="koshkindom-koshkindom-tg-span">По вопросам сотрудничества</span>
                    <span className="koshkindom-koshkindom-tg-span2"> @</span>
                    <span className="koshkindom-koshkindom-tg-span3">ILLLAIR</span>
                    <span className="koshkindom-koshkindom-tg-span2">
                        <br />
                    </span>
                </span>
            </div>
        </div>
    )
}