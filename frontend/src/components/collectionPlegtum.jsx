import Header from "./header";
import Grid from "./grid";
import { products } from "./products";



export default function Plegtum(props) {
    function goHome() {
        props.navigate("home"); // вернуться на главную
    }
    const plegtumProducts = products.filter(item => item.collection === "phlegtum");
    return(
        <div>
            <Header onClick={goHome} goToLikes={props.goToLikes} goToBasket={props.goToBasket}/>   
            <div className="txt">Коллекция Phleghtum</div>
            <Grid products={plegtumProducts} onClickProduct={props.onClickProduct}/>
        </div>
    )
}