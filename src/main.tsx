import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Nomor_5 from "./Nomor_5.tsx";
import Nomor_1 from "./Nomor_1.tsx";
import Nomor_2 from "./Nomor_2.tsx";
import Nomor_3 from "./Nomor_3.tsx";
import Nomor_4 from "./Nomor_4.tsx";
import Home from "./Home.tsx";
import Navbar from "./Navbar.tsx";
import Test from "./Test.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className='flex'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <div className="z-50 fixed top-0 left-0 right-0">
                                <Navbar />
                            </div>
                            <div className="z-0 relative pl-72 h-full">
                                <Outlet />
                            </div>
                        </div>
                    }>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/Nomor_1"} element={<Nomor_1 />} />
                        <Route path={"/Nomor_2"} element={<Nomor_2 />} />
                        <Route path={"/Nomor_3"} element={<Nomor_3 />} />
                        <Route path={"/Nomor_4"} element={<Nomor_4 />} />
                        <Route path={"/Nomor_5"} element={<Nomor_5 />} />
                        <Route path={"/test"} element={<Test />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    </React.StrictMode>,
)
