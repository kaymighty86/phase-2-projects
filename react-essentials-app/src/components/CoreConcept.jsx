import Style from "./CoreConcept.module.css";

export default function CoreConcept({image, title, description}){
    return (
        <section className={Style.CoreConcept}>
            <img src={image}/>
            <h3>{title}</h3>
            <p>{description}</p>
        </section>
    );
}