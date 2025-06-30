import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Footer from "./footer";
import Header from "./header";


export default function Roteador() {
    const navigate = useNavigate();

    function selecionarView(view: string) {
        navigate(`/${view.toLowerCase()}`);
    }

    const botoes = ['Home'];

    return (
        <>
            <Header seletorView={selecionarView} tema="rgb(255, 123, 0)" botoes={botoes} />
            <Routes>
                <Route path="/" element={<Home tema="rgb(255, 123, 0)" />} />
            </Routes>

            <Footer botoes={botoes} tema="rgb(255,123,0)"/>
        </>
    );
}
