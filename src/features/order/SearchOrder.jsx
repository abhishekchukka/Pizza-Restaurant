import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchValue) return;
    console.log(searchValue);
    navigate(`/order/${searchValue}`);
    setSearchValue("");
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search Order #"
        value={searchValue}
        className="w-52 h-8 transition-all duration-300 pl-4 opacity-95 placeholder:text-stone-400 sm:focus:w-72  focus:outline-none sm:w-64 rounded-xl
        "
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchOrder;
