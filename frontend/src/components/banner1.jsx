import plegBack from '../../vitas_ishodniki/banner1/plegBack.png'
import pleg1 from '../../vitas_ishodniki/banner1/pleg1.png'
import pleg2 from '../../vitas_ishodniki/banner1/pleg2.png'
import plegTxt from '../../vitas_ishodniki/banner1/plegTxt.png'
import Img from './img'

export default function Banner1(props) {
  return(
    <div className='banner1' onClick={props.onClick} onClickProduct={props.onClickProduct}>
            <div><Img className='plegTxt' src={plegTxt}></Img></div>
            <div><Img className='pleg2' src={pleg2}></Img></div>
            <div><Img className='pleg1' src={pleg1}></Img></div>
    </div>
  ) 
}