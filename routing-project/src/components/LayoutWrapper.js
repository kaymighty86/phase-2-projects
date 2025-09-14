import { Outlet, NavLink } from "react-router-dom";

export default function LayoutWrapper(){
    return (
        <>
            <h1>Simple Store</h1>
            <nav>
                <ul>
                    <li><NavLink to="" className={({isActive})=>(isActive? "current" : undefined)} end > Home </NavLink></li>
                    <li><NavLink to="products" className={({isActive})=>(isActive? "current" : undefined)} > Products </NavLink></li>
                    <li><NavLink to="contact" className={({isActive})=>(isActive? "current" : undefined)} > Contact </NavLink></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}