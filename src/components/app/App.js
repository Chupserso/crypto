import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/mainPage/MainPage";
import { HistoryPage } from "../pages/historyPage/HistoryPage";
import { AccountPage } from "../pages/accountPage/AccountPage";

export const App = (props) => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </Router>
        </div>
    );
}