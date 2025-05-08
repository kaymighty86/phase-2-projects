import Style from "./TabButton.module.css";

export default function TabButton({selected = false, children, ...others}){
    
    return (
        <li className={`${Style.TabButton} ${selected && Style.selected}`}><button {...others}>{children}</button></li>
    );
}