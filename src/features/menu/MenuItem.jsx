import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utilitites/helpers";
import { addItem, increaseItemQuantity } from "../cart/cartSlice";
import CounterPizzas from "../cart/CounterPizzas";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch=useDispatch();
  const presentCart=useSelector(state=>state.cart.cart);
  function handleAdd(){
    

    const newItem={
      pizzaId:id,
      name, quantity:1,
      unitPrice,
      totalPrice:unitPrice,
    }
    const existingItem=presentCart.find(item=>item.pizzaId===newItem.pizzaId)
    if(existingItem){
      dispatch(increaseItemQuantity(newItem.pizzaId));
    }
    else{
    dispatch(addItem(newItem));
    }
  }
  return (
    <li className="  w-64 p-5 bg-stone-100  mt-3 relative ">
      {soldOut && (
        <div className="absolute h-full  inset-0 w-full bg-stone-400/30 flex justify-center items-center text-3xl">
          Sold out
        </div>
      )}
      <img src={imageUrl} alt={name} className={soldOut ? "opacity-10" : ""} />

      <div className="">
        <p className=" text-yellow-400 text-amber-600 font-semibold capitalize text-lg">
          {name}
        </p>
        <p className="w-54 h-[72px] capitalize">{ingredients.join(", ")}</p>
        <div className="flex space-x-4 mt-2">
        {!presentCart.find((item) => item.pizzaId === id) ? 
    <button className="btn-primary" onClick={() => handleAdd()}>Add to Cart</button> 
    : 
    <CounterPizzas id={id} />
}

          {!soldOut ? (
            <p className="text-2xl">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-red-500 text-xl">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
