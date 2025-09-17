import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

export default function MainRoot (){

    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <>
            <MainNavigation />
            {isLoading && <p>Loading...</p>}
            <main>
                <Outlet />
            </main>
        </>
    );
}