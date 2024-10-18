import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = useSelector(state=>state.cart.cart);
  const username=useSelector(state=>state.user.username);
  const dispatch=useDispatch();
  if (!cart.length) return <EmptyCart/>
  return (
    <div className="p-1">
      <Link
        to="/menu"
        className="text-blue-300 hover:text-blue-500 hover:underline mb-2"
      >
        &larr; Back to menu
      </Link>

      <h2 className="text-3xl p-3">Your cart, {username}</h2>
      <div className="flex flex-col ">
        {cart.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </div>

      <div className="mt-3 space-x-3">
        <Link to="/order/new" className="btn-primary">
          Order pizzas
        </Link>
         <button className="bg-slate-400 rounded-3xl p-2 hover:bg-slate-600 transition-colors duration-300 hover:text-white focus:ring-1 ring-yellow-400 " onClick={()=>{
          dispatch(clearCart())
        }}>
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
