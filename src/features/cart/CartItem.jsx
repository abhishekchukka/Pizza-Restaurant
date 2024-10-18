import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utilitites/helpers";
import { deleteItem } from "./cartSlice";
import CounterPizzas from "./CounterPizzas";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch=useDispatch();
  const cart=useSelector(state=>state.cart.cart);
  function handleDelete(id){
    
    dispatch(deleteItem(pizzaId));  
  }
  return (

    <li className="flex min-h-16 items-center px-3 w-aut border-b-2 border-slate-200 justify-between text-xl bg-slate-300 ">
      <p className="ml-5">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center space-x-3">
        <p>{formatCurrency(totalPrice)}</p>
        <CounterPizzas id={pizzaId} count={quantity}/>
        <button className="btn-primary " onClick={()=>handleDelete(pizzaId)}>Delete</button>
      </div>
    </li>
  );
}

export default CartItem;
