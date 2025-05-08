import Style from "./Header.module.css";
import appLogo from "../assets/app-logo.png";

export default function Header(){
    return (
        <header className={Style.appHeader}>
            <img src={appLogo} width="100px" height="auto" className={Style.appLogo}/>
            <h1>React Essentials</h1>
            <p>Fundamental React concepts you will need for almost any app you're going to build!</p>
        </header>
    );
}