import Img from "./img"
import suiBack from '../../vitas_ishodniki/suisideboys/FYC_BG.png'
import suiShirt from '../../vitas_ishodniki/suisideboys/suiShirt.png'

export default function Sui(props) {
    return(
        <div className="sui">
            <div className="suiTxt">One color, two numbers<br></br> Three fingers in the sky,<br></br> amongst the thunder</div>
            <div className="suiShirtDiv" productid={props.productid} onClick={props.onClickProduct}><Img className='suiShirt' src={suiShirt}></Img></div>
        </div>
    )
}