import "./MainPage.css";
import { Link } from "react-router-dom";

export const MainPage = () => {
    return (
        <>
            <h1>Выбери страницу для скриншота</h1>
            <div className="buttons">
                <Link to="/account"><button>Единый торговый аккаунт</button></Link>
                <Link to="/history"><button>История позиций</button></Link>
            </div>
        </>
    );
}