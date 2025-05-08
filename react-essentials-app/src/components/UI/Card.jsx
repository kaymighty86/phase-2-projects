import Style from "./Card.module.css";

export default function Card({className = "", children}){

    const classNames = `${Style.card} ${className}`

    return (
        <section className={classNames}>{children}</section>
    );
}