import React from "react";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen mx-14">
            <div className="w-full text-center justify-center">
                <div className="w-full flex justify-center">
                    <h1 className="font-bold w-fit my-6 border-b-4 border-double border-white">
                        Kelompok 9 TBA
                    </h1>
                </div>
                <p>Abraham Willem Hersubagyo - L0122002</p>
                <p>Akhyar Amin - L0122010</p>
                <p>Alyza Khoirun Nadif - L0122018</p>
                <p>Arma Nasrul Mustofa - L0122026</p>
                <p>Bintang Harida Ramadhan - L0122034</p>
            </div>
            <div className="flex flex-wrap justify-center mt-14 text-center text-xl gap-x-4 gap-y-4 p-4">
                <Link to={"/Nomor_1"} className="flex justify-center items-center">
                    <p className='w-80 h-40 bg-slate-900 p-6 rounded-3xl text-white hover:bg-gray-700 hover:text-white flex justify-center items-center'>
                        Konversi NFA / E-NFA ke DFA
                    </p>
                </Link>

                <Link to={"/Nomor_2"} className="flex justify-center items-center">
                    <p className='w-80 h-40 bg-slate-900 p-6 rounded-3xl text-white hover:bg-gray-700 hover:text-white flex justify-center items-center'>
                        Konversi Regex ke E-NFA
                    </p>
                </Link>

                <Link to={"/Nomor_3"} className="flex justify-center items-center">
                    <p className='w-80 h-40 bg-slate-900 p-6 rounded-3xl text-white hover:bg-gray-700 hover:text-white flex justify-center items-center'>
                        Minimize DFA
                    </p>
                </Link>

                <Link to={"/Nomor_4"} className="flex justify-center items-center">
                    <p className='w-80 h-40 bg-slate-900 p-6 rounded-3xl text-white hover:bg-gray-700 hover:text-white flex justify-center items-center'>
                        Ekuivalensi 2 DFA
                    </p>
                </Link>

                <Link to={"/Nomor_5"} className="flex justify-center items-center">
                    <p className='w-80 h-40 bg-slate-900 p-6 rounded-3xl text-white hover:bg-gray-700 hover:text-white flex justify-center items-center'>
                        Test String pada DFA, NFA, E-NFA, dan Regex
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Home