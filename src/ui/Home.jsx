import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const username=useSelector(state=>state.user.username);
  const navigate=useNavigate();
  return (
    <div className="  mt-10 text-center  px-4 py-4 overflow-scroll">
      <div className="flex flex-col  md:flex-row  md:justify-around md:items-center ">
        <h1 className="font-bold text-center md:text-left md:pl-5 text-2xl mb-8 md:text-5xl">
          The best pizza.
          <br />
          <p className="font-bold text-yellow-400 text-2xl md:text-4xl ">
            Straight out of the oven, straight to you.
          </p>
        </h1>
        <img
          src="src/ui/10219.jpg"
          className=" max-h-80md:min-h-96 md:min-w-96 max-w-80 mx-auto md:mx-0 xl:min-w-[600px] "
        />
      </div>
      {!username&&<CreateUser />}
      {username && <div><h1 className="text-2xl ">Hello!! <span className="text-3xl font-semibold p-2 capitalize text-yellow-400">{username}</span>click below to go to menu.....</h1>
        <br />
        <button className="btn-primary p-3 w-24" onClick={()=>navigate('/menu')}>MENU</button></div>}
    </div>
  );
}

export default Home;
