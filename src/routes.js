import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Container from './paginas/Container/index.jsx';
import Adm from './paginas/Login/navegar.js';
import Cliente from './paginas/Login/cliente.js';
import Clientepagina from './paginas/Areacliente/index.jsx';
import Admpage from './paginas/Adm/index.jsx';
import Header from "./components/Header/index.jsx";
import Footer from "./components/Footer/index.jsx";
function routes() {
    return (
        <>
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<Container />} />
                    <Route path="/ROTADETESTE" element={<Container />} />
                    <Route path="/adm" element={<Adm />} />
                    <Route path="/cliente" element={<Cliente />} />
                    <Route path="/cliente" element={<Cliente />} />
                    <Route path="/clientepagina" element={<Clientepagina />} />
                    <Route path="/admpage" element={<Admpage />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )

}

export default routes;