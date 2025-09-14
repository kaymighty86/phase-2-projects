import { Link } from "react-router-dom";

const products = [
    {
        id: "product1",
        name: "NVidea RTX 2090"
    },
    {
        id: "product2",
        name: "NVidea RTX 5060"
    },
    {
        id: "product3",
        name: "NVidea RTX 1050"
    }
]

export default function ProductsPage(){
    return (
        <>
            <h1>Products</h1>
            <ol>
                {products.map(product => (
                    <li key={product.id}><Link to={product.id}>{product.name}</Link></li>
                    ))}
            </ol>
        </>
    );
}