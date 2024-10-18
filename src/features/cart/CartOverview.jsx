import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { itemNumbers, itemPrice } from "./cartSlice";

function CartOverview() {
  const cart=useSelector(state=>state.cart.cart);

  var ItemsQuantity=itemNumbers(cart);
  var totalPricePizzas=itemPrice(cart);
  
  if (ItemsQuantity==0){
    return null;
  }
  return (
    
    <div className="bg-slate-950 text-stone-200 font-semibold p-4 uppercase flex justify-between">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{ItemsQuantity} pizzas</span>
        <span>${totalPricePizzas}</span>
      </p>
      <Link to="/cart">OPEN CART &rarr;</Link>
    </div>
    
  );
}

export default CartOverview;
