import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { useSelector } from "react-redux";

const Header = () => {
  const username=useSelector(state=>state.user.username);
  
  return (
    <header className="bg-amber-400  h-16 flex items-center justify-between font-semibold px-4 py-3 uppercase ">
      <Link to="/" className="tracking-widest font-bold text-base sm:text-xl">
        FAST REACT PIZZA CO.
      </Link>
      <SearchOrder />
      {username &&<p className="hidden md:block">{username}</p>}
    </header>
  );
};

export default Header;
