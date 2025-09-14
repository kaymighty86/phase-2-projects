import { useParams, Link } from "react-router-dom";

export default function ProductDetailsPage(){
    const param = useParams();

    return (
        <>
            <p>{param.productId}</p>
            <Link to=".." relative="path">back</Link>{/*adding ".." to the to prop mean we want to go back by one level on the directory, the relative prop tells how we want to go back; either via the "path" which is the URL or the "route" which is the defined rounte heirarchy */}
        </>
    );
}