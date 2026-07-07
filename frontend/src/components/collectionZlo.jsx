import Header from "./header";
import Grid from "./grid";
import { products } from "./products";



export default function Zlo(props) {
    function goHome() {
        props.navigate("home"); // вернуться на главную
    }
    const zloProducts = products.filter(item => item.collection === "zlo");
    return(
        <div>
            <Header onClick={goHome} goToLikes={props.goToLikes} goToBasket={props.goToBasket}/>   
            <div className="txt">Коллекция Зло</div>
            <Grid products={zloProducts} onClickProduct={props.onClickProduct}/>
        </div>
    )
}