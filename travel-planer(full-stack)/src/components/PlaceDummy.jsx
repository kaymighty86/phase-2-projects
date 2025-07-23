import LoadingIcon from "../assets/loadingIcon.png";

export default function PlaceDummy(){
    return (
        <li className="place-item-dummy">
            <img src={LoadingIcon} alt={"Loading..."} className={""} />
        </li>
    );
}