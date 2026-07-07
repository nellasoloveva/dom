import Banner1 from "./banner1"
import ImageSlider from "./banner2"

export default function Banners(props) {
  return(
    <div className="banners">
      <Banner1 onClick={props.onClick} onClickProduct={props.onClickProduct}/>
      <ImageSlider onClick={props.onClick2} onClickProduct={props.onClickProduct}/>
    </div>
  )
  
}