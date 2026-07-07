import Img from './img.jsx'


export default function Grid(props) {
    return(
        <div className="grid">
            {props.products.map((product, index) => (
                <div id={index} className="el" key={index} onClick={() => props.onClickProduct(product.id)} >
                    <div className="imgGridImg"><Img className="imgGrid" src={product.imageBack} /></div>
                    <div className='elNameB'>{product.name}</div>
                    <div className='elCost'>{product.price}</div>
                </div>
            ))}
            </div>
    )
}