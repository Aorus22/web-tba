import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className={"w-screen"}>
        <div className='fixed h-screen bg-gray-900'>
            <div className='h-full border-r w-48 flex justify-center items-center'>
                <div className='block w-40 text-center'>
                    <Link to={"/"} className='block p-2 rounded-xl hover:bg-gray-700 mb-6'>Home</Link>
                    <Link to={"/Nomor_1"} className='block p-2  rounded-xl hover:bg-gray-700 mb-6'>Nomor 1</Link>
                    <Link to={"/Nomor_2"} className='block p-2  rounded-xl hover:bg-gray-700 mb-6'>Nomor 2</Link>
                    <Link to={"/Nomor_3"} className='block p-2  rounded-xl hover:bg-gray-700 mb-6'>Nomor 3</Link>
                    <Link to={"/Nomor_4"} className='block p-2  rounded-xl hover:bg-gray-700 mb-6'>Nomor 4</Link>
                    <Link to={"/Nomor_5"} className='block p-2  rounded-xl hover:bg-gray-700 mb-6 '>Nomor 5</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Navbar;
