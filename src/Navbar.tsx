import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className={"w-screen"}>
        <div className='fixed h-screen bg-gray-900'>
            <div className='h-full border-r w-48 flex justify-center items-center'>
                <div className='block text-center'>
                    <Link to={"/Nomor_1"} className='block mb-8'>Nomor 1</Link>
                    <Link to={"/Nomor_2"} className='block mb-8'>Nomor 2</Link>
                    <Link to={"/Nomor_3"} className='block mb-8'>Nomor 3</Link>
                    <Link to={"/Nomor_4"} className='block mb-8'>Nomor 4</Link>
                    <Link to={"/Nomor_5"} className='block mb-8'>Nomor 5</Link>
                    {/*<Link to={"/test"} className='block mb-8'>test</Link>*/}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Navbar;
